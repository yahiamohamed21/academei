"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Plus, Clock, Users, DoorOpen } from "lucide-react";

type ClassSession = {
  id: string;
  title: string;
  status: "now" | "upcoming";
  time: string;
  students: string;
  room: string;
  filterType: "today" | "week" | "month";
};

const DUMMY_SESSIONS: ClassSession[] = [
  {
    id: "1",
    title: "مجموعة الكيمياء - الصف الثاني الثانوي",
    status: "now",
    time: "08:00 - 09:30",
    students: "18 / 25 طالب",
    room: "القاعة أ-101",
    filterType: "today",
  },
  {
    id: "2",
    title: "مجموعة الفيزياء - الصف الأول الثانوي",
    status: "upcoming",
    time: "12:00 - 13:30",
    students: "40 / 50 طالب",
    room: "المدرج ب",
    filterType: "today",
  },
  {
    id: "3",
    title: "الرياضيات المتقدمة - الصف الثالث",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "23 / 30 طالب",
    room: "قاعة 101",
    filterType: "week",
  },
  {
    id: "4",
    title: "جلسة تدريبية 4",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "19 / 30 طالب",
    room: "قاعة 104",
    filterType: "month",
  },
  {
    id: "5",
    title: "جلسة تدريبية 5",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "18 / 30 طالب",
    room: "قاعة 104",
    filterType: "week",
  },
  {
    id: "6",
    title: "جلسة تدريبية 6",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "22 / 30 طالب",
    room: "قاعة 111",
    filterType: "month",
  },
  {
    id: "7",
    title: "جلسة تدريبية 7",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "15 / 30 طالب",
    room: "قاعة 110",
    filterType: "today",
  },
  {
    id: "8",
    title: "جلسة تدريبية 8",
    status: "now",
    time: "14:00 - 15:30",
    students: "15 / 30 طالب",
    room: "قاعة 118",
    filterType: "today",
  },
  {
    id: "9",
    title: "جلسة تدريبية 9",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "18 / 30 طالب",
    room: "قاعة 106",
    filterType: "week",
  },
  {
    id: "10",
    title: "جلسة تدريبية 10",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "19 / 30 طالب",
    room: "قاعة 109",
    filterType: "month",
  },
  {
    id: "11",
    title: "جلسة تدريبية 11",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "18 / 30 طالب",
    room: "قاعة 119",
    filterType: "week",
  },
  {
    id: "12",
    title: "جلسة تدريبية 12",
    status: "now",
    time: "14:00 - 15:30",
    students: "15 / 30 طالب",
    room: "قاعة 108",
    filterType: "today",
  },
  {
    id: "13",
    title: "جلسة تدريبية 13",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "16 / 30 طالب",
    room: "قاعة 103",
    filterType: "month",
  },
  {
    id: "14",
    title: "جلسة تدريبية 14",
    status: "upcoming",
    time: "14:00 - 15:30",
    students: "15 / 30 طالب",
    room: "قاعة 110",
    filterType: "week",
  },
  {
    id: "15",
    title: "جلسة تدريبية 15",
    status: "upcoming",
    time: "08:00 - 09:30",
    students: "18 / 25 طالب",
    room: "القاعة أ-101",
    filterType: "month",
  },
];

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today");

  const filteredSessions = React.useMemo(() => {
    return DUMMY_SESSIONS.filter((session) => {
      if (activeTab === "today") return session.filterType === "today";
      if (activeTab === "week") return session.filterType === "today" || session.filterType === "week";
      return true; // "month" shows all
    });
  }, [activeTab]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary)] mb-2 tracking-tight">جدول الحصص والتقويم</h1>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            <Calendar size={16} /> الخميس، 20 أغسطس 2026
          </p>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
          {/* Segmented Control */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner">
            <button 
              onClick={() => setActiveTab("month")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "month" ? "bg-white text-[var(--primary)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              الشهر
            </button>
            <button 
              onClick={() => setActiveTab("week")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "week" ? "bg-white text-[var(--primary)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              الأسبوع
            </button>
            <button 
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "today" ? "bg-white text-[var(--primary)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              اليوم
            </button>
          </div>

          <Link href="/groups/new" className="w-full md:w-auto">
            <Button className="bg-[#001c56] hover:bg-[#001033] text-white gap-2 h-11 px-6 rounded-xl shadow-md w-full font-bold">
              <Plus size={18} />
              إضافة حصة جديدة
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid of Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSessions.map((session) => {
          const isNow = session.status === "now";
          return (
            <Link href={`/groups/${session.id}`} key={session.id}>
              <div 
                className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between h-[140px] cursor-pointer`}
              >
                {/* Colored Bar on the Right */}
                <div className={`absolute top-0 right-0 bottom-0 w-1.5 ${isNow ? 'bg-red-500' : 'bg-[#1e3a8a]'}`} />
                
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-extrabold text-[#001c56] leading-snug flex-1 pr-3 hover:text-blue-700 transition-colors">{session.title}</h3>
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shrink-0
                    ${isNow ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[#1e3a8a]'}`}
                  >
                    {isNow ? 'الآن' : 'قادمة'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 pr-3 mt-4">
                  <div className="flex items-center gap-1.5">
                    <DoorOpen size={14} className="text-gray-400" />
                    <span>{session.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-gray-400" />
                    <span>{session.students}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-gray-400" />
                    <span dir="ltr">{session.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
