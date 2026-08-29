"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function TeacherTopbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dummyNotifications = [
    { id: 1, title: "تم تسجيل طالب جديد", time: "منذ 10 دقائق", unread: true },
    { id: 2, title: "تم دفع اشتراك 'مجموعة الكيمياء'", time: "منذ ساعة", unread: true },
    { id: 3, title: "رسالة جديدة من ولي أمر", time: "منذ ساعتين", unread: false },
  ];

  return (
    <header className="h-20 bg-[var(--background)] flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative group">
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] group-focus-within:text-[var(--primary)] transition-colors">
            <Search size={18} />
          </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن طالب، دورة، أو معاملة"
            className="w-full h-12 rounded-full border border-gray-200 bg-white pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all shadow-sm"
          />
        </div>
      </form>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4 mr-8">
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2 transition-colors rounded-full ${isNotificationsOpen ? 'bg-blue-50 text-[var(--primary)]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <Bell size={22} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[var(--background)]"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-extrabold text-[#001c56]">الإشعارات</h3>
                <span className="text-xs text-[var(--primary)] font-bold cursor-pointer hover:underline">تحديد الكل كمقروء</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {dummyNotifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 transition-colors ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                    <div className="mt-0.5">
                      <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-[var(--primary)]' : 'bg-transparent'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{notif.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-50 bg-gray-50/50 hover:bg-gray-100 cursor-pointer transition-colors">
                <p className="text-sm font-bold text-[var(--primary)]">عرض جميع الإشعارات</p>
              </div>
            </div>
          )}
        </div>
        
        <Link href="/settings" className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
          <Settings size={22} />
        </Link>

        <div className="w-px h-8 bg-gray-200 mx-2"></div>

        <Link href="/profile" className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-[var(--primary)]/30 transition-all cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
            alt="Profile"
            fill
            className="object-cover"
          />
        </Link>
      </div>

    </header>
  );
}
