import type { ReactNode, FC } from "react";
import { AdminDashboardLayout } from "./_components/admin-dashboard-layout";
import { Suspense } from "react";

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </Suspense>
  );
};

export default AdminLayout;
