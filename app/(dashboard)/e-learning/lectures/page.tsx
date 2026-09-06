"use client";

import React, { useState } from "react";
import { Search, PlayCircle, Clock, CheckSquare, Calendar, Radio, Video } from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useSessions } from "@/lib/hooks/use-sessions";

export default function LecturesManagement() {
  const { data: authSession } = useSession();
  const tenantId = authSession?.selectedTenantId || undefined;

  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const { data: sessions = [], isLoading, isError } = useSessions({
    tenantId,
    from: today.toISOString(),
    to: nextMonth.toISOString(),
  });

  const filters = ["الكل", "نشطة", "مكتملة"];

  const filteredSessions = sessions.filter((s: any) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (s.groupName || '').toLowerCase().includes(q) ||
      (s.subjectName || '').toLowerCase().includes(q);
    
    if (activeFilter === "نشطة") return matchesSearch && s.status !== 3;
    if (activeFilter === "مكتملة") return matchesSearch && s.status === 3;
    return matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">إدارة المحاضرات والجلسات المباشرة</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mb-10">
        
        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم المادة أو المجموعة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100/80 border-none rounded-full h-12 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all"
            dir="rtl"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-row-reverse flex-wrap justify-end gap-2 w-full md:w-auto bg-[#f8fafc] p-2 rounded-full border border-white shadow-sm">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-[11px] font-bold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#001c56] text-white shadow-md shadow-blue-900/20"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-16 text-gray-500 font-bold">جاري تحميل المحاضرات...</div>
        ) : isError ? (
          <div className="text-center py-16 text-red-500 font-bold">حدث خطأ أثناء جلب المحاضرات</div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-bold">لا توجد محاضرات مجدولة حالياً</div>
        ) : (
          filteredSessions.map((session: any) => (
            <div 
              key={session.id} 
              className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse items-center justify-between gap-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-row-reverse items-center gap-4 text-right">
                <div className="w-14 h-14 bg-blue-50 text-[#001c56] rounded-2xl flex items-center justify-center shrink-0">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#001c56] text-lg mb-1">{session.groupName || 'جلسة مباشرة'}</h3>
                  <p className="text-xs text-gray-500 font-bold mb-2">
                    المادة: {session.subjectName || 'عام'} | المحاضر: {session.teacherFullName || 'غير محدد'}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Calendar size={14} />
                    <span>{new Date(session.scheduledStartUtc).toLocaleString('ar-EG')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  session.status === 3 ? 'bg-gray-100 text-gray-600' : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                  {session.status === 3 ? 'مكتملة' : 'نشطة'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
