
import { getClasses, getUserById, getTimetable, getStudents, getAllAttendance } from "@/lib/actions";
import { TeacherAttendanceReport } from "./_components/teacher-attendance-report";

export default async function TeacherReportPage({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  const teacher = await getUserById(userId);

  if (!teacher) {
    return <p>Could not load teacher information.</p>;
  }

  const allStudents = await getStudents();
  const allAttendanceRecords = await getAllAttendance();
  const allClasses = await getClasses();
  const timetable = await getTimetable();

  const teacherClassIds = [...new Set(timetable.filter(t => t.teacherId === teacher.id).map(t => t.classId))];
  const teacherClasses = allClasses.filter(c => teacherClassIds.includes(c.id));


  return (
    <div>
      <TeacherAttendanceReport
        allRecords={allAttendanceRecords}
        allStudents={allStudents}
        teacherClasses={teacherClasses}
      />
    </div>
  );
}
