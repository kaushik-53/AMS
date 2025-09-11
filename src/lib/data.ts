import type { User, Class, AttendanceRecord } from './types';

// In a real app, this would be in a database and passwords would be hashed.
export const mockUsers: User[] = [
  // Admin
  { id: '1', name: 'Rohan Sharma', email: 'admin', role: 'admin', avatarId: '1', password: 'Admin@123' },
  
  // Teachers
  { id: '2', name: 'Priya Mehta', email: 'english', role: 'teacher', classId: 'C11', subject: 'English', avatarId: '2', password: 'English@123' },
  { id: '3', name: 'Vikram Singh', email: 'physics', role: 'teacher', classId: 'C11', subject: 'Physics', avatarId: '3', password: 'Physics@123' },
  { id: '4', name: 'Anjali Gupta', email: 'chemistry', role: 'teacher', classId: 'C12', subject: 'Chemistry', avatarId: '4', password: 'Chemistry@123' },
  { id: '5', name: 'Sanjay Kumar', email: 'maths', role: 'teacher', classId: 'C12', subject: 'Maths', avatarId: '5', password: 'Maths@123' },

  // Students - Class 11
  { id: 's1101', name: 'Aarav Patel', email: 'class11_roll1', role: 'student', grade: 11, parentEmail: 'parent1101@example.com', avatarId: '6', password: 'Student@111', classId: 'C11' },
  { id: 's1102', name: 'Diya Shah', email: 'class11_roll2', role: 'student', grade: 11, parentEmail: 'parent1102@example.com', avatarId: '7', password: 'Student@112', classId: 'C11' },
  { id: 's1103', name: 'Ishaan Joshi', email: 'class11_roll3', role: 'student', grade: 11, parentEmail: 'parent1103@example.com', avatarId: '1', password: 'Student@113', classId: 'C11' },
  { id: 's1104', name: 'Myra Reddy', email: 'class11_roll4', role: 'student', grade: 11, parentEmail: 'parent1104@example.com', avatarId: '2', password: 'Student@114', classId: 'C11' },
  { id: 's1105', name: 'Rohan Verma', email: 'class11_roll5', role: 'student', grade: 11, parentEmail: 'parent1105@example.com' , avatarId: '3', password: 'Student@115', classId: 'C11'},
  { id: 's1106', name: 'Saanvi Nair', email: 'class11_roll6', role: 'student', grade: 11, parentEmail: 'parent1106@example.com', avatarId: '4', password: 'Student@116', classId: 'C11' },
  { id: 's1107', name: 'Arjun Desai', email: 'class11_roll7', role: 'student', grade: 11, parentEmail: 'parent1107@example.com', avatarId: '5', password: 'Student@117', classId: 'C11' },
  { id: 's1108', name: 'Zara Khan', email: 'class11_roll8', role: 'student', grade: 11, parentEmail: 'parent1108@example.com', avatarId: '6', password: 'Student@118', classId: 'C11' },
  { id: 's1109', name: 'Kabir Iyer', email: 'class11_roll9', role: 'student', grade: 11, parentEmail: 'parent1109@example.com', avatarId: '7', password: 'Student@119', classId: 'C11' },
  { id: 's1110', name: 'Anika Pillai', email: 'class11_roll10', role: 'student', grade: 11, parentEmail: 'parent1110@example.com', avatarId: '1', password: 'Student@1110', classId: 'C11' },

  // Students - Class 12
  { id: 's1201', name: 'Advait Rao', email: 'class12_roll1', role: 'student', grade: 12, parentEmail: 'parent1201@example.com', avatarId: '2', password: 'Student@121', classId: 'C12' },
  { id: 's1202', name: 'Kiara Menon', email: 'class12_roll2', role: 'student', grade: 12, parentEmail: 'parent1202@example.com', avatarId: '3', password: 'Student@122', classId: 'C12' },
  { id: 's1203', name: 'Vihaan Bhat', email: 'class12_roll3', role: 'student', grade: 12, parentEmail: 'parent1203@example.com', avatarId: '4', password: 'Student@123', classId: 'C12' },
  { id: 's1204', name: 'Pari Sharma', email: 'class12_roll4', role: 'student', grade: 12, parentEmail: 'parent1204@example.com', avatarId: '5', password: 'Student@124', classId: 'C12' },
  { id: 's1205', name: 'Reyansh Gupta', email: 'class12_roll5', role: 'student', grade: 12, parentEmail: 'parent1205@example.com', avatarId: '6', password: 'Student@125', classId: 'C12' },
  { id: 's1206', name: 'Aisha Ali', email: 'class12_roll6', role: 'student', grade: 12, parentEmail: 'parent1206@example.com', avatarId: '7', password: 'Student@126', classId: 'C12' },
  { id: 's1207', name: 'Dev Mukherjee', email: 'class12_roll7', role: 'student', grade: 12, parentEmail: 'parent1207@example.com', avatarId: '1', password: 'Student@127', classId: 'C12' },
  { id: 's1208', name: 'Tara Chatterjee', email: 'class12_roll8', role: 'student', grade: 12, parentEmail: 'parent1208@example.com', avatarId: '2', password: 'Student@128', classId: 'C12' },
  { id: 's1209', name: 'Ayaan Malik', email: 'class12_roll9', role: 'student', grade: 12, parentEmail: 'parent1209@example.com', avatarId: '3', password: 'Student@129', classId: 'C12' },
  { id: 's1210', name: 'Ishita Prasad', email: 'class12_roll10', role: 'student', grade: 12, parentEmail: 'parent1210@example.com', avatarId: '4', password: 'Student@1210', classId: 'C12' },
];

export const mockClasses: Class[] = [
  { id: 'C11', name: 'Class 11', teacherId: '2' }, // Priya Mehta as class teacher
  { id: 'C12', name: 'Class 12', teacherId: '4' }, // Anjali Gupta as class teacher
];

export let mockAttendance: AttendanceRecord[] = [
    { id: 'A1', studentId: 's1101', date: '2024-05-20', status: 'present', classId: 'C11' },
    { id: 'A2', studentId: 's1102', date: '2024-05-20', status: 'present', classId: 'C11' },
    { id: 'A3', studentId: 's1103', date: '2024-05-20', status: 'absent', classId: 'C11' },
    { id: 'A4', studentId: 's1201', date: '2024-05-20', status: 'present', classId: 'C12' },
    { id: 'A5', studentId: 's1202', date: '2024-05-20', status: 'absent', classId: 'C12' },
];
