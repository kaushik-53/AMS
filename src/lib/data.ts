import type { User, Class, TimetableEntry } from './types';

export const initialUsers: Omit<User, 'id'>[] = [
    // Admin
    { name: 'Rohan Sharma', email: 'admin', role: 'admin', avatarId: '1', password: 'Admin@123' },
    
    // Teachers
    { name: 'Priya Mehta', email: 'english', role: 'teacher', subject: 'English', avatarId: '2', password: 'English@123' },
    { name: 'Vikram Singh', email: 'physics', role: 'teacher', subject: 'Physics', avatarId: '3', password: 'Physics@123' },
    { name: 'Anjali Gupta', email: 'chemistry', role: 'teacher', subject: 'Chemistry', avatarId: '4', password: 'Chemistry@123' },
    { name: 'Sanjay Kumar', email: 'maths', role: 'teacher', subject: 'Maths', avatarId: '5', password: 'Maths@123' },
  
    // Students - Class 11
    { name: 'Aarav Patel', email: 'class11_roll1', role: 'student', grade: 11, parentEmail: 'parent1101@example.com', avatarId: '6', password: 'Student@111', classId: 'C11' },
    { name: 'Diya Shah', email: 'class11_roll2', role: 'student', grade: 11, parentEmail: 'parent1102@example.com', avatarId: '7', password: 'Student@112', classId: 'C11' },
    { name: 'Ishaan Joshi', email: 'class11_roll3', role: 'student', grade: 11, parentEmail: 'parent1103@example.com', avatarId: '1', password: 'Student@113', classId: 'C11' },
    { name: 'Myra Reddy', email: 'class11_roll4', role: 'student', grade: 11, parentEmail: 'parent1104@example.com', avatarId: '2', password: 'Student@114', classId: 'C11' },
    { name: 'Rohan Verma', email: 'class11_roll5', role: 'student', grade: 11, parentEmail: 'parent1105@example.com' , avatarId: '3', password: 'Student@115', classId: 'C11'},
    { name: 'Saanvi Nair', email: 'class11_roll6', role: 'student', grade: 11, parentEmail: 'parent1106@example.com', avatarId: '4', password: 'Student@116', classId: 'C11' },
    { name: 'Arjun Desai', email: 'class11_roll7', role: 'student', grade: 11, parentEmail: 'parent1107@example.com', avatarId: '5', password: 'Student@117', classId: 'C11' },
    { name: 'Zara Khan', email: 'class11_roll8', role: 'student', grade: 11, parentEmail: 'parent1108@example.com', avatarId: '6', password: 'Student@118', classId: 'C11' },
    { name: 'Kabir Iyer', email: 'class11_roll9', role: 'student', grade: 11, parentEmail: 'parent1109@example.com', avatarId: '7', password: 'Student@119', classId: 'C11' },
    { name: 'Anika Pillai', email: 'class11_roll10', role: 'student', grade: 11, parentEmail: 'parent1110@example.com', avatarId: '1', password: 'Student@1110', classId: 'C11' },
  
    // Students - Class 12
    { name: 'Advait Rao', email: 'class12_roll1', role: 'student', grade: 12, parentEmail: 'parent1201@example.com', avatarId: '2', password: 'Student@121', classId: 'C12' },
    { name: 'Kiara Menon', email: 'class12_roll2', role: 'student', grade: 12, parentEmail: 'parent1202@example.com', avatarId: '3', password: 'Student@122', classId: 'C12' },
    { name: 'Vihaan Bhat', email: 'class12_roll3', role: 'student', grade: 12, parentEmail: 'parent1203@example.com', avatarId: '4', password: 'Student@123', classId: 'C12' },
    { name: 'Pari Sharma', email: 'class12_roll4', role: 'student', grade: 12, parentEmail: 'parent1204@example.com', avatarId: '5', password: 'Student@124', classId: 'C12' },
    { name: 'Reyansh Gupta', email: 'class12_roll5', role: 'student', grade: 12, parentEmail: 'parent1205@example.com', avatarId: '6', password: 'Student@125', classId: 'C12' },
    { name: 'Aisha Ali', email: 'class12_roll6', role: 'student', grade: 12, parentEmail: 'parent1206@example.com', avatarId: '7', password: 'Student@126', classId: 'C12' },
    { name: 'Dev Mukherjee', email: 'class12_roll7', role: 'student', grade: 12, parentEmail: 'parent1207@example.com', avatarId: '1', password: 'Student@127', classId: 'C12' },
    { name: 'Tara Chatterjee', email: 'class12_roll8', role: 'student', grade: 12, parentEmail: 'parent1208@example.com', avatarId: '2', password: 'Student@128', classId: 'C12' },
    { name: 'Ayaan Malik', email: 'class12_roll9', role: 'student', grade: 12, parentEmail: 'parent1209@example.com', avatarId: '3', password: 'Student@129', classId: 'C12' },
    { name: 'Ishita Prasad', email: 'class12_roll10', role: 'student', grade: 12, parentEmail: 'parent1210@example.com', avatarId: '4', password: 'Student@1210', classId: 'C12' },
];
  
export const initialClasses: Omit<Class, 'id'>[] = [
    { name: 'Class 11', teacherId: 'english' }, // Priya Mehta as class teacher
    { name: 'Class 12', teacherId: 'chemistry' }, // Anjali Gupta as class teacher
];
  
export const initialTimetable: Omit<TimetableEntry, 'id'>[] = [
      // Class 11
      { classId: 'C11', day: 'Monday', period: 1, subject: 'English', teacherId: 'english' },
      { classId: 'C11', day: 'Monday', period: 2, subject: 'Physics', teacherId: 'physics' },
      { classId: 'C11', day: 'Tuesday', period: 1, subject: 'Maths', teacherId: 'maths' },
      { classId: 'C11', day: 'Tuesday', period: 2, subject: 'Chemistry', teacherId: 'chemistry' },
      { classId: 'C11', day: 'Wednesday', period: 1, subject: 'Physics', teacherId: 'physics' },
      { classId: 'C11', day: 'Wednesday', period: 2, subject: 'English', teacherId: 'english' },
      { classId: 'C11', day: 'Thursday', period: 1, subject: 'Chemistry', teacherId: 'chemistry' },
      { classId: 'C11', day: 'Thursday', period: 2, subject: 'Maths', teacherId: 'maths' },
      { classId: 'C11', day: 'Friday', period: 1, subject: 'English', teacherId: 'english' },
      { classId: 'C11', day: 'Friday', period: 2, subject: 'Physics', teacherId: 'physics' },
  
      // Class 12
      { classId: 'C12', day: 'Monday', period: 1, subject: 'Maths', teacherId: 'maths' },
      { classId: 'C12', day: 'Monday', period: 2, subject: 'Chemistry', teacherId: 'chemistry' },
      { classId: 'C12', day: 'Tuesday', period: 1, subject: 'English', teacherId: 'english' },
      { classId: 'C12', day: 'Tuesday', period: 2, subject: 'Physics', teacherId: 'physics' },
      { classId: 'C12', day: 'Wednesday', period: 1, subject: 'Chemistry', teacherId: 'chemistry' },
      { classId: 'C12', day: 'Wednesday', period: 2, subject: 'Maths', teacherId: 'maths' },
      { classId: 'C12', day: 'Thursday', period: 1, subject: 'Physics', teacherId: 'physics' },
      { classId: 'C12' , day: 'Thursday', period: 2, subject: 'English', teacherId: 'english' },
      { classId: 'C12', day: 'Friday', period: 1, subject: 'Maths', teacherId: 'maths' },
      { classId: 'C12', day: 'Friday', period: 2, subject: 'Chemistry', teacherId: 'chemistry' },
  ];
