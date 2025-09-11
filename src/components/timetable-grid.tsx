import type { TimetableEntry, User, Class } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimetableGridProps {
  title: string;
  description: string;
  timetable: TimetableEntry[];
  teachers: User[];
  classes: Class[];
  highlightTeacherId?: string;
}

export function TimetableGrid({ title, description, timetable, teachers, classes, highlightTeacherId }: TimetableGridProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = Array.from({ length: 4 }, (_, i) => i + 1); // Assuming 4 periods

  const getEntry = (day: string, period: number) => {
    return timetable.find(entry => entry.day === day && entry.period === period);
  }
  
  const getTeacherName = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId)?.name || 'N/A';
  }

  const getClassName = (classId: string) => {
    return classes.find(c => c.id === classId)?.name || 'N/A';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Period</TableHead>
                {days.map(day => <TableHead key={day}>{day}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods.map(period => (
                <TableRow key={period}>
                  <TableCell className="font-medium">Period {period}</TableCell>
                  {days.map(day => {
                    const entry = getEntry(day, period);
                    const isHighlighted = highlightTeacherId && entry?.teacherId === highlightTeacherId;
                    return (
                      <TableCell key={day}>
                        {entry ? (
                          <div className={`p-2 rounded-md ${isHighlighted ? 'bg-primary/20' : 'bg-muted/50'}`}>
                            <p className="font-semibold">{entry.subject}</p>
                            <p className="text-xs text-muted-foreground">
                                {getTeacherName(entry.teacherId)}
                            </p>
                            {highlightTeacherId && <p className="text-xs text-muted-foreground">{getClassName(entry.classId)}</p>}
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
