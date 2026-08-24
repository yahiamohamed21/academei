import React from "react";
import { TeacherSidebar } from "@/components/layout/teacher/TeacherSidebar";
import { TeacherTopbar } from "@/components/layout/teacher/TeacherTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TeacherTopbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)]">
          <div className="container mx-auto p-4 sm:p-8 max-w-7xl animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
