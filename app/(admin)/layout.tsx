import React from "react";
import { AdminSidebar } from "@/components/layout/admin/AdminSidebar";
import { AdminTopbar } from "@/components/layout/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto p-4 sm:p-8 max-w-7xl animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
