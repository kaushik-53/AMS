import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllAttendance,
  getStudents,
  getTeachers,
} from "@/lib/actions";
import { Users, UserCheck, Percent, CheckCircle, XCircle } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const students = await getStudents();
  const teachers = await getTeachers();
  const attendanceRecords = await getAllAttendance();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const overallAttendance =
    attendanceRecords.length > 0
      ? (
          (attendanceRecords.filter((a) => a.status === "present").length /
            attendanceRecords.length) *
          100
        ).toFixed(1)
      : "0";

  const recentAbsences = attendanceRecords
    .filter((a) => a.status === "absent")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Attendance
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAttendance}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Absences</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAbsences.length > 0 ? (
                recentAbsences.map((record) => {
                  const student = students.find((s) => s.id === record.studentId);
                  return (
                    <TableRow key={record.id}>
                      <TableCell>{student?.name || "Unknown"}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <span className="flex items-center text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Absent
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No recent absences.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button asChild>
            <Link href={`/admin/students?userId=${searchParams.userId}`}>Manage Students</Link>
        </Button>
        <Button asChild variant="secondary">
            <Link href={`/admin/teachers?userId=${searchParams.userId}`}>Manage Teachers</Link>
        </Button>
      </div>
    </div>
  );
}
