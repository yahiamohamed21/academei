"use client";

import React, { useState } from "react";
import { Search, Users, CheckCircle2, AlertTriangle, Bell, Download, ChevronRight, ChevronLeft, TrendingUp, X, Send, MessageSquare, FileText } from "lucide-react";
import Link from "next/link";
import EmptySearch from "@/components/ui/EmptySearch";

export default function AssignmentStudentsPage({ params }: { params: { id: string } }) {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedAlertStudent, setSelectedAlertStudent] = useState<any>(null);
  const [isBulkAlertModalOpen, setIsBulkAlertModalOpen] = useState(false);

  const filters = ["الكل", "أتموا التسليم", "متأخرون", "لم يبدأوا"];

  const students = [
    {
      id: 1,
      name: "أروى محمد علي",
      grade: "الصف الثالث الثانوي - علمي",
      status: "تم التسليم",
      statusColor: "text-gray-700 bg-gray-100",
      statusDot: "bg-gray-500",
      date: "12 يناير 2026",
      initial: "أ",
      initialBg: "bg-[#001c56] text-white",
      highlightRow: false
    },
    {
      id: 2,
      name: "أحمد محمد علي",
      grade: "الصف الثالث الثانوي - أدبي",
      status: "متأخر",
      statusColor: "text-red-500 bg-red-50",
      statusDot: "bg-red-500",
      date: "05 أكتوبر 2026",
      initial: "أ",
      initialBg: "bg-[#001c56] text-white",
      action: "إرسال تنبيه",
      highlightRow: true
    },
    {
      id: 3,
      name: "مصطفى كمال",
      grade: "الصف الثاني الثانوي",
      status: "قيد التنفيذ",
      statusColor: "text-gray-500 bg-gray-100",
      statusDot: "bg-gray-400",
      date: "اليوم",
      initial: "م",
      initialBg: "bg-blue-100 text-blue-600",
      highlightRow: false
    },
    {
      id: 4,
      name: "نور الدين إبراهيم",
      grade: "الصف الأول الثانوي",
      status: "لم يبدأ",
      statusColor: "text-gray-400 bg-gray-100",
      date: "--",
      initial: "ن",
      initialBg: "bg-gray-100 text-gray-500",
      highlightRow: false
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchQuery) || student.grade.includes(searchQuery);
    
    // Mapping our filter text to the student status text where needed
    // Filters: "الكل", "أتموا التسليم", "متأخرون", "لم يبدأوا"
    // Statuses: "تم التسليم", "متأخر", "قيد التنفيذ", "لم يبدأ"
    let matchesFilter = true;
    if (activeFilter === "أتموا التسليم") matchesFilter = student.status === "تم التسليم";
    else if (activeFilter === "متأخرون") matchesFilter = student.status === "متأخر";
    else if (activeFilter === "لم يبدأوا") matchesFilter = student.status === "لم يبدأ";

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-20">
      
      {/* Top Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        
        {/* Filters */}
        <div className="flex flex-row-reverse flex-wrap items-center gap-2 w-full md:w-auto bg-white p-2 rounded-full shadow-sm border border-gray-100">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#001c56] text-white shadow-md shadow-blue-900/20"
                  : "bg-transparent text-gray-500 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الواجب أو الطالب..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-full h-11 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all shadow-sm"
            dir="rtl"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

      </div>

      {/* Analytics Section */}
      <div className="flex flex-col xl:flex-row gap-6 mb-10">
        
        {/* Chart Card */}
        <div className="flex-1 bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8 flex-row-reverse">
            <div className="text-right">
              <h2 className="text-xl font-extrabold text-[#001c56] mb-1">إتمام المهام الشهرية</h2>
              <p className="text-xs font-bold text-gray-400">نظرة عامة على تقدم الطلاب</p>
            </div>
            
            <div className="px-3 py-1.5 bg-[#f8fafc] rounded-full flex items-center gap-2 flex-row-reverse shadow-sm border border-gray-50">
              <TrendingUp size={12} className="text-[#001c56]" />
              <span className="text-[10px] font-bold text-[#001c56]">12% عن الشهرين الماضيين</span>
            </div>
          </div>

          <div className="relative h-48 w-full mt-4">
            {/* Y-axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between items-start text-[9px] font-bold text-gray-400">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
              <span>0</span>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute left-10 right-0 top-1.5 bottom-6 flex flex-col justify-between">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="w-full border-t border-gray-100 h-0"></div>
              ))}
            </div>

            {/* SVG Area Chart */}
            <div className="absolute left-10 right-0 top-1.5 bottom-6 overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#001c56" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#001c56" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 600,120 C 500,110 450,80 350,50 C 250,20 200,30 100,20 C 50,15 25,30 0,40 L 0,150 L 600,150 Z" 
                  fill="url(#areaGradient)" 
                />
                <path 
                  d="M 600,120 C 500,110 450,80 350,50 C 250,20 200,30 100,20 C 50,15 25,30 0,40" 
                  fill="none" 
                  stroke="#001c56" 
                  strokeWidth="2.5" 
                />
              </svg>
            </div>
            
            {/* X-axis Labels */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-between items-end text-[9px] font-bold text-gray-500">
              <span>Nov-Dec</span>
              <span>Sep-Oct</span>
              <span>Jul-Aug</span>
              <span>May-Jun</span>
              <span>Mar-Apr</span>
              <span>Jan-Feb</span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="w-full xl:w-[350px] flex flex-col gap-4">
          
          <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between items-center flex-row-reverse border border-gray-50 shadow-sm">
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-gray-500 mb-1">إجمالي الطلاب</span>
              <span className="text-2xl font-black text-[#001c56]">250</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Users size={20} className="text-[#001c56]" />
            </div>
          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-6 flex justify-between items-center flex-row-reverse border border-gray-50 shadow-sm">
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-gray-500 mb-1">الطلاب المنتظمون</span>
              <span className="text-2xl font-black text-[#001c56]">185</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-[#001c56]" />
            </div>
          </div>

          <div className="bg-red-50 rounded-3xl p-6 flex justify-between items-center flex-row-reverse shadow-sm">
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-red-600 mb-1">الطلاب المتأخرون</span>
              <span className="text-2xl font-black text-red-600">65</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
          </div>

        </div>

      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
        
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center flex-row-reverse">
          <h2 className="text-lg font-extrabold text-[#001c56]">قائمة الطلاب</h2>
          <button 
            onClick={() => setIsBulkAlertModalOpen(true)}
            className="px-5 py-2.5 bg-[#b91c1c] hover:bg-red-800 text-white rounded-full text-[11px] font-bold transition-colors flex items-center gap-2 flex-row-reverse shadow-md shadow-red-900/20"
          >
            <Bell size={14} />
            إرسال تنبيه جماعي للمتأخرين
          </button>
        </div>

        {/* Table */}
        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-[11px] font-bold border-b border-gray-100">
                  <th className="p-4 pr-8 text-right font-bold w-[40%]">اسم الطالب والصف</th>
                  <th className="p-4 text-center font-bold w-[20%]">حالة التسليم</th>
                  <th className="p-4 text-center font-bold w-[20%]">تاريخ آخر نشاط</th>
                  <th className="p-4 pl-8 text-left font-bold w-[20%]">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className={`transition-colors hover:bg-gray-50/50 ${student.highlightRow ? 'bg-red-50/30' : ''}`}>
                    <td className="p-4 pr-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-extrabold text-sm shadow-sm ${student.initialBg}`}>
                          {student.initial}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-extrabold text-[#001c56] mb-0.5">{student.name}</span>
                          <span className="text-[10px] font-bold text-gray-400">{student.grade}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm ${student.statusColor}`}>
                          {student.statusDot && <span className={`w-1.5 h-1.5 rounded-full ${student.statusDot}`}></span>}
                          {!student.statusDot && <span className="w-2"></span>}
                          {student.status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center text-xs font-bold text-gray-500">
                      {student.date}
                    </td>
                    
                    <td className="p-4 pl-8">
                      <div className="flex justify-end">
                        {student.action && (
                          <button 
                            onClick={() => {
                              setSelectedAlertStudent(student);
                              setIsAlertModalOpen(true);
                            }}
                            className="px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold hover:bg-red-200 transition-colors flex items-center gap-1.5 border border-red-200/50"
                          >
                            <Bell size={12} />
                            {student.action}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptySearch message="لم نتمكن من العثور على طلاب مطابقين للبحث أو الفلتر المختار." />
        )}

      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Pagination */}
        <div className="flex items-center gap-4 flex-row-reverse">
          <span className="text-[11px] font-bold text-gray-500">عرض 1-4 من 250 طالب</span>
          
          <div className="flex items-center gap-1 flex-row-reverse">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronRight size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#001c56] text-white font-bold text-[11px] shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="text-gray-400 font-bold px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>

        {/* Export */}
        <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#001c56] rounded-full text-[11px] font-bold transition-colors flex items-center gap-2 flex-row-reverse border border-gray-200/50">
          <Download size={14} />
          تصدير التقرير PDF
        </button>

      </div>

      {/* Individual Alert Modal */}
      {isAlertModalOpen && selectedAlertStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[650px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <button onClick={() => setIsAlertModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-1">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#001c56] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Bell size={24} />
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-extrabold text-[#001c56] mb-1">إرسال تنبيه فردي للطالب {selectedAlertStudent.name.split(' ').slice(0, 2).join(' ')}</h2>
                  <p className="text-[11px] font-bold text-gray-500">قم بمراجعة تفاصيل الطالب ونص الرسالة قبل التأكيد.</p>
                </div>
              </div>
            </div>

            {/* Student Details Card */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 mb-8 border border-gray-50 flex items-center justify-between flex-row-reverse shadow-sm">
              
              {/* Name */}
              <div className="flex items-center gap-4 flex-row-reverse flex-1">
                <div className="w-12 h-12 rounded-full bg-[#001c56] text-white font-extrabold flex items-center justify-center text-lg shadow-md shrink-0">
                  {selectedAlertStudent.initial}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 mb-1 block">اسم الطالب</span>
                  <span className="text-xs font-extrabold text-[#001c56] block">{selectedAlertStudent.name}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-gray-200 mx-4"></div>

              {/* ID */}
              <div className="text-center flex-1">
                <span className="text-[10px] font-bold text-gray-400 mb-1 block">رقم التعريف</span>
                <span className="text-xs font-extrabold text-gray-700 block" dir="ltr">STU-55231</span>
              </div>

              <div className="w-px h-10 bg-gray-200 mx-4"></div>

              {/* Email */}
              <div className="text-left flex-1">
                <span className="text-[10px] font-bold text-gray-400 mb-1 block">البريد الإلكتروني</span>
                <span className="text-xs font-extrabold text-gray-700 block text-left" dir="ltr">ahmed.m@eduportal.com</span>
              </div>

            </div>

            {/* Alert Text */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 flex-row-reverse text-[#001c56]">
                <MessageSquare size={16} />
                <span className="text-[11px] font-bold">نص التنبيه</span>
              </div>
              
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <textarea 
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-[13px] font-medium text-gray-600 leading-relaxed text-right h-24 p-0 focus:outline-none"
                  defaultValue="عزيزي الطالب، نود إخطارك بضرورة تسليم المهام الدراسية بخصوص واجب الميكانيكا المتأخرة في أسرع وقت ممكن لضمان سير عمليتك التعليمية بنجاح."
                  dir="rtl"
                />
              </div>
              <p className="text-right mt-3 text-[10px] font-bold text-gray-400">
                * يمكن تعديل النص الافتراضي في هذا الإجراء.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-50 flex-row-reverse">
              <button className="px-8 py-3.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2 flex-row-reverse">
                <Send size={16} />
                تأكيد إرسال التنبيه الفردي
              </button>

              <button 
                onClick={() => setIsAlertModalOpen(false)}
                className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs font-bold transition-colors"
              >
                إلغاء
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bulk Alert Modal */}
      {isBulkAlertModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <button onClick={() => setIsBulkAlertModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-1">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-sm border border-red-100">
                  <AlertTriangle size={20} />
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-extrabold text-[#001c56]">تأكيد إرسال الإنذار الجماعي للمتأخرين</h2>
                </div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {/* Right Card */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-gray-500 mb-1">إجمالي الطلاب المتأخرين</span>
                <div className="flex items-center gap-1.5 flex-row-reverse">
                  <Users size={14} className="text-[#001c56]" />
                  <span className="text-sm font-extrabold text-[#001c56]">65 طالباً</span>
                </div>
              </div>

              {/* Left Card */}
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-gray-500 mb-1">الواجب المستهدف</span>
                <div className="flex items-center gap-1.5 flex-row-reverse">
                  <FileText size={14} className="text-[#001c56]" />
                  <span className="text-xs font-extrabold text-[#001c56]">الميكانيكا - الفصل الثالث</span>
                </div>
              </div>
            </div>

            {/* Alert Text */}
            <div className="mb-8">
              <div className="text-right mb-3">
                <span className="text-[10px] font-bold text-gray-500">نص الرسالة الإدارية</span>
              </div>
              
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 relative">
                <span className="absolute top-4 right-4 text-4xl text-gray-200 font-serif leading-none">"</span>
                <p className="text-[12px] font-bold text-gray-600 leading-relaxed text-right relative z-10 px-6">
                  تنبيه إداري عاجل: لقد تجاوزتم الموعد النهائي لتسليم الواجبات الدراسية المطلوبة. يرجى سرعة إنجاز المهام وتفادي تأثير ذلك على تقييم الأداء العام.
                </p>
              </div>
              <p className="text-right mt-3 text-[10px] font-bold text-gray-400">
                * لا يمكن تعديل النص الافتراضي في هذا الإجراء.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center flex-row-reverse">
              <button className="px-8 py-3.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2 flex-row-reverse">
                <Send size={16} />
                تأكيد وإرسال الإنذار الجماعي
              </button>

              <button 
                onClick={() => setIsBulkAlertModalOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                تراجع
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
