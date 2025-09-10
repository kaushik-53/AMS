import type { User, Class, AttendanceRecord } from './types';

// In a real app, this would be in a database and passwords would be hashed.
export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@edutrack.com', role: 'admin', avatarId: '1', password: 'Password123!' },
  { id: '2', name: 'Dr. Evelyn Reed', email: 'teacher@edutrack.com', role: 'teacher', classId: 'C1', avatarId: '2', password: 'Password123!' },
  { id: '3', name: 'Alex Johnson', email: 'student@edutrack.com', role: 'student', grade: 10, parentEmail: 'parent@example.com', avatarId: '3', password: 'Password123!' },
  { id: '4', name: 'Mia Williams', email: 'mia.w@example.com', role: 'student', grade: 10, parentEmail: 'parent2@example.com', avatarId: '4', password: 'Password123!' },
  { id: '5', name: 'Ben Carter', email: 'ben.c@example.com', role: 'student', grade: 10, parentEmail: 'parent3@example.com', avatarId: '5', password: 'Password123!' },
  { id: '6', name: 'Olivia Brown', email: 'olivia.b@example.com', role: 'student', grade: 10, parentEmail: 'parent4@example.com', avatarId: '6', password: 'Password123!' },
  { id: '7', name: 'Mr. David Chen', email: 'teacher2@edutrack.com', role: 'teacher', classId: 'C2', avatarId: '7', password: 'Password123!' },

];

export const mockClasses: Class[] = [
  { id: 'C1', name: 'Grade 10 - Section A', teacherId: '2' },
  { id: 'C2', name: 'Grade 11 - Section B', teacherId: '7' },
];

export let mockAttendance: AttendanceRecord[] = [
    { id: 'A1', studentId: '3', date: '2024-05-20', status: 'present', classId: 'C1' },
    { id: 'A2', studentId: '4', date: '2024-05-20', status: 'present', classId: 'C1' },
    { id: 'A3', studentId: '5', date: '2024-05-20', status: 'absent', classId: 'C1' },
    { id: 'A4', studentId: '6', date: '2024-05-20', status: 'present', classId: 'C1' },
    { id: 'A5', studentId: '3', date: '2024-05-21', status: 'present', classId: 'C1' },
    { id: 'A6', studentId: '4', date: '2024-05-21', status: 'absent', classId: 'C1' },
    { id: 'A7', studentId: '5', date: '2024-05-21', status: 'present', classId: 'C1' },
    { id: 'A8', studentId: '6', date: '2024-05-21', status: 'present', classId: 'C1' },
];
