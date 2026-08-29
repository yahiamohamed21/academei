"use client";

import React, { useState } from "react";
import { Search, PlayCircle, Clock, CheckSquare, AlertCircle, CalendarX, Calendar, Radio, X, BookOpen, User, Video } from "lucide-react";
import Image from "next/image";

export default function LecturesManagement() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [isStartLiveModalOpen, setIsStartLiveModalOpen] = useState(false);

  const filters = ["الكل", "الآن", "قادمة", "مغلقة", "ملغاة"];

  const lectures = [
    {
      id: 1,
      title: "محاضرة الدوائر الكهربية",
      subtitle: "الفيزياء - الصف الثالث الثانوي",
      teacher: "أ. محمود أحمد",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
      status: "الآن",
      statusColor: "text-white bg-red-600",
      icon: <Radio size={24} className="text-red-500" />,
      iconBg: "bg-red-50",
      action: "ابدأ الآن",
    },
    {
      id: 2,
      title: "التفاعلات الكيميائية والاتزان",
      subtitle: "الكيمياء - الصف الثاني الثانوي",
      time: "غداً 10:00 صباحاً",
      timeIcon: <Calendar size={14} />,
      status: "قادمة",
      statusColor: "text-blue-500 bg-blue-50",
      icon: <Clock size={24} className="text-[#001c56]" />,
      iconBg: "bg-[#E4ECF7]"
    },
    {
      id: 3,
      title: "الهندسة التحليلية - الدرس الأول",
      subtitle: "الرياضيات - الصف الأول الثانوي",
      time: "بانتظار تحديد الموعد",
      status: "مغلقة",
      statusColor: "text-gray-500 bg-gray-100",
      icon: <CheckSquare size={24} className="text-gray-500" />,
      iconBg: "bg-gray-100"
    },
    {
      id: 4,
      title: "تطور الكائنات الحية",
      subtitle: "الأحياء - الصف الثالث الثانوي",
      time: "تم إلغاء المحاضرة لظروف طارئة",
      timeIcon: <AlertCircle size={14} />,
      status: "ملغاة",
      statusColor: "text-gray-500 bg-gray-100",
      icon: <CalendarX size={24} className="text-gray-400" />,
      iconBg: "bg-gray-100",
      strikethrough: true
    }
  ];

  const filteredLectures = lectures.filter(l => activeFilter === "الكل" || l.status === activeFilter);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">إدارة المحاضرات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mb-10">
        
        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم المحاضرة..." 
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
        {filteredLectures.map((lecture) => (
          <div key={lecture.id} className="bg-[#f8fafc] rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-gray-50 transition-all hover:bg-white">
            
            <div className="flex items-center justify-between w-full md:w-auto order-1 md:order-2 flex-row-reverse gap-4 md:gap-8">
              
              {/* Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 ${lecture.iconBg}`}>
                {lecture.icon}
              </div>

              {/* Info */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold ${lecture.statusColor} flex items-center gap-1 shadow-sm`}>
                    {lecture.status === 'الآن' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
                    {lecture.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">{lecture.subtitle}</span>
                </div>
                <h3 className={`text-base md:text-lg font-extrabold text-[#001c56] mb-2 ${lecture.strikethrough ? 'line-through text-gray-400' : ''}`}>
                  {lecture.title}
                </h3>
                
                {lecture.teacher && (
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-[10px] font-bold text-gray-500">{lecture.teacher}</span>
                    <Image src={lecture.avatar!} alt="Teacher" width={20} height={20} className="rounded-full border border-gray-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Actions / Time */}
            <div className="order-2 md:order-1 flex items-center justify-center w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
              {lecture.action ? (
                <button 
                  onClick={() => {
                    if(lecture.action === "ابدأ الآن") setIsStartLiveModalOpen(true);
                  }}
                  className="px-6 py-2.5 md:px-8 md:py-3.5 bg-[#b91c1c] hover:bg-red-800 text-white rounded-full font-bold text-xs md:text-sm transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2 flex-row-reverse w-full md:w-auto justify-center"
                >
                  {lecture.action}
                  <PlayCircle size={16} className="fill-white" />
                </button>
              ) : (
                <div className={`px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 flex-row-reverse 
                  ${lecture.status === 'ملغاة' ? 'text-red-500' : 'text-gray-500'}
                  ${lecture.status === 'قادمة' ? 'bg-gray-100/80 border border-gray-200/50 shadow-sm' : ''}
                `}>
                  {lecture.timeIcon && lecture.timeIcon}
                  {lecture.time}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Start Live Lecture Modal */}
      {isStartLiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[450px] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button onClick={() => setIsStartLiveModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <h2 className="text-lg font-extrabold text-[#001c56]">بدء المحاضرة المباشرة</h2>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Info */}
              <div className="text-right space-y-2">
                <div className="flex justify-end items-center gap-2 flex-row-reverse">
                  <BookOpen size={16} className="text-[#001c56]" />
                  <span className="text-sm font-extrabold text-[#001c56]">الفيزياء - الفصل الأول: الكهربية</span>
                </div>
                <div className="flex justify-end items-center gap-2 flex-row-reverse text-gray-500 pr-1">
                  <User size={14} />
                  <span className="text-xs font-bold">أ. محمود أحمد</span>
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-[#f8fafc] rounded-2xl p-6 text-right border border-gray-50">
                <h4 className="text-xs font-bold text-gray-700 mb-3">أهداف المحاضرة:</h4>
                <ul className="space-y-2 pr-4 list-disc text-[11px] font-bold text-gray-600 marker:text-[#001c56]">
                  <li>مراجعة قوانين كيرشوف</li>
                  <li>حل مسائل الدوائر المعقدة</li>
                  <li>تطبيقات عملية</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button className="w-full py-4 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20">
                  <Video size={16} />
                  بدء عبر زووم (Zoom)
                </button>
                <button className="w-full py-4 bg-white hover:bg-gray-50 text-[#001c56] border border-gray-200 rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2">
                  <PlayCircle size={16} />
                  بدء عبر جوجل ميت (Google Meet)
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
