import type { ReactNode, FC } from "react";
import { TeacherDashboardLayout } from "./_components/teacher-dashboard-layout";
import { Suspense } from "react";

const TeacherLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeacherDashboardLayout>{children}</TeacherDashboardLayout>
    </Suspense>
  );
};

export default TeacherLayout;
