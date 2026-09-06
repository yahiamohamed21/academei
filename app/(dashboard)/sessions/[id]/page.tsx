import React from "react";
import Link from "next/link";
import { 
  User, 
  Info, 
  Clock, 
  Users,
  MonitorPlay
} from "lucide-react";

export default function SessionDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the session data based on params.id
  // For now, we use mock data based on the screenshot
  const session = {
    title: 'الفيزياء المتقدمة',
    teacher: 'أ. محمد علي',
    status: 'جارية',
    time: '10:00 ص',
    attendance: 85,
    subjectCode: 'PHY-ADV-01',
    groupName: 'المجموعة المتميزة - 1',
    hall: 'القاعة الافتراضية (Video Server)',
    broadcastStatus: 'متصل',
    adminNotes: 'الجلسة تسير بشكل طبيعي مع التزام كامل من الطلاب.'
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10 px-4 md:px-8">
      
      {/* Header */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm mb-2">
          قسم الجلسات
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#001c56] tracking-tight">
          {session.title}
        </h1>
      </div>

      {/* Info Cards Row */}
      <div className="flex flex-wrap gap-6 w-full">
        
        {/* Teacher Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500 font-medium mb-3">
             <User size={18} /> المدرس
          </div>
          <span className="text-lg font-bold text-gray-700">{session.teacher}</span>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500 font-medium mb-3">
            <Info size={18} /> حالة الجلسة
          </div>
          <span className="px-6 py-1.5 bg-blue-100 text-blue-600 text-sm font-bold rounded-full">
            {session.status}
          </span>
        </div>

        {/* Time Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500 font-medium mb-3">
            <Clock size={18} /> الوقت والتاريخ
          </div>
          <span className="text-lg font-bold text-gray-700">{session.time}</span>
        </div>

        {/* Attendance Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500 font-medium mb-3 w-full justify-between">
             <span className="font-bold text-[#001c56]">{session.attendance}%</span>
             <div className="flex items-center gap-2">
               الحضور <Users size={18} />
             </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-[#001c56] rounded-full" style={{ width: `${session.attendance}%` }}></div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-gray-100 mt-8 relative">
        <h2 className="text-xl font-bold text-gray-800 text-right mb-8">
          تفاصيل إضافية
        </h2>
        
        {/* Divider */}
        <div className="h-px bg-gray-100 w-full mb-8"></div>

        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-4 items-center text-right">
            <span className="text-gray-500 font-bold col-span-4 md:col-span-3">كود المادة</span>
            <span className="text-gray-800 font-medium col-span-8 md:col-span-9">{session.subjectCode}</span>
          </div>
          
          <div className="grid grid-cols-12 gap-4 items-center text-right">
            <span className="text-gray-500 font-bold col-span-4 md:col-span-3">المجموعة</span>
            <span className="text-gray-800 font-medium col-span-8 md:col-span-9">{session.groupName}</span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center text-right">
            <span className="text-gray-500 font-bold col-span-4 md:col-span-3">القاعة</span>
            <span className="text-gray-800 font-medium col-span-8 md:col-span-9">{session.hall}</span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center text-right">
            <span className="text-gray-500 font-bold col-span-4 md:col-span-3">حالة البث</span>
            <span className="text-gray-800 font-medium col-span-8 md:col-span-9 flex items-center justify-start gap-2">
               <span className="w-2 h-2 rounded-full bg-[#001c56]"></span>
               {session.broadcastStatus}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-start text-right pt-2">
            <span className="text-gray-500 font-bold col-span-4 md:col-span-3">ملاحظات إدارية</span>
            <span className="text-gray-800 font-medium col-span-8 md:col-span-9">{session.adminNotes}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
