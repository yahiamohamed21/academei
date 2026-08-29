"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, PlayCircle, Users, Clock, FileText, CheckCircle2, Activity, Calendar, FileClock, ClipboardEdit, BarChart2, X, Award, Target, List, Settings, Timer, Shield, Info } from "lucide-react";

export default function ExamsPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedExamForResults, setSelectedExamForResults] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExamForEdit, setSelectedExamForEdit] = useState<any>(null);
  const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);

  const filters = ["الكل", "الآن", "المنتهي", "القادمة", "المعلقة", "الملغاة"];

  const pastExams = [
    {
      id: 1,
      title: "امتحان الرياضيات النهائي",
      status: "منتهي",
      statusColor: "bg-gray-100 text-gray-500",
      avgScore: "85%",
      attendance: "98%",
    },
    {
      id: 2,
      title: "اختبار الكيمياء العضوية",
      status: "منتهي",
      statusColor: "bg-gray-100 text-gray-500",
      avgScore: "72%",
      attendance: "91%",
    }
  ];

  const futureExams = [
    {
      id: 3,
      title: "اختبار اللغة العربية - النحو",
      status: "معلق",
      statusColor: "bg-orange-50 text-orange-500",
      icon: <FileClock size={24} className="text-gray-400" />,
      mainText: "غير محدد",
      subText: "بانتظار اعتماد الإدارة",
    },
    {
      id: 4,
      title: "امتحان الأحياء - الوراثة",
      status: "قادم",
      statusColor: "bg-blue-50 text-blue-500",
      icon: <Calendar size={24} className="text-blue-500" />,
      mainText: "25 أغسطس",
      subText: "10:00 صباحاً",
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">الامتحانات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mb-10">
        
        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الامتحان..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100/80 border-none rounded-full h-12 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all"
            dir="rtl"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-row-reverse flex-wrap justify-end gap-2 w-full md:w-auto bg-white p-2 rounded-full border border-gray-100 shadow-sm">
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

      {/* Active Live Exam */}
      {(activeFilter === "الكل" || activeFilter === "الآن") && "امتحان الفيزياء الشامل - الباب الثالث".includes(searchQuery) && (
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center mb-8 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4 flex-row-reverse justify-center w-full">
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-[#e6f7ec] text-[#059669] flex items-center gap-1.5 shadow-sm">
              بث مباشر الآن
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
            </span>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 shadow-sm">
              الصف الثالث الثانوي
            </span>
          </div>
          
          <h2 className="text-2xl font-extrabold text-[#001c56] mb-8">امتحان الفيزياء الشامل - الباب الثالث</h2>
          
          <div className="w-full bg-[#f8fafc] rounded-[24px] p-6 flex flex-wrap md:flex-nowrap justify-between md:justify-around items-center gap-6 mb-8 border border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1 flex-row-reverse">
                <Activity size={14} />
                <span className="text-[10px] font-bold text-gray-500">نسبة المشاركة</span>
              </div>
              <div className="text-sm font-extrabold text-[#059669]">92% متصلين</div>
            </div>
            
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1 flex-row-reverse">
                <Clock size={14} />
                <span className="text-[10px] font-bold text-gray-500">الوقت المتبقي</span>
              </div>
              <div className="text-sm font-extrabold text-[#001c56]">2:15 دقيقة</div>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-200"></div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1 flex-row-reverse">
                <Users size={14} />
                <span className="text-[10px] font-bold text-gray-500">الطلاب المستهدفين</span>
              </div>
              <div className="text-sm font-extrabold text-[#001c56]">120 سجل</div>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-200"></div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1 flex-row-reverse">
                <FileText size={14} />
                <span className="text-[10px] font-bold text-gray-500">إجمالي الأسئلة</span>
              </div>
              <div className="text-sm font-extrabold text-[#001c56]">30 اختياري</div>
            </div>
          </div>

          <Link href="/e-learning/exams/1" className="px-10 py-3.5 bg-[#059669] hover:bg-green-700 text-white rounded-full font-bold text-sm transition-colors shadow-lg shadow-green-900/20 flex items-center gap-2 flex-row-reverse">
            ابدأ الامتحان الآن
            <CheckCircle2 size={18} className="text-white" />
          </Link>
        </div>
      )}

      {/* Grid for Past and Upcoming Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        
        {/* Past Exams Column */}
        {pastExams.filter(exam => 
          (activeFilter === "الكل" || activeFilter === "المنتهي") && exam.title.includes(searchQuery)
        ).map((exam) => (
          <div key={exam.id} className="bg-white rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-gray-50">
            <div className="flex justify-between items-start mb-8 flex-row-reverse">
              <h3 className="text-lg font-extrabold text-[#001c56] text-right">{exam.title}</h3>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm ${exam.statusColor}`}>
                {exam.status}
              </span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-right flex-row-reverse border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2 flex-row-reverse text-gray-500">
                  <BarChart2 size={16} className="text-gray-400" />
                  <span className="text-xs font-bold">متوسط الدرجات:</span>
                </div>
                <span className="text-base font-extrabold text-[#001c56]">{exam.avgScore}</span>
              </div>
              <div className="flex justify-between items-center text-right flex-row-reverse">
                <div className="flex items-center gap-2 flex-row-reverse text-gray-500">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-xs font-bold">نسبة الحضور:</span>
                </div>
                <span className="text-base font-extrabold text-[#001c56]">{exam.attendance}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedExamForResults(exam);
                setIsResultsModalOpen(true);
              }}
              className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-[#001c56] rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2 flex-row-reverse border border-gray-100"
            >
              عرض نتائج الطلاب والتقييم
              <BarChart2 size={14} />
            </button>
          </div>
        ))}

        {/* Future/Pending Exams Column */}
        {futureExams.filter(exam => {
          if (activeFilter !== "الكل") {
            if (activeFilter === "القادمة" && exam.status !== "قادم") return false;
            if (activeFilter === "المعلقة" && exam.status !== "معلق") return false;
            if (activeFilter === "المنتهي" || activeFilter === "الآن" || activeFilter === "الملغاة") return false;
          }
          return exam.title.includes(searchQuery);
        }).map((exam) => (
          <div key={exam.id} className="bg-white rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-gray-50">
            <div className="flex justify-between items-start mb-8 flex-row-reverse">
              <h3 className="text-lg font-extrabold text-[#001c56] text-right">{exam.title}</h3>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm ${exam.statusColor}`}>
                {exam.status}
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-6 mb-2 bg-[#f8fafc] rounded-[24px] border border-gray-50">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                 {exam.icon}
               </div>
               <h4 className="text-xl font-extrabold text-[#001c56] mb-1">{exam.mainText}</h4>
               <p className="text-[11px] font-bold text-gray-400">{exam.subText}</p>
            </div>

            <button 
              onClick={() => {
                setSelectedExamForEdit(exam);
                setIsEditModalOpen(true);
              }}
              className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-[#001c56] rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2 flex-row-reverse mt-auto border border-gray-100"
            >
              تعديل التفاصيل
              <ClipboardEdit size={14} />
            </button>
          </div>
        ))}

      </div>

      {/* Results Modal */}
      {isResultsModalOpen && selectedExamForResults && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-[700px] h-[90vh] md:h-auto overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 p-6 flex flex-col relative">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-6 flex-row-reverse">
              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-12 h-12 rounded-full bg-[#001c56] text-white flex items-center justify-center shadow-sm shrink-0">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#001c56] mb-1">تحليل وتقييم نتائج {selectedExamForResults.title}</h2>
                  <p className="text-xs font-bold text-gray-500">{selectedExamForResults.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsResultsModalOpen(false)} 
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-500 mb-2 flex-row-reverse">
                  <Users size={14} />
                  <span className="text-[10px] font-bold">إجمالي الطلاب</span>
                </div>
                <span className="text-2xl font-black text-[#001c56]">١٤٥</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-500 mb-2 flex-row-reverse">
                  <Activity size={14} />
                  <span className="text-[10px] font-bold">متوسط الدرجات</span>
                </div>
                <span className="text-2xl font-black text-[#001c56]">٪٨٥</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-500 mb-2 flex-row-reverse">
                  <Award size={14} />
                  <span className="text-[10px] font-bold">أعلى درجة</span>
                </div>
                <span className="text-2xl font-black text-[#001c56]">٨٩</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="flex items-center gap-1.5 text-gray-500 mb-2 flex-row-reverse">
                  <CheckCircle2 size={14} />
                  <span className="text-[10px] font-bold">نسبة النجاح</span>
                </div>
                <span className="text-2xl font-black text-[#001c56]">٪٩٤</span>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white border border-gray-100 rounded-[24px] p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-end gap-2 mb-6 flex-row-reverse text-[#001c56]">
                <BarChart2 size={18} />
                <h3 className="text-base font-extrabold text-right">توزيع مستويات الطلاب</h3>
              </div>
              
              <div className="relative h-48 w-full mt-4 pr-10 pb-6">
                {/* Y-axis */}
                <div className="absolute right-0 top-0 bottom-6 w-8 flex flex-col justify-between items-end text-[9px] font-bold text-gray-400">
                  <span>%50</span>
                  <span>%40</span>
                  <span>%30</span>
                  <span>%20</span>
                  <span>%10</span>
                  <span>%0</span>
                </div>
                
                {/* Lines */}
                <div className="absolute right-10 left-0 top-1.5 bottom-6 flex flex-col justify-between">
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i} className="w-full border-t border-gray-50 h-0"></div>
                  ))}
                </div>

                {/* SVG Curve */}
                <div className="absolute right-10 left-0 top-1.5 bottom-6 overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
                    <path 
                      d="M 600,120 C 500,110 450,110 350,90 C 250,50 200,40 100,20 C 50,15 25,15 0,10" 
                      fill="none" 
                      stroke="url(#gradientCurve)" 
                      strokeWidth="5" 
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradientCurve" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="30%" stopColor="#f97316" />
                        <stop offset="70%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="absolute right-10 left-0 bottom-0 h-6 flex justify-between items-end px-4 text-[9px] font-bold flex-row-reverse text-right">
                  <div className="flex flex-col items-center">
                    <span className="text-red-500">%10</span>
                    <span className="text-gray-500">مقبول</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-500">%15</span>
                    <span className="text-gray-500">جيد</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-yellow-500">%30</span>
                    <span className="text-gray-500">جيد جداً</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-green-500">%45</span>
                    <span className="text-gray-500">ممتاز</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-[#001c56]">
                <List size={18} />
                <h3 className="text-base font-extrabold text-right">تفاصيل الأداء التفصيلية</h3>
              </div>
              
              <table className="w-full text-right text-xs" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-50">
                    <th className="py-3 px-4 w-1/2">القسم / السؤال</th>
                    <th className="py-3 px-4 text-center">نسبة الخطأ</th>
                    <th className="py-3 px-4 text-center">متوسط الوقت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-bold">
                  <tr>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      سؤال الجبر المركب
                    </td>
                    <td className="py-4 px-4 text-center text-red-500">%45</td>
                    <td className="py-4 px-4 text-center text-gray-400">4:30 د</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-800"></span>
                      التفاضل والتكامل
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500">%28</td>
                    <td className="py-4 px-4 text-center text-gray-400">3:15 د</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#001c56]"></span>
                      الهندسة الفراغية
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500">%15</td>
                    <td className="py-4 px-4 text-center text-gray-400">2:45 د</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* Edit Details Slide-over Modal */}
      {isEditModalOpen && selectedExamForEdit && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[500px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 overflow-hidden relative">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-50 shrink-0 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-[#001c56] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Settings size={18} />
                </div>
                <h2 className="text-base font-extrabold text-[#001c56] text-right">إعداد وتعديل تفاصيل الامتحان وإعادة النشر</h2>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Section 1: Basic Info */}
              <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-gray-700">
                  <Info size={16} className="text-gray-400" />
                  <h3 className="text-xs font-extrabold">المعلومات الأساسية</h3>
                </div>
                <div className="space-y-1.5 text-right">
                  <label className="text-[10px] font-bold text-gray-500 mr-2">حقل عنوان ومادة الامتحان</label>
                  <input 
                    type="text" 
                    defaultValue={selectedExamForEdit.title}
                    className="w-full bg-gray-50 border border-gray-50 rounded-full h-11 px-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right" 
                    dir="rtl" 
                  />
                </div>
              </div>

              {/* Section 2: Timeline */}
              <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <h3 className="text-xs font-extrabold">الجدولة الزمنية</h3>
                </div>
                
                <div className="flex gap-4 mb-4 flex-row-reverse">
                  <div className="flex-1 space-y-1.5 text-right">
                    <label className="text-[10px] font-bold text-gray-500 mr-2">تاريخ البدء</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="11/15/2023, 09:00 AM"
                        className="w-full bg-gray-50 border border-gray-50 rounded-full h-11 pl-4 pr-10 text-[11px] font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right" 
                        dir="ltr" 
                      />
                      <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5 text-right">
                    <label className="text-[10px] font-bold text-gray-500 mr-2">تاريخ الانتهاء</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="11/16/2023, 11:59 PM"
                        className="w-full bg-gray-50 border border-gray-50 rounded-full h-11 pl-4 pr-10 text-[11px] font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right" 
                        dir="ltr" 
                      />
                      <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-[10px] font-bold text-gray-500 mr-2">المدة الزمنية (دقائق)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="120"
                      className="w-full bg-gray-50 border border-gray-50 rounded-full h-11 px-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right" 
                      dir="rtl" 
                    />
                    <Timer size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Section 3: Questions & Division */}
              <div className="flex gap-4 flex-row-reverse">
                
                {/* Questions */}
                <div className="flex-1 bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                  <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-gray-700">
                    <List size={16} className="text-gray-400" />
                    <h3 className="text-xs font-extrabold">الأسئلة والدرجات</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-right">
                      <label className="text-[10px] font-bold text-gray-500 mr-2">عدد الأسئلة</label>
                      <input type="text" defaultValue="50" className="w-full bg-gray-50 border border-gray-50 rounded-full h-9 px-4 text-xs font-bold text-gray-700 text-center outline-none focus:ring-2 focus:ring-[#001c56]/20" />
                    </div>
                    <div className="space-y-1.5 text-right">
                      <label className="text-[10px] font-bold text-gray-500 mr-2">إجمالي الدرجات</label>
                      <input type="text" defaultValue="100" className="w-full bg-gray-50 border border-gray-50 rounded-full h-9 px-4 text-xs font-bold text-gray-700 text-center outline-none focus:ring-2 focus:ring-[#001c56]/20" />
                    </div>
                  </div>
                </div>

                {/* Division */}
                <div className="flex-1 bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                  <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-gray-700">
                    <Users size={16} className="text-gray-400" />
                    <h3 className="text-xs font-extrabold">الشعبة</h3>
                  </div>
                  
                  <div className="relative w-full">
                    <button 
                      onClick={() => setIsDivisionDropdownOpen(!isDivisionDropdownOpen)}
                      className="w-full flex items-center justify-between bg-gray-50 rounded-full h-11 px-4 border border-gray-50 flex-row-reverse hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-[10px] font-bold text-gray-500">تخصيص فصل أو شعبة</span>
                    <div className="flex items-center gap-1 flex-row-reverse">
                      <div className="w-1.5 h-1.5 rounded-sm bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-sm bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-sm bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-sm bg-gray-300"></div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDivisionDropdownOpen && (
                    <div className="absolute top-[100%] right-0 mt-2 w-[240px] bg-white border border-gray-100 rounded-[20px] shadow-xl z-20 p-3 animate-in fade-in zoom-in-95">
                      {/* Search */}
                      <div className="relative mb-3">
                        <input 
                          type="text" 
                          placeholder="بحث..." 
                          className="w-full bg-white border border-gray-100 rounded-lg h-9 px-3 text-xs text-right outline-none focus:border-[#001c56]/30 pr-8"
                          dir="rtl"
                        />
                        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      
                      {/* Divider */}
                      <div className="w-full h-px bg-gray-50 mb-2"></div>

                      {/* Options */}
                      <div className="space-y-1 mb-3 max-h-[140px] overflow-y-auto">
                        <label className="flex items-center justify-end gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer flex-row-reverse">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56]" />
                          <span className="text-xs font-bold text-gray-700">الفصل الأول الثانوي</span>
                        </label>
                        <label className="flex items-center justify-end gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer flex-row-reverse">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56]" />
                          <span className="text-xs font-bold text-gray-700">الفصل الأول الأعدادي</span>
                        </label>
                        <label className="flex items-center justify-end gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer flex-row-reverse">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56]" />
                          <span className="text-xs font-bold text-gray-700">الفصل الثالث الثانوي</span>
                        </label>
                        <label className="flex items-center justify-end gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer flex-row-reverse">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56]" />
                          <span className="text-xs font-bold text-gray-700">الفصل الثاني الثانوي</span>
                        </label>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between px-2 pt-2 border-t border-gray-50 flex-row-reverse">
                        <button className="text-xs font-bold text-[#001c56] hover:text-blue-800">تحديد الكل</button>
                        <button className="text-xs font-bold text-gray-500 hover:text-gray-700">مسح</button>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Selected Pills */}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-end gap-3 bg-gray-50 rounded-full px-4 py-2 flex-row-reverse">
                      <div className="w-4 h-4 rounded-full bg-[#001c56] flex items-center justify-center shrink-0">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">فصل 101 - علوم</span>
                    </div>
                    <div className="flex items-center justify-end gap-3 bg-gray-50 rounded-full px-4 py-2 flex-row-reverse">
                      <div className="w-4 h-4 rounded-full bg-[#001c56] flex items-center justify-center shrink-0">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">فصل 102 - علوم</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Section 4: Security */}
              <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                <div className="flex items-center justify-end gap-2 mb-4 flex-row-reverse text-gray-700">
                  <Shield size={16} className="text-gray-400" />
                  <h3 className="text-xs font-extrabold">إعدادات الأمان المتقدمة</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-full px-4 py-2 flex-row-reverse">
                    <span className="text-[11px] font-bold text-gray-700">منع فتح تبويب جديد</span>
                    <div className="w-10 h-5 bg-[#001c56] rounded-full relative shadow-inner">
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-full px-4 py-2 flex-row-reverse">
                    <span className="text-[11px] font-bold text-gray-500">الترتيب العشوائي للأسئلة</span>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-50 flex gap-3 shrink-0 flex-row-reverse">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-[2] py-3.5 bg-[#001c56] text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-2 flex-row-reverse"
              >
                حفظ التعديلات ونشر الامتحان رسمياً
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                إلغاء التعديلات
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
