"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings,
  HelpCircle,
  ShieldAlert,
  Wallet
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/teachers", label: "المدرسين والمراكز", icon: Users },
  { href: "/admin/packages", label: "الباقات والاشتراكات", icon: Package },
  { href: "/admin/finance", label: "المالية", icon: Wallet },
  { href: "/admin/settings", label: "إعدادات النظام", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col h-screen sticky top-0 shadow-[0_0_15px_rgba(0,0,0,0.2)] text-slate-100">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800 px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-xl font-extrabold text-blue-400 leading-tight">أكاديميا برو</h1>
            <p className="text-[10px] text-slate-400 font-medium">لوحة تحكم الإدارة العليا</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-900/50">
            <ShieldAlert size={24} />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-600/20 text-blue-400" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-colors", 
                  isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                )} 
              />
              {item.label}
              
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-l-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <Link href="/admin/help" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors">
          <HelpCircle size={18} className="text-slate-500" />
          مركز الدعم الفني
        </Link>
      </div>
    </aside>
  );
}
