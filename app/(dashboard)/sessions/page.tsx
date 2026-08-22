"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { MonitorPlay, PlayCircle, Video, Users, Clock, CalendarDays, Link as LinkIcon } from "lucide-react";

export default function SessionsPage() {
  const liveSessions = [
    { id: 1, title: "المراجعة النهائية - فيزياء", teacher: "أ. محمد عبد الله", time: "اليوم, 04:00 م", students: 45, status: "يبدأ قريباً" },
    { id: 2, title: "حل أسئلة بنك المعرفة - كيمياء", teacher: "د. سارة أحمد", time: "اليوم, 06:30 م", students: 32, status: "مجدول" },
    { id: 3, title: "شرح القاعدة النورانية", teacher: "الشيخ محمود", time: "غداً, 05:00 م", students: 20, status: "مجدول" },
  ];

  const recordings = [
    { id: 1, title: "تفاضل وتكامل - الدرس الأول", teacher: "أ. خالد حسن", date: "15 أغسطس 2026", duration: "1:45:00", views: 120 },
    { id: 2, title: "مراجعة الباب الثاني - جيولوجيا", teacher: "أ. منى السيد", date: "12 أغسطس 2026", duration: "2:10:00", views: 85 },
    { id: 3, title: "ورشة عمل كتابة المقال", teacher: "أ. أحمد علي", date: "10 أغسطس 2026", duration: "0:55:00", views: 200 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#001c56] mb-2 tracking-tight">الجلسات الحية والتسجيلات</h1>
        <p className="text-gray-500 font-medium">إدارة فصول البث المباشر والوصول إلى التسجيلات السابقة</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#001c56] to-blue-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Video size={100} />
          </div>
          <p className="text-blue-100 font-medium text-sm mb-2 relative z-10">جلسات اليوم</p>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl font-black">2</span>
            <span className="text-sm text-blue-200 mb-1">جلسة حية</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#001c56]">
              <PlayCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">التسجيلات المتاحة</p>
              <p className="text-2xl font-black text-[#001c56]">148</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Sessions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#001c56] flex items-center gap-2">
            <MonitorPlay className="text-red-500" size={24} />
            الجلسات القادمة (Live)
          </h2>
          <Button variant="outline" className="text-sm font-bold border-gray-200 text-gray-600 rounded-xl h-10 px-4 hover:bg-gray-50">
            جدولة جلسة جديدة
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {liveSessions.map(session => (
            <div key={session.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between h-48 group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.status === 'يبدأ قريباً' ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
                    {session.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    <Users size={12} /> {session.students}
                  </div>
                </div>
                <h3 className="font-extrabold text-[#001c56] mb-1 line-clamp-1" title={session.title}>{session.title}</h3>
                <p className="text-sm text-gray-500">{session.teacher}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <Clock size={14} className="text-[#001c56]" />
                  <span>{session.time}</span>
                </div>
                <Button className="h-8 px-4 bg-[#001c56] text-white hover:bg-blue-800 rounded-lg text-xs font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <LinkIcon size={12} /> انضمام
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recordings Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-black text-[#001c56] flex items-center gap-2">
          <PlayCircle className="text-blue-500" size={24} />
          أحدث التسجيلات
        </h2>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 w-2/5">عنوان التسجيل</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500">المعلم</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500">التاريخ</th>
                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500">المدة</th>
                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500">المشاهدات</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {recordings.map((rec, idx) => (
                <tr key={rec.id} className={`hover:bg-blue-50/30 transition-colors ${idx !== recordings.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#001c56]">
                        <Video size={18} />
                      </div>
                      <span className="font-bold text-[#001c56]">{rec.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">{rec.teacher}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-gray-400" />
                      {rec.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600 text-center" dir="ltr">{rec.duration}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600 text-center">{rec.views}</td>
                  <td className="py-4 px-6 text-left">
                    <Button variant="outline" className="h-8 w-8 p-0 rounded-lg border-gray-200 text-[#001c56] hover:bg-blue-50 hover:border-blue-200">
                      <PlayCircle size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
