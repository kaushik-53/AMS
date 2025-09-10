"use client";

import type { ReactNode, FC } from "react";
import {
  DashboardLayout,
  type NavItem,
} from "@/components/dashboard-layout";
import { ClipboardList } from "lucide-react";

const teacherNavItems: NavItem[] = [
  {
    href: "/teacher",
    label: "Mark Attendance",
    icon: ClipboardList,
    exact: true,
  },
];

export const TeacherDashboardLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <DashboardLayout navItems={teacherNavItems}>{children}</DashboardLayout>
  );
};
