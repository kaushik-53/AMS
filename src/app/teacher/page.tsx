import { getUserById, getStudentsByClass, getClasses } from "@/lib/actions";
import AttendanceForm from "./_components/attendance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TeacherDashboardPage({
  searchParams,
}: {
  searchParams: { [key:string]: string | string[] | undefined };
}) {
  const userId = searchParams.userId as string;
  const teacher = await getUserById(userId);

  if (!teacher || teacher.role !== 'teacher' || !teacher.classId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Could not load teacher information. Please log in again.</p>
        </CardContent>
      </Card>
    )
  }
  
  const assignedClass = (await getClasses()).find(c => c.id === teacher.classId);
  if (!assignedClass) {
     return <p>Could not find assigned class.</p>
  }
  
  const students = await getStudentsByClass(teacher.classId);

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Mark Attendance for {assignedClass.name}</CardTitle>
                <CardDescription>Select a date and mark each student as present or absent.</CardDescription>
            </CardHeader>
            <CardContent>
                <AttendanceForm 
                    students={students} 
                    classId={teacher.classId}
                    teacherName={teacher.name}
                />
            </CardContent>
        </Card>
    </div>
  );
}
