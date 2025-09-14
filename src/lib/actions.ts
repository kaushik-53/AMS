
"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { mockUsers, mockClasses, mockAttendance, mockTimetable } from "./data";
import type { User, Class, AttendanceRecord, AttendanceStatus, UserRole, TimetableEntry } from "./types";
import { sendAbsentEmailNotification } from "@/ai/flows/absent-email-notifications";
import { revalidatePath } from "next/cache";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const loginSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(passwordValidation, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});


// --- Authentication ---

export async function loginAction(
  prevState: { message: string },
  formData: FormData
) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const error = parsed.error.flatten().fieldErrors.password?.[0];
    return { message: error || "Invalid username or password format." };
  }

  const { username, password } = parsed.data;

  const user = mockUsers.find(
    (u) => u.email === username && u.password === password
  );

  if (!user) {
    return { message: "Incorrect username or password." };
  }

  const url = `/${user.role}?userId=${user.id}`;
  redirect(url);
}

export async function logoutAction() {
  redirect("/");
}

// --- Data Fetching ---

export async function getUserById(userId: string): Promise<User | undefined> {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return undefined;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getStudents(): Promise<User[]> {
  return mockUsers.filter((u) => u.role === "student");
}

export async function getTeachers(): Promise<User[]> {
  return mockUsers.filter((u) => u.role === "teacher");
}

export async function getClasses(): Promise<Class[]> {
  return mockClasses;
}

export async function getStudentsByClass(classId: string): Promise<User[]> {
    return mockUsers.filter(u => u.role === 'student' && u.classId === classId);
}


export async function getAttendanceForStudent(studentId: string): Promise<AttendanceRecord[]> {
    return mockAttendance.filter(a => a.studentId === studentId);
}

export async function getAttendanceByDateAndClass(date: string, classId: string): Promise<AttendanceRecord[]> {
    return mockAttendance.filter(a => a.date === date && a.classId === classId);
}

export async function getAllAttendance(): Promise<AttendanceRecord[]> {
    return mockAttendance;
}

export async function getAttendanceByClass(classId: string): Promise<AttendanceRecord[]> {
    return mockAttendance.filter(a => a.classId === classId);
}

export async function getTimetable(): Promise<TimetableEntry[]> {
    return mockTimetable;
}

// --- Data Mutations ---

export async function saveAttendance(
  attendanceData: { studentId: string; status: AttendanceStatus }[],
  classId: string,
  date: string,
  teacherName: string
) {
  try {
    const newRecords: AttendanceRecord[] = attendanceData.map((att) => ({
      id: `A${mockAttendance.length + Math.random()}`,
      studentId: att.studentId,
      status: att.status,
      date,
      classId,
    }));

    // Remove existing records for this date and class to prevent duplicates
    const indexesToRemove = mockAttendance
        .map((a, index) => (a.date === date && a.classId === classId ? index : -1))
        .filter(index => index !== -1)
        .reverse(); // reverse to avoid index shifting issues

    for (const index of indexesToRemove) {
        mockAttendance.splice(index, 1);
    }

    // Add new records
    mockAttendance.push(...newRecords);

    // Trigger AI email notifications for absent students
    for (const record of newRecords) {
      if (record.status === "absent") {
        const student = await getUserById(record.studentId);
        if (student && student.parentEmail) {
          await sendAbsentEmailNotification({
            studentName: student.name,
            parentEmail: student.parentEmail,
            absenceDate: date,
            className: mockClasses.find(c => c.id === classId)?.name || 'their class',
          });
        }
      }
    }
    revalidatePath("/teacher");
    revalidatePath("/teacher/report");
    revalidatePath("/admin/attendance");
    revalidatePath("/admin");
    return { success: true, message: "Attendance saved successfully." };
  } catch (error) {
    return { success: false, message: "Failed to save attendance." };
  }
}

async function upsertUser(user: Omit<User, 'password' | 'avatarId'> & { password?: string, id?:string }) {
  if (user.id) {
    const index = mockUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...user };
    }
  } else {
    const newUser: User = {
      ...user,
      id: `${mockUsers.length + 1}`,
      avatarId: `${(mockUsers.length % 7) + 1}`,
      password: user.password || 'Password123!',
    };
    mockUsers.push(newUser);
  }
  revalidatePath("/admin/students");
  revalidatePath("/admin/teachers");
  return { success: true, message: `User ${user.id ? 'updated' : 'created'} successfully.` };
}

export async function saveStudent(studentData: { id?: string; name: string; email: string; grade: number; parentEmail: string, classId?: string }) {
    return upsertUser({ ...studentData, role: 'student' });
}

export async function saveTeacher(teacherData: { id?: string; name: string; email: string; classId: string; }) {
    return upsertUser({ ...teacherData, role: 'teacher' });
}


export async function deleteUser(userId: string) {
    const index = mockUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
        mockUsers.splice(index, 1);
        revalidatePath("/admin/students");
        revalidatePath("/admin/teachers");
        return { success: true, message: 'User deleted successfully.' };
    }
    return { success: false, message: 'User not found.' };
}
