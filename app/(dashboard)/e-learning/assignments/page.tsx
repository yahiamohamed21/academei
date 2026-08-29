"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Users, Clock, AlertCircle, AlertTriangle, CheckCircle2, FileText, FlaskConical, Globe, BookOpen, X, GraduationCap, User, PieChart, Bell, Calendar } from "lucide-react";
import EmptySearch from "@/components/ui/EmptySearch";
import Link from "next/link";

export default function AssignmentsPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLateModalOpen, setIsLateModalOpen] = useState(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false);

  const filters = ["الكل", "قيد التنفيذ", "متأخر", "منتهي"];

  const assignments = [
    {
      id: 1,
      title: "مراجعة الميكانيكا الشاملة",
      subject: "الفيزياء - الصف الثاني الثانوي",
      studentsCount: "180 / 210 طالب",
      deadline: "15 نوفمبر - متبقي 2 أيام",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <FileText size={20} className="text-[#001c56]" />,
    },
    {
      id: 2,
      title: "تمارين الكيمياء العضوية",
      subject: "الكيمياء - الصف الثالث الثانوي",
      studentsCount: "40 / 60 طالب",
      deadline: "10 نوفمبر - متأخر يومين",
      status: "متأخر",
      statusColor: "text-red-500 bg-red-50 border-red-500",
      pillColor: "text-red-500 bg-red-50",
      buttonText: "متابعة",
      icon: <AlertCircle size={20} className="text-red-500" />,
    },
    {
      id: 3,
      title: "تلخيص الفصل الأول - تاريخ",
      subject: "التاريخ - الصف الأول الثانوي",
      studentsCount: "120 / 120 طالب",
      deadline: "5 نوفمبر - تم التسليم",
      status: "منتهي",
      statusColor: "text-green-600 bg-green-50 border-green-600",
      pillColor: "text-green-600 bg-green-50",
      buttonText: "عرض التفاصيل",
      icon: <CheckCircle2 size={20} className="text-green-600" />,
    },
    {
      id: 4,
      title: "تجربة البندول البسيط",
      subject: "الفيزياء - الصف الثاني الثانوي",
      studentsCount: "120 / 210 طالب",
      deadline: "12 نوفمبر - متبقي 5 أيام",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <FlaskConical size={20} className="text-[#001c56]" />,
    },
    {
      id: 5,
      title: "مسائل التفاضل والتكامل",
      subject: "الرياضيات - الصف الثالث الثانوي",
      studentsCount: "95 / 100 طالب",
      deadline: "19 نوفمبر - متبقي أسبوع",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <BookOpen size={20} className="text-[#001c56]" />,
    },
    {
      id: 6,
      title: "مقال اللغة الإنجليزية",
      subject: "اللغة الإنجليزية - الصف الأول الثانوي",
      studentsCount: "150 / 150 طالب",
      deadline: "5 نوفمبر - تم التسليم",
      status: "منتهي",
      statusColor: "text-green-600 bg-green-50 border-green-600",
      pillColor: "text-green-600 bg-green-50",
      buttonText: "عرض التفاصيل",
      icon: <CheckCircle2 size={20} className="text-green-600" />,
    },
    {
      id: 7,
      title: "رسم الخلية النباتية",
      subject: "الأحياء - الصف الثاني الثانوي",
      studentsCount: "12 / 40 طالب",
      deadline: "8 نوفمبر - متأخر 3 أيام",
      status: "متأخر",
      statusColor: "text-red-500 bg-red-50 border-red-500",
      pillColor: "text-red-500 bg-red-50",
      buttonText: "متابعة",
      icon: <AlertCircle size={20} className="text-red-500" />,
    },
    {
      id: 8,
      title: "تحليل قصيدة المتنبي",
      subject: "اللغة العربية - الصف الثالث الثانوي",
      studentsCount: "160 / 170 طالب",
      deadline: "22 نوفمبر - متبقي 10 أيام",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <FileText size={20} className="text-[#001c56]" />,
    },
    {
      id: 9,
      title: "نظريات علم النفس الحديث",
      subject: "علم النفس - الصف الثالث الثانوي",
      studentsCount: "105 / 110 طالب",
      deadline: "25 نوفمبر - متبقي 12 يوم",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <Globe size={20} className="text-[#001c56]" />,
    },
    {
      id: 10,
      title: "جغرافيا الوطن العربي",
      subject: "الجغرافيا - الصف الأول الثانوي",
      studentsCount: "111 / 120 طالب",
      deadline: "28 نوفمبر - متبقي 14 يوم",
      status: "قيد التنفيذ",
      statusColor: "text-blue-600 bg-blue-50 border-blue-600",
      pillColor: "text-blue-600 bg-blue-50",
      buttonText: "عرض التفاصيل",
      icon: <Globe size={20} className="text-[#001c56]" />,
    },
  ];

  const filteredAssignments = assignments.filter(a => activeFilter === "الكل" || a.status === activeFilter);

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">الواجبات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-white p-3 rounded-full border border-gray-100 shadow-sm flex-row-reverse">
        
        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الواجب أو المادة..." 
            className="w-full bg-gray-50/80 border border-gray-100 rounded-full h-11 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all"
            dir="rtl"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-row-reverse flex-wrap items-center gap-2 w-full md:w-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#001c56] text-white shadow-md shadow-blue-900/20"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
          
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          
          <button className="px-5 py-2 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2 flex-row-reverse">
            حسب المادة
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>

      </div>

      {/* List */}
      {filteredAssignments.length > 0 ? (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className="bg-white rounded-[24px] p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Status Border Right */}
              <div className={`absolute right-0 top-0 bottom-0 w-1.5 ${assignment.statusColor.split(' ')[2]}`}></div>
              
              {/* Right Group (Icon + Text) */}
              <div className="flex items-center gap-4 flex-row-reverse flex-1 mr-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                  {assignment.icon}
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-extrabold text-[#001c56] mb-1.5">{assignment.title}</h3>
                  <p className="text-[10px] font-bold text-gray-400">{assignment.subject}</p>
                </div>
              </div>

              {/* Middle Group (Stats & Time) */}
              <div className="flex items-center justify-between gap-8 flex-1 md:flex-row-reverse">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <Users size={14} className="text-gray-400" />
                  <span className="text-[11px] font-bold text-gray-500" dir="rtl">{assignment.studentsCount}</span>
                </div>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <Clock size={14} className={assignment.status === 'متأخر' ? 'text-red-400' : 'text-gray-400'} />
                  <span className={`text-[11px] font-bold ${assignment.status === 'متأخر' ? 'text-red-500' : 'text-gray-500'}`} dir="rtl">
                    {assignment.deadline}
                  </span>
                </div>
              </div>

              {/* Left Group (Pill & Button) */}
              <div className="flex items-center justify-end gap-6 w-full md:w-auto">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm ${assignment.pillColor}`}>
                  {assignment.status}
                </span>
                <button 
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    if (assignment.status === 'متأخر') {
                      setIsLateModalOpen(true);
                    } else if (assignment.status === 'منتهي') {
                      setIsFinishedModalOpen(true);
                    } else {
                      setIsDetailsModalOpen(true);
                    }
                  }}
                  className="px-6 py-2.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-[11px] transition-colors shadow-md min-w-[120px]"
                >
                  {assignment.buttonText}
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <EmptySearch message="لم نتمكن من العثور على واجبات مطابقة لخيارات الفلترة الحالية. جرب تغيير الفلاتر أو إعادة ضبطها." />
      )}

      {/* Assignment Details Modal */}
      {isDetailsModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[650px] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col p-6">
            
            {/* Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setIsDetailsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-3 flex-row-reverse">
                <h2 className="text-lg md:text-xl font-extrabold text-[#001c56]">تفاصيل الواجب النشط والمتابعة الحية</h2>
                <div className="px-3 py-1 rounded-full bg-green-50 border border-green-100 flex items-center gap-1.5 flex-row-reverse">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-[10px] font-bold text-green-700">نشط</span>
                </div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              
              {/* Top Right */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex justify-between items-center flex-row-reverse">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-gray-500 mb-1">الواجب</span>
                  <span className="text-xs font-extrabold text-[#001c56]">{selectedAssignment.title}</span>
                </div>
                <FileText size={20} className="text-[#001c56] opacity-80" />
              </div>

              {/* Top Left */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex justify-between items-center flex-row-reverse">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-gray-500 mb-1">المادة</span>
                  <span className="text-xs font-extrabold text-[#001c56]">{selectedAssignment.subject.split(' - ')[0]}</span>
                </div>
                <GraduationCap size={20} className="text-[#001c56] opacity-80" />
              </div>

              {/* Bottom Right */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex justify-between items-center flex-row-reverse">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-gray-500 mb-1">المعلم</span>
                  <span className="text-xs font-extrabold text-[#001c56]">أ. هاني سيف</span>
                </div>
                <User size={20} className="text-[#001c56] opacity-80" />
              </div>

              {/* Bottom Left */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex justify-between items-center flex-row-reverse">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-gray-500 mb-1">الموعد النهائي</span>
                  <span className="text-[11px] font-extrabold text-orange-500">متبقي 3 أيام</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-orange-500" />
                </div>
              </div>

            </div>

            {/* Middle Layout: 1/3 (Left Stats) + 2/3 (Right Progress) */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              
              {/* Right Side: Progress Bars (order-1 md:order-2 for RTL) */}
              <div className="w-full md:w-2/3 order-1 md:order-2 bg-[#f8fafc] rounded-3xl p-6 flex flex-col justify-center">
                <h3 className="text-sm font-extrabold text-[#001c56] mb-6 text-right">حالة التسليم</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2 flex-row-reverse">
                      <span className="text-xs font-bold text-gray-600">الطلاب الذين أتموا الحل</span>
                      <span className="text-[10px] font-bold text-[#001c56]">180 طالب</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 flex justify-end">
                      <div className="bg-[#001c56] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 flex-row-reverse">
                      <span className="text-xs font-bold text-gray-600">الطلاب المتوقع تسليمهم قريباً</span>
                      <span className="text-[10px] font-bold text-gray-500">10 طلاب</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 flex justify-end">
                      <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 flex-row-reverse">
                      <span className="text-xs font-bold text-gray-600">الطلاب الذين لم يبدأوا بعد</span>
                      <span className="text-[10px] font-bold text-red-500">20 طالب</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 flex justify-end">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Side: Stats (order-2 md:order-1) */}
              <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col gap-3">
                <div className="bg-[#001c56] rounded-3xl p-6 flex flex-col items-center justify-center text-center text-white flex-1 shadow-md shadow-blue-900/20">
                  <PieChart size={24} className="mb-2 opacity-80" />
                  <span className="text-[10px] text-blue-100 font-bold mb-1">نسبة الإنجاز</span>
                  <span className="text-2xl font-black">85%</span>
                </div>
                
                <div className="bg-[#f8fafc] rounded-3xl p-6 flex flex-col items-center justify-center text-center flex-1">
                  <Users size={24} className="mb-2 text-gray-400" />
                  <span className="text-[10px] text-gray-500 font-bold mb-1">إجمالي المسجلين</span>
                  <span className="text-2xl font-black text-[#001c56]">210</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <button className="px-6 py-3 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-md shadow-blue-900/20 flex items-center gap-2 flex-row-reverse">
                <Bell size={16} />
                إرسال تنبيه للمتأخرين
              </button>

              <Link href={`/e-learning/assignments/${selectedAssignment.id}`}>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#001c56] rounded-full text-xs font-bold transition-colors flex items-center gap-2 flex-row-reverse">
                  <Calendar size={16} />
                  كشف الطلاب
                </button>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Late Assignment Modal */}
      {isLateModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[600px] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <button onClick={() => setIsLateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-3 flex-row-reverse">
                <h2 className="text-lg md:text-xl font-extrabold text-[#001c56]">متابعة الواجبات المتأخرة والتقصير</h2>
                <div className="px-3 py-1.5 rounded-full bg-red-100 border border-red-200 flex items-center gap-1.5 flex-row-reverse">
                  <AlertTriangle size={12} className="text-red-500" />
                  <span className="text-[10px] font-bold text-red-600">متأخر</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {/* Row 1: Mission and Teacher */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Mission (Right) */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center justify-between flex-row-reverse flex-1">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-gray-500 mb-1">المهمة</span>
                    <span className="text-xs font-extrabold text-[#001c56]">{selectedAssignment.title}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#001c56] flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-white" />
                  </div>
                </div>

                {/* Teacher (Left) */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center justify-between flex-row-reverse flex-1">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-gray-500 mb-1">المعلم</span>
                    <span className="text-xs font-extrabold text-[#001c56]">أ. هاني سيف</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User size={18} className="text-[#001c56]" />
                  </div>
                </div>
              </div>

              {/* Row 2: Delay Info */}
              <div className="bg-red-50 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between flex-row-reverse gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 flex-row-reverse text-center md:text-right">
                  <div className="w-10 h-10 rounded-full bg-[#b91c1c] flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-red-700/70 mb-1 block">مدة التأخير</span>
                    <span className="text-xs font-extrabold text-[#b91c1c]">{selectedAssignment.deadline.split(' - ')[1]}</span>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <span className="text-[10px] font-bold text-red-700/70 mb-1 block">نقص التسليم</span>
                  <span className="text-xs font-extrabold text-[#b91c1c]">{selectedAssignment.studentsCount.split(' / ')[1].replace('طالب','').trim() - selectedAssignment.studentsCount.split(' / ')[0]} طالب لم يسلموا بعد</span>
                </div>
              </div>

              {/* Row 3: Progress Bar */}
              <div className="border border-gray-100 rounded-2xl p-6">
                <div className="text-right mb-4">
                  <span className="text-[11px] font-bold text-gray-600">معدل الإنجاز</span>
                </div>
                
                <div className="flex justify-between items-center mb-2 flex-row-reverse">
                  <span className="text-[10px] font-bold text-[#001c56]">تم التسليم (25%)</span>
                  <span className="text-[10px] font-bold text-[#b91c1c]">متأخرون (75%)</span>
                </div>
                
                <div className="w-full h-3 rounded-full flex flex-row-reverse overflow-hidden">
                  <div className="bg-[#001c56] h-full" style={{ width: '25%' }}></div>
                  <div className="bg-[#b91c1c] h-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-start border-t border-gray-50 pt-6">
              <button className="px-6 py-3 bg-[#b91c1c] hover:bg-red-800 text-white rounded-full text-xs font-bold transition-colors shadow-md shadow-red-900/20 flex items-center gap-2 flex-row-reverse">
                <Bell size={16} />
                إرسال تنبيه جماعي للمتأخرين
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Finished Assignment Modal */}
      {isFinishedModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[650px] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <button onClick={() => setIsFinishedModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-3 flex-row-reverse">
                <h2 className="text-lg md:text-xl font-extrabold text-[#001c56]">أرشيف وتسليمات الواجب المنتهي</h2>
                <div className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 flex items-center gap-1.5 flex-row-reverse">
                  <CheckCircle2 size={12} className="text-gray-500" />
                  <span className="text-[10px] font-bold text-gray-600">منتهي</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {/* Row 1: Grid of 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Avg Score (Right) */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-500 mb-2">متوسط الدرجات النهائي</span>
                  <div className="flex items-baseline gap-1 flex-row-reverse">
                    <span className="text-2xl font-black text-[#001c56]">18</span>
                    <span className="text-sm font-bold text-gray-400">/ 20</span>
                  </div>
                </div>

                {/* Delivery Rate (Middle) */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center justify-center gap-4 flex-row-reverse">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-gray-500 mb-1 block">نسبة التسليم الكلية</span>
                    <span className="text-2xl font-black text-[#001c56]">85%</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-[#001c56] border-t-gray-200 flex items-center justify-center shrink-0 rotate-45"></div>
                </div>

                {/* Subject Info (Left) */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center justify-center gap-3 flex-row-reverse">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-extrabold text-[#001c56] block">{selectedAssignment.subject.split(' - ')[0]}</span>
                    <span className="text-[9px] font-bold text-gray-400">الأستاذ/ محمد حسن</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mb-auto">
                    <GraduationCap size={14} className="text-[#001c56]" />
                  </div>
                </div>
              </div>

              {/* Row 2: Progress Bar */}
              <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 relative">
                <div className="text-right mb-6">
                  <span className="text-[11px] font-bold text-gray-600">حالة التسليمات التاريخية</span>
                </div>
                
                <div className="w-full h-6 rounded-full flex flex-row-reverse overflow-hidden mb-6">
                  {/* On time (Dark Blue) */}
                  <div className="bg-[#001c56] h-full" style={{ width: '70%' }}></div>
                  {/* Late (Light Blue) */}
                  <div className="bg-blue-200 h-full" style={{ width: '20%' }}></div>
                  {/* Did not submit (Dark Red/Brown) */}
                  <div className="bg-[#541f1f] h-full" style={{ width: '10%' }}></div>
                </div>

                <div className="flex justify-between items-center flex-row-reverse px-2">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#001c56]"></span>
                    <span className="text-[10px] font-bold text-gray-600">سلموا في الموعد (80)</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-200"></span>
                    <span className="text-[10px] font-bold text-gray-600">سلموا متأخراً (20)</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#541f1f]"></span>
                    <span className="text-[10px] font-bold text-gray-600">تخلفوا عن التسليم (10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-start">
              <button className="px-6 py-3 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-md shadow-blue-900/20 flex items-center gap-2 flex-row-reverse">
                <FileText size={16} />
                تصدير تقرير النتائج PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
