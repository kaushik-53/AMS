import { getAttendanceForStudent, getUserById, getClasses } from "@/lib/actions";
import { StudentAttendanceReport } from "./_components/student-attendance-report";

export default async function StudentDashboardPage({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  const student = await getUserById(userId);
  const attendanceRecords = await getAttendanceForStudent(userId);
  const classes = await getClasses();

  if (!student) {
    return <p>Student not found.</p>;
  }

  return (
    <StudentAttendanceReport 
        student={student} 
        initialRecords={attendanceRecords} 
        classes={classes} 
    />
  );
}
