import type { User, Class, AttendanceRecord, TimetableEntry } from './types';

// In a real app, this would be in a database and passwords would be hashed.

// To prevent data from being reset on every hot-reload in development,
// we'll store the mock data on the global object.
// In a real app, you'd use a database.
type AppGlobal = typeof globalThis & {
  mockUsers?: User[];
  mockClasses?: Class[];
  mockAttendance?: AttendanceRecord[];
  mockTimetable?: TimetableEntry[];
};

const appGlobal = globalThis as AppGlobal;

function initializeMockData() {
  // Only initialize if the data is not already populated
  if (appGlobal.mockUsers && appGlobal.mockUsers.length > 0) {
    return;
  }

  appGlobal.mockUsers = [
    // Admin
    { id: '1', name: 'Rohan Sharma', email: 'admin', role: 'admin', avatarId: '1', password: 'Admin@123' },
    
    // Teachers
    { id: '2', name: 'Priya Mehta', email: 'english', role: 'teacher', subject: 'English', avatarId: '2', password: 'English@123' },
    { id: '3', name: 'Vikram Singh', email: 'physics', role: 'teacher', subject: 'Physics', avatarId: '3', password: 'Physics@123' },
    { id: '4', name: 'Anjali Gupta', email: 'chemistry', role: 'teacher', subject: 'Chemistry', avatarId: '4', password: 'Chemistry@123' },
    { id: '5', name: 'Sanjay Kumar', email: 'maths', role: 'teacher', subject: 'Maths', avatarId: '5', password: 'Maths@123' },
  
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
  
  appGlobal.mockClasses = [
    { id: 'C11', name: 'Class 11', teacherId: '2' }, // Priya Mehta as class teacher
    { id: 'C12', name: 'Class 12', teacherId: '4' }, // Anjali Gupta as class teacher
  ];
  
  appGlobal.mockAttendance = [];
  
  appGlobal.mockTimetable = [
      // Class 11
      { id: 'tt1', classId: 'C11', day: 'Monday', period: 1, subject: 'English', teacherId: '2' },
      { id: 'tt2', classId: 'C11', day: 'Monday', period: 2, subject: 'Physics', teacherId: '3' },
      { id: 'tt3', classId: 'C11', day: 'Tuesday', period: 1, subject: 'Maths', teacherId: '5' },
      { id: 'tt4', classId: 'C11', day: 'Tuesday', period: 2, subject: 'Chemistry', teacherId: '4' },
      { id: 'tt5', classId: 'C11', day: 'Wednesday', period: 1, subject: 'Physics', teacherId: '3' },
      { id: 'tt6', classId: 'C11', day: 'Wednesday', period: 2, subject: 'English', teacherId: '2' },
      { id: 'tt7', classId: 'C11', day: 'Thursday', period: 1, subject: 'Chemistry', teacherId: '4' },
      { id: 'tt8', classId: 'C11', day: 'Thursday', period: 2, subject: 'Maths', teacherId: '5' },
      { id: 'tt9', classId: 'C11', day: 'Friday', period: 1, subject: 'English', teacherId: '2' },
      { id: 'tt10', classId: 'C11', day: 'Friday', period: 2, subject: 'Physics', teacherId: '3' },
  
      // Class 12
      { id: 'tt11', classId: 'C12', day: 'Monday', period: 1, subject: 'Maths', teacherId: '5' },
      { id: 'tt12', classId: 'C12', day: 'Monday', period: 2, subject: 'Chemistry', teacherId: '4' },
      { id: 'tt13', classId: 'C12', day: 'Tuesday', period: 1, subject: 'English', teacherId: '2' },
      { id: 'tt14', classId: 'C12', day: 'Tuesday', period: 2, subject: 'Physics', teacherId: '3' },
      { id: 'tt15', classId: 'C12', day: 'Wednesday', period: 1, subject: 'Chemistry', teacherId: '4' },
      { id: 'tt16', classId: 'C12', day: 'Wednesday', period: 2, subject: 'Maths', teacherId: '5' },
      { id: 'tt17', classId: 'C12', day: 'Thursday', period: 1, subject: 'Physics', teacherId: '3' },
      { id: 'tt18', classId: 'C12' , day: 'Thursday', period: 2, subject: 'English', teacherId: '2' },
      { id: 'tt19', classId: 'C12', day: 'Friday', period: 1, subject: 'Maths', teacherId: '5' },
      { id: 'tt20', classId: 'C12', day: 'Friday', period: 2, subject: 'Chemistry', teacherId: '4' },
  ];
}

// Call the initialization function.
initializeMockData();


export const mockUsers: User[] = appGlobal.mockUsers!;
export const mockClasses: Class[] = appGlobal.mockClasses!;
export const mockAttendance: AttendanceRecord[] = appGlobal.mockAttendance!;
export const mockTimetable: TimetableEntry[] = appGlobal.mockTimetable!;
