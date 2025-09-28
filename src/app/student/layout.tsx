import type { ReactNode, FC } from "react";
import { StudentDashboardLayout } from "./_components/student-dashboard-layout";
import { Suspense } from "react";

const StudentLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentDashboardLayout>{children}</StudentDashboardLayout>
    </Suspense>
  );
};

export default StudentLayout;
