"use client";

import { useState, useEffect } from "react";
import type { User, Class } from "@/lib/types";
import { getStudentsByClass } from "@/lib/actions";
import AttendanceForm from "./attendance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TeacherAttendance({ teacher, teacherClasses }: { teacher: User, teacherClasses: Class[] }) {
    const [selectedClassId, setSelectedClassId] = useState<string | null>(teacherClasses[0]?.id || null);
    const [students, setStudents] = useState<User[]>([]);

    const handleClassChange = async (classId: string) => {
        setSelectedClassId(classId);
        const fetchedStudents = await getStudentsByClass(classId);
        setStudents(fetchedStudents);
    }
    
    // Initial load of students for the default selected class
    useEffect(() => {
        if (selectedClassId) {
            handleClassChange(selectedClassId);
        }
    }, [selectedClassId]);

    const selectedClass = teacherClasses.find(c => c.id === selectedClassId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>Select a class, then a date and mark each student as present or absent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Select onValueChange={handleClassChange} defaultValue={selectedClassId || undefined}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                            {teacherClasses.map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedClassId && selectedClass ? (
                    <AttendanceForm 
                        key={selectedClassId} // Re-mount component when class changes
                        students={students} 
                        classId={selectedClassId}
                        teacherName={teacher.name}
                    />
                ) : (
                    <div className="text-muted-foreground pt-4">Please select a class to start marking attendance.</div>
                )}
            </CardContent>
        </Card>
    )
}