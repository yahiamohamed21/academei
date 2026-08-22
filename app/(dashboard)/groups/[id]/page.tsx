"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the specific session
  const sessionData = {
    title: "مجموعة الكيمياء - الصف الثاني الثانوي",
    time: "01:00 م - 02:30 م",
    room: "قاعة 2",
    totalRegistered: 25,
    attending: 18,
    attendanceRate: "72%",
    students: [
      { id: 1, name: "أحمد محمد", initial: "أ", status: "حاضر", notes: "-" },
      { id: 2, name: "سارة محمود", initial: "س", status: "حاضر", notes: "-" },
      { id: 3, name: "عمر خالد", initial: "ع", status: "غائب", notes: "بعذر طبي" },
      { id: 4, name: "فاطمة علي", initial: "ف", status: "حاضر", notes: "-" },
    ]
  };

  return (
    <div className="space-y-10 pb-10">
      
      {/* Header Info */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">{sessionData.title}</h1>
        <div className="flex items-center justify-center gap-6 text-gray-500 font-medium text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span dir="ltr">{sessionData.time}</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{sessionData.room}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border-r-4 border-[#001c56] border-y border-l border-gray-100 flex flex-col items-center justify-center gap-2 h-32">
          <p className="text-gray-500 font-bold text-sm">إجمالي المسجلين</p>
          <div className="flex items-baseline gap-1 text-[#001c56]">
            <span className="text-4xl font-black">{sessionData.totalRegistered}</span>
            <span className="text-lg font-bold">طالب</span>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border-r-4 border-[#001c56] border-y border-l border-gray-100 flex flex-col items-center justify-center gap-2 h-32">
          <p className="text-gray-500 font-bold text-sm">الطلاب الحاضرين</p>
          <div className="flex items-baseline gap-2 text-[#001c56]">
            <span className="text-4xl font-black">{sessionData.attending}</span>
            <span className="text-gray-400 text-sm font-bold">{sessionData.attending}/{sessionData.totalRegistered}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border-r-4 border-[#001c56] border-y border-l border-gray-100 flex flex-col items-center justify-center gap-2 h-32">
          <p className="text-gray-500 font-bold text-sm">نسبة الحضور</p>
          <div className="text-[#001c56]">
            <span className="text-4xl font-black">{sessionData.attendanceRate}</span>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#001c56]">قائمة الحضور</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-4 px-8 text-xs font-bold text-gray-500 w-1/2">اسم الطالب</th>
                <th className="text-right py-4 px-8 text-xs font-bold text-gray-500">حالة الحضور</th>
                <th className="text-right py-4 px-8 text-xs font-bold text-gray-500">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {sessionData.students.map((student, index) => (
                <tr key={student.id} className={index !== sessionData.students.length - 1 ? "border-b border-gray-50" : ""}>
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-[#001c56] flex items-center justify-center font-bold text-sm">
                        {student.initial}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-8">
                    <span className={`text-sm font-bold ${student.status === 'حاضر' ? 'text-[#001c56]' : 'text-gray-400'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-8">
                    <span className="text-xs text-gray-400">{student.notes}</span>
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
