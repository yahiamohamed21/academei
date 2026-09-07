"use client";

import React, { useState } from "react";
import { TeacherSidebar } from "@/components/layout/teacher/TeacherSidebar";
import { TeacherTopbar } from "@/components/layout/teacher/TeacherTopbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)] relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <TeacherSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <TeacherTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)]">
          <div className="container mx-auto p-4 sm:p-8 max-w-7xl animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
