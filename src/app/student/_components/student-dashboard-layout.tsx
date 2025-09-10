"use client";

import type { ReactNode, FC } from "react";
import {
  DashboardLayout,
  type NavItem,
} from "@/components/dashboard-layout";
import { BarChart3 } from "lucide-react";

const studentNavItems: NavItem[] = [
  { href: "/student", label: "My Attendance", icon: BarChart3, exact: true },
];

export const StudentDashboardLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <DashboardLayout navItems={studentNavItems}>{children}</DashboardLayout>
  );
};
