"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AdminTopbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    { id: 1, title: "اشتراك جديد: مركز الفرسان", time: "منذ 10 دقائق", unread: true },
    { id: 2, title: "تم تجديد باقة المدرس أحمد", time: "منذ ساعة", unread: true },
    { id: 3, title: "تنبيه: اقتراب انتهاء مساحة التخزين", time: "منذ ساعتين", unread: false },
  ];

  return (
    <header className="h-20 bg-[var(--background)] flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm border-b border-gray-100">
      
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-blue-600 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="ابحث عن مدرس، مركز، أو باقة..."
            className="w-full h-12 rounded-full border border-gray-200 bg-gray-50 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4 mr-8">
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2 transition-colors rounded-full ${isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <Bell size={22} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[var(--background)]"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800">إشعارات النظام</h3>
                <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">تحديد الكل كمقروء</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {dummyNotifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 transition-colors ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                    <div className="mt-0.5">
                      <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{notif.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-50 bg-gray-50/50 hover:bg-gray-100 cursor-pointer transition-colors">
                <p className="text-sm font-bold text-blue-600">عرض جميع الإشعارات</p>
              </div>
            </div>
          )}
        </div>
        
        <Link href="/admin/settings" className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
          <Settings size={22} />
        </Link>

        <div className="w-px h-8 bg-gray-200 mx-2"></div>

        <Link href="/admin/profile" className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-blue-600/30 transition-all cursor-pointer">
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </Link>
      </div>

    </header>
  );
}
