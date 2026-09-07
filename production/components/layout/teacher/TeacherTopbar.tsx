"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, Menu, Building2, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, useTenantContext } from "@/lib/hooks/use-auth";

export function TeacherTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tenantDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: session } = useSession();
  const { selectedTenantId, setTenantId, memberships } = useTenantContext();

  const activeMembership = memberships.find((m) => m.tenantId === selectedTenantId) || memberships[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (tenantDropdownRef.current && !tenantDropdownRef.current.contains(event.target as Node)) {
        setIsTenantMenuOpen(false);
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
    <header className="h-20 bg-[var(--background)] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      
      {/* Mobile Menu & Search */}
      <div className="flex flex-1 items-center gap-4 max-w-xl">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={24} />
          </button>
        )}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative group">
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] group-focus-within:text-[var(--primary)] transition-colors">
              <Search size={18} />
            </button>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث..."
              className="w-full h-12 rounded-full border border-gray-200 bg-white pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all shadow-sm"
            />
          </div>
        </form>
      </div>

      {/* Tenant Context Selector & Profile / Actions */}
      <div className="flex items-center gap-2 md:gap-4 mr-2 md:mr-8">
        
        {/* Tenant Selector */}
        {memberships.length > 0 && (
          <div className="relative" ref={tenantDropdownRef}>
            <button
              onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              <Building2 size={16} className="text-blue-600" />
              <span className="max-w-[120px] truncate">{activeMembership?.tenantName || "المركز التعليمي"}</span>
              {memberships.length > 1 && <ChevronDown size={14} className="text-gray-400" />}
            </button>

            {isTenantMenuOpen && memberships.length > 1 && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-2 text-xs font-bold text-gray-400 border-b border-gray-50">تبديل المركز</div>
                {memberships.map((mem) => (
                  <button
                    key={mem.tenantId}
                    onClick={() => {
                      setTenantId(mem.tenantId);
                      setIsTenantMenuOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-blue-50 transition-colors ${mem.tenantId === selectedTenantId ? 'bg-blue-50/70 text-[var(--primary)] font-bold' : 'text-gray-700'}`}
                  >
                    <span className="truncate">{mem.tenantName}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{mem.membershipStatus}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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

        {/* User Info & Profile Avatar */}
        <Link href="/profile" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {session?.email && (
            <span className="hidden md:inline-block text-xs font-semibold text-gray-600 dir-ltr">
              {session.email}
            </span>
          )}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-[var(--primary)]/30 transition-all cursor-pointer">
            <Image 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>

    </header>
  );
}

