import { getStudentsByClass, getClasses, getUserById, getAttendanceByClass } from "@/lib/actions";
import { AttendanceReport } from "./_components/attendance-report";

export default async function TeacherReportPage({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  const teacher = await getUserById(userId);

  if (!teacher || !teacher.classId) {
    return <p>Could not load teacher or class information.</p>;
  }

  const students = await getStudentsByClass(teacher.classId);
  const assignedClass = (await getClasses()).find(c => c.id === teacher.classId);
  const attendanceRecords = await getAttendanceByClass(teacher.classId);

  return (
    <div>
      <AttendanceReport
        initialRecords={attendanceRecords}
        students={students}
        assignedClass={assignedClass}
      />
    </div>
  );
}
