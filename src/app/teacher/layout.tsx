import type { ReactNode, FC } from "react";
import {
  DashboardLayout,
  type NavItem,
} from "@/components/dashboard-layout";
import { ClipboardList, Users } from "lucide-react";

const teacherNavItems: NavItem[] = [
  { href: "/teacher", label: "Mark Attendance", icon: ClipboardList, exact: true },
];

const TeacherLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <DashboardLayout navItems={teacherNavItems}>{children}</DashboardLayout>;
};

export default TeacherLayout;
