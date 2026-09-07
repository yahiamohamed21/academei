import React from "react";
import { DashboardShell } from "@/components/layout/teacher/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
