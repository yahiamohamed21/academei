"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MonitorPlay, 
  Wallet, 
  BarChart3, 
  GraduationCap, 
  Settings,
  HelpCircle,
  Plus,
  LogOut,
  BookOpen
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "لوحة القيادة", icon: LayoutDashboard },
  { href: "/students", label: "الطلاب", icon: Users },
  { href: "/groups", label: "المجموعات والحصص", icon: Calendar },
  { href: "/sessions", label: "الجلسات", icon: MonitorPlay },
  { href: "/finance", label: "المالية", icon: Wallet },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/team", label: "فريق التدريس", icon: GraduationCap },
  { href: "/e-learning", label: "التعليم الإلكتروني", icon: BookOpen },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function TeacherSidebar() {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <aside className="w-64 bg-white border-l border-gray-100 flex flex-col h-screen sticky top-0 shadow-[0_0_15px_rgba(0,0,0,0.03)] z-40">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-50 px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-xl font-extrabold text-[var(--primary)] leading-tight">أكاديميا</h1>
            <p className="text-[10px] text-gray-500 font-medium">نظام الإدارة التعليمية</p>
          </div>
          <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white shadow-md">
            <GraduationCap size={24} />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-50/80 text-[var(--primary)]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-colors", 
                  isActive ? "text-[var(--primary)]" : "text-gray-400 group-hover:text-gray-600"
                )} 
              />
              {item.label}
              
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[var(--primary)] rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-50 space-y-4">
        <Link href="/groups/new" className="block w-full">
          <Button className="w-full bg-[var(--primary)] text-white shadow-md shadow-blue-900/10 gap-2 h-12">
            <Plus size={18} />
            إضافة حصة جديدة
          </Button>
        </Link>
        <Link 
          href="/help"
          className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <HelpCircle size={18} className="text-gray-400" />
          المساعدة
        </Link>
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full h-12 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all"
        >
          <LogOut size={18} className="rtl:-scale-x-100" />
          تسجيل الخروج
        </button>
      </div>
    </aside>

    {/* Logout Modal */}
    {isLogoutModalOpen && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center animate-in fade-in duration-200 p-4">
        <div className="bg-white rounded-[32px] p-8 max-w-[400px] w-full shadow-2xl text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut size={32} className="text-slate-800 rtl:-scale-x-100" strokeWidth={2.5} />
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">تسجيل الخروج</h2>
          <p className="text-slate-500 font-medium mb-8">هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟</p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 h-14 bg-white border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut size={20} className="rtl:-scale-x-100" />
              تسجيل الخروج
            </button>
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 h-14 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
