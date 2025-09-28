
"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { initialUsers, initialClasses, initialTimetable } from "./data";
import type { User, Class, AttendanceRecord, AttendanceStatus, TimetableEntry } from "./types";
import { sendAbsentEmailNotification } from "@/ai/flows/absent-email-notifications";
import { revalidatePath } from "next/cache";
import { adminDb } from "./firebase";
import { FieldValue } from 'firebase-admin/firestore';

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

  const usersRef = adminDb.collection('users');
  const snapshot = await usersRef.where('email', '==', username).where('password', '==', password).limit(1).get();

  if (snapshot.empty) {
    return { message: "Incorrect username or password." };
  }
  
  const user = snapshot.docs[0].data() as User;
  user.id = snapshot.docs[0].id;

  const url = `/${user.role}?userId=${user.id}`;
  redirect(url);
}

export async function logoutAction() {
  redirect("/");
}

// --- Data Fetching ---

export async function getUserById(userId: string): Promise<User | undefined> {
  const userDoc = await adminDb.collection('users').doc(userId).get();
  if (!userDoc.exists) return undefined;
  
  const user = userDoc.data() as User;
  const { password, ...userWithoutPassword } = user;
  userWithoutPassword.id = userDoc.id;

  return userWithoutPassword;
}

export async function getStudents(): Promise<User[]> {
  const snapshot = await adminDb.collection('users').where('role', '==', 'student').get();
  return snapshot.docs.map(doc => {
    const data = doc.data() as User;
    data.id = doc.id;
    return data;
  });
}

export async function getTeachers(): Promise<User[]> {
  const snapshot = await adminDb.collection('users').where('role', '==', 'teacher').get();
  return snapshot.docs.map(doc => {
    const data = doc.data() as User;
    data.id = doc.id;
    return data;
    });
}

export async function getClasses(): Promise<Class[]> {
  const snapshot = await adminDb.collection('classes').get();
  return snapshot.docs.map(doc => {
      const data = doc.data() as Class;
      data.id = doc.id;
      return data;
    });
}

export async function getStudentsByClass(classId: string): Promise<User[]> {
    const snapshot = await adminDb.collection('users').where('role', '==', 'student').where('classId', '==', classId).get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as User;
        data.id = doc.id;
        return data;
    });
}


export async function getAttendanceForStudent(studentId: string): Promise<AttendanceRecord[]> {
    const snapshot = await adminDb.collection('attendance').where('studentId', '==', studentId).get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as AttendanceRecord;
        data.id = doc.id;
        return data;
    });
}

export async function getAttendanceByDateAndClass(date: string, classId: string): Promise<AttendanceRecord[]> {
    const snapshot = await adminDb.collection('attendance').where('date', '==', date).where('classId', '==', classId).get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as AttendanceRecord;
        data.id = doc.id;
        return data;
    });
}

export async function getAllAttendance(): Promise<AttendanceRecord[]> {
    const snapshot = await adminDb.collection('attendance').get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as AttendanceRecord;
        data.id = doc.id;
        return data;
    });
}

export async function getAttendanceByClass(classId: string): Promise<AttendanceRecord[]> {
    const snapshot = await adminDb.collection('attendance').where('classId', '==', classId).get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as AttendanceRecord;
        data.id = doc.id;
        return data;
    });
}

export async function getTimetable(): Promise<TimetableEntry[]> {
    const snapshot = await adminDb.collection('timetable').get();
    return snapshot.docs.map(doc => {
        const data = doc.data() as TimetableEntry;
        data.id = doc.id;
        return data;
    });
}

// --- Data Mutations ---

export async function saveAttendance(
  attendanceData: { studentId: string; status: AttendanceStatus }[],
  classId: string,
  date: string,
  teacherName: string
) {
  try {
    const batch = adminDb.batch();

    // Query for existing records for this date and class
    const existingRecordsSnapshot = await adminDb.collection('attendance')
        .where('date', '==', date)
        .where('classId', '==', classId)
        .get();

    // Delete existing records to prevent duplicates
    existingRecordsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    // Create new attendance records
    attendanceData.forEach(att => {
        const docRef = adminDb.collection('attendance').doc(); // Auto-generate ID
        batch.set(docRef, {
            studentId: att.studentId,
            status: att.status,
            date,
            classId,
        });
    });

    await batch.commit();


    // Trigger AI email notifications for absent students
    for (const record of attendanceData) {
      if (record.status === "absent") {
        const student = await getUserById(record.studentId);
        const fetchedClass = await adminDb.collection('classes').doc(classId).get();
        if (student && student.parentEmail && fetchedClass.exists) {
          await sendAbsentEmailNotification({
            studentName: student.name,
            parentEmail: student.parentEmail,
            absenceDate: date,
            className: (fetchedClass.data() as Class).name || 'their class',
          });
        }
      }
    }
    revalidatePath("/teacher");
    revalidatePath("/teacher/report");
    revalidatePath("/admin/attendance");
    revalidatePath("/admin");
    revalidatePath("/student");
    return { success: true, message: "Attendance saved successfully." };
  } catch (error) {
    console.error("Error saving attendance: ", error);
    return { success: false, message: "Failed to save attendance." };
  }
}

async function upsertUser(user: Omit<User, 'password' | 'avatarId'> & { password?: string, id?:string }) {
  const { id, ...userData } = user;
  
  try {
    if (id) {
        await adminDb.collection('users').doc(id).update({
          ...userData,
          // Use FieldValue to avoid overwriting fields that are not in userData
          ...Object.entries(userData).reduce((acc, [key, value]) => {
                acc[key] = value !== undefined ? value : FieldValue.delete();
                return acc;
            }, {} as any)
        });
    } else {
        const newUser: Omit<User, 'id'> = {
            ...userData,
            avatarId: `${(Math.floor(Math.random() * 7)) + 1}`,
            password: user.password || 'Password123!',
        };
        await adminDb.collection('users').add(newUser);
    }
    revalidatePath("/admin/students");
    revalidatePath("/admin/teachers");
    return { success: true, message: `User ${id ? 'updated' : 'created'} successfully.` };
  } catch(e) {
    console.error("Error upserting user: ", e);
    return { success: false, message: 'Failed to save user.' };
  }
}

export async function saveStudent(studentData: { id?: string; name: string; email: string; grade: number; parentEmail: string, classId?: string }) {
    return upsertUser({ ...studentData, role: 'student' });
}

export async function saveTeacher(teacherData: { id?: string; name: string; email: string; classId: string; subject?: string; }) {
    return upsertUser({ ...teacherData, role: 'teacher' });
}


export async function deleteUser(userId: string) {
    try {
        await adminDb.collection('users').doc(userId).delete();
        revalidatePath("/admin/students");
        revalidatePath("/admin/teachers");
        return { success: true, message: 'User deleted successfully.' };
    } catch(e) {
        return { success: false, message: 'User not found.' };
    }
}

export async function seedDatabase() {
    const usersRef = adminDb.collection('users');
    const classesRef = adminDb.collection('classes');
    const timetableRef = adminDb.collection('timetable');

    const usersSnapshot = await usersRef.limit(1).get();
    if (!usersSnapshot.empty) {
        return { success: false, message: 'Database already appears to be seeded.' };
    }

    const batch = adminDb.batch();

    // Seed users and map emails to Firestore IDs
    const userIdMap: Record<string, string> = {};
    initialUsers.forEach(user => {
        const docRef = usersRef.doc(user.email); // Use email as document ID for teachers/admins
        batch.set(docRef, user);
        userIdMap[user.email] = docRef.id;
    });
     initialUsers.filter(u => u.role ==='student').forEach(user => {
        const docRef = usersRef.doc(); // Auto-generate ID for students
        batch.set(docRef, user);
        if (user.classId) {
             userIdMap[user.email] = docRef.id;
        }
    });

    // Seed classes
    initialClasses.forEach(c => {
        const docRef = classesRef.doc(c.name === 'Class 11' ? 'C11' : 'C12');
        const teacherId = userIdMap[c.teacherId];
        batch.set(docRef, { ...c, teacherId });
    });

    // Seed timetable
    initialTimetable.forEach(t => {
        const docRef = timetableRef.doc();
        const teacherId = userIdMap[t.teacherId];
        batch.set(docRef, { ...t, teacherId });
    });
    
    try {
        await batch.commit();
        revalidatePath('/');
        return { success: true, message: 'Database seeded successfully!' };
    } catch (e) {
        console.error("Error seeding database: ", e);
        return { success: false, message: `Failed to seed database. ${e}` };
    }
}
