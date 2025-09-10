import type { ReactNode, FC } from "react";
import {
  DashboardLayout,
  type NavItem,
} from "@/components/dashboard-layout";
import { LayoutDashboard, Users, UserCheck } from "lucide-react";

const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/teachers", label: "Teachers", icon: UserCheck },
];

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <DashboardLayout navItems={adminNavItems}>{children}</DashboardLayout>;
};

export default AdminLayout;
