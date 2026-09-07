"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  FileText,
  Video,
  Clock,
  TrendingUp,
  MonitorPlay,
  CalendarPlus
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useSessions } from "@/lib/hooks/use-sessions";

export default function SessionsPage() {
  const { data: authSession } = useSession();
  const tenantId = authSession?.selectedTenantId || undefined;

  const [dateFilter, setDateFilter] = useState("اليوم");
  
  // Calculate from and to based on dateFilter
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let fromDate = new Date(today);
  let toDate = new Date(today);
  toDate.setHours(23, 59, 59, 999);

  if (dateFilter === "غدا") {
    fromDate.setDate(today.getDate() + 1);
    toDate.setDate(today.getDate() + 1);
  } else if (dateFilter === "الأسبوع القادم") {
    fromDate.setDate(today.getDate() + 7);
    toDate.setDate(today.getDate() + 13);
  } else if (dateFilter === "هذا الشهر") {
    fromDate.setDate(1);
    toDate.setMonth(today.getMonth() + 1);
    toDate.setDate(0);
  }

  const { data: apiSessions = [], isLoading, isError } = useSessions({
    tenantId,
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const datesList = ["اليوم", "غدا", "الأسبوع القادم", "هذا الشهر"];

  const filteredSessions = apiSessions.filter((session: any) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (session.groupName || '').toLowerCase().includes(q) || 
      (session.subjectName || '').toLowerCase().includes(q) ||
      (session.teacherFullName || '').toLowerCase().includes(q);
    return matchesSearch;
  });

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">

      {/* Header */}
      <div className="flex flex-col items-start">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#001c56] mb-2 tracking-tight flex items-center gap-2">
          إدارة الجلسات
        </h1>
        <p className="text-gray-500 font-medium">
          متابعة وتنظيم الجلسات التعليمية اليومية والمستقبلية
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Selected Period Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-medium mb-2 text-center">الجلسات المحددة</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-[#001c56]">{apiSessions.length}</span>
          </div>
        </div>

        {/* Upcoming / Active Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-medium mb-2 text-center">الجلسات الفعالة</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-[#001c56]">
              {apiSessions.filter((s: any) => s.status !== 3).length}
            </span>
          </div>
        </div>

        {/* Completed Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-medium mb-2 text-center">الجلسات المكتملة</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-[#001c56]">
              {apiSessions.filter((s: any) => s.status === 3).length}
            </span>
          </div>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-start gap-8 bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-100">
        <div className="relative">
          <button onClick={() => toggleDropdown('date')} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors bg-transparent">
            التاريخ: {dateFilter} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'date' && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-10 overflow-hidden">
              {datesList.map(date => (
                <button
                  key={date}
                  onClick={() => { setDateFilter(date); setActiveDropdown(null); }}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>



        <div className="relative w-full md:w-[350px] shrink-0 mr-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو الرقم..."
            className="w-full h-10 bg-gray-50/50 border border-gray-200 rounded-full pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-right"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

      </div>

      {/* Sessions Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500 font-bold">جاري تحميل الجلسات...</div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500 font-bold">حدث خطأ أثناء جلب الجلسات</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSessions.map((session: any) => (
            <div key={session.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[180px] h-auto">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 text-gray-600 font-bold text-[13px]">
                  قسم الجلسات <FileText size={16} />
                </div>
                <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full ${session.status === 2 ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
                  {session.status === 2 ? 'مكتملة' : 'قادمة/جارية'}
                </span>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-right">
                  <h3 className="text-xl font-black text-[#001c56] mb-2">{session.subjectName || session.groupName || 'جلسة بدون عنوان'}</h3>
                  <p className="text-gray-400 text-sm font-medium">المدرس: {session.teacherFullName || 'غير محدد'}</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">تاريخ: {new Date(session.scheduledStartUtc).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center p-10 bg-white rounded-[32px] border border-gray-100">
              <p className="text-gray-500 font-bold">لم يتم العثور على جلسات تطابق بحثك.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
