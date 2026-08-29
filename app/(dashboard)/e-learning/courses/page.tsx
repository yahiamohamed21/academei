"use client";

import React, { useState } from "react";
import { Search, Users, Sigma, FlaskConical, Beaker, X, BookOpen, User, Activity, TrendingUp } from "lucide-react";

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const filters = ["الكل", "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء", "اللغات"];

  const courses = [
    {
      id: 1,
      title: "الرياضيات المتقدمة - التفاضل",
      teacher: "أ. كريم مصطفى",
      grade: "الصف الثالث",
      students: 124,
      progress: 68,
      category: "الرياضيات",
      icon: <Sigma size={24} className="text-blue-600" />,
      iconBg: "bg-blue-100",
      progressColor: "bg-[#001c56]",
    },
    {
      id: 2,
      title: "فيزياء الكم الأساسية",
      teacher: "د. ليلى عبد الرحمن",
      grade: "الصف الثاني",
      students: 89,
      progress: 42,
      category: "الفيزياء",
      icon: <FlaskConical size={24} className="text-orange-800" />,
      iconBg: "bg-orange-100",
      progressColor: "bg-[#541f1f]",
    },
    {
      id: 3,
      title: "مقدمة في الكيمياء العضوية",
      teacher: "أ. حسن علي",
      grade: "الصف الأول",
      students: 210,
      progress: 10,
      category: "الكيمياء",
      icon: <Beaker size={24} className="text-indigo-800" />,
      iconBg: "bg-indigo-100",
      progressColor: "bg-[#001c56]",
    }
  ];

  const filteredCourses = courses.filter(c => activeFilter === "الكل" || c.category === activeFilter);

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">الكورسات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mb-10">
        
        {/* Search */}
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الكورس..." 
            className="w-full bg-gray-100/80 border-none rounded-full h-12 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all"
            dir="rtl"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-row-reverse flex-wrap justify-end gap-2 w-full md:w-auto p-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                  : "bg-[#f8fafc] text-gray-500 hover:bg-white hover:shadow-sm hover:border-gray-100 border border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] flex flex-col justify-between hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all">
            <div className="flex justify-between items-start mb-8">
              <span className="bg-[#f8fafc] px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-500 shadow-sm border border-gray-50">
                {course.grade}
              </span>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${course.iconBg}`}>
                {course.icon}
              </div>
            </div>
            
            <div className="text-right mb-8">
              <h3 className="text-lg font-extrabold text-[#001c56] mb-2">{course.title}</h3>
              <p className="text-[11px] text-gray-500 font-bold mb-4">{course.teacher}</p>
              <div className="text-[10px] font-bold text-gray-500 flex items-center justify-end gap-1.5">
                <Users size={14} className="text-gray-400" /> {course.students} طالب
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold mb-2">
                  <span className="text-[#001c56]">{course.progress}%</span>
                  <span className="text-gray-400">التقدم الإجمالي</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 flex justify-end">
                  <div className={`${course.progressColor} h-1.5 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedCourse(course);
                  setIsCourseModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#f8fafc] hover:bg-gray-100 text-[#001c56] rounded-full text-xs font-bold transition-colors"
              >
                متابعة
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {isCourseModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <button onClick={() => setIsCourseModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-1">
                <X size={18} className="text-gray-500" />
              </button>
              
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="w-14 h-14 rounded-full bg-[#001c56] text-white flex items-center justify-center shrink-0 shadow-md">
                  <User size={24} />
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-extrabold text-[#001c56] mb-1">تفاصيل ومتابعة كورس {selectedCourse.category}</h2>
                  <p className="text-[10px] font-bold text-gray-400">نظرة عامة على أداء الدورة التدريبية</p>
                </div>
              </div>
            </div>
            
            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {/* Top Right: Subject */}
              <div className="bg-[#f8fafc] rounded-full px-6 py-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-gray-500 flex-row-reverse">
                  <BookOpen size={12} />
                  <span className="text-[10px] font-bold">المادة</span>
                </div>
                <span className="text-xs font-extrabold text-[#001c56]">{selectedCourse.title}</span>
              </div>

              {/* Top Left: Teacher */}
              <div className="bg-[#f8fafc] rounded-full px-6 py-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-gray-500 flex-row-reverse">
                  <User size={12} />
                  <span className="text-[10px] font-bold">المدرس</span>
                </div>
                <span className="text-xs font-extrabold text-[#001c56]">{selectedCourse.teacher}</span>
              </div>

              {/* Bottom Right: Total Students */}
              <div className="bg-[#f8fafc] rounded-full px-6 py-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-gray-500 flex-row-reverse">
                  <Users size={12} />
                  <span className="text-[10px] font-bold">إجمالي الطلاب</span>
                </div>
                <span className="text-sm font-extrabold text-[#001c56]">{selectedCourse.students} طالب</span>
              </div>

              {/* Bottom Left: Active Students */}
              <div className="bg-[#f8fafc] rounded-full px-6 py-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-gray-500 flex-row-reverse">
                  <TrendingUp size={12} />
                  <span className="text-[10px] font-bold">الطلاب المتفاعلين</span>
                </div>
                <span className="text-sm font-extrabold text-[#001c56]">{Math.floor(selectedCourse.students * 0.6)} طالب</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="border border-gray-100 rounded-[24px] p-6 relative">
              <h4 className="text-[11px] font-extrabold text-[#001c56] text-right mb-6">تقدم الطلاب المشاركين مقارنة بالعدد الكلي</h4>
              
              <div className="relative h-48 w-full">
                {/* Y-axis Labels */}
                <div className="absolute right-0 top-0 bottom-6 w-8 flex flex-col justify-between items-end text-[9px] font-bold text-gray-300">
                  <span>50</span>
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                </div>
                
                {/* Grid Lines */}
                <div className="absolute right-10 left-0 top-1.5 bottom-6 flex flex-col justify-between">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="w-full border-t border-dashed border-gray-100 h-0"></div>
                  ))}
                </div>

                {/* SVG Chart */}
                <div className="absolute right-10 left-4 top-1.5 bottom-6">
                  <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none" className="overflow-visible">
                    {/* Define Gradient */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#001c56" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#001c56" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* The Path (Right to left for RTL logic: Sat on right, Fri on left) */}
                    {/* Points approx (X, Y) where X=300 is right (Saturday), X=0 is left (Friday).
                        Let's space them 50 units apart: 300, 250, 200, 150, 100, 50, 0
                        Y: smaller is higher up. */}
                    <path 
                      d="M 300,20 C 275,20 275,130 250,130 C 225,130 225,60 200,60 C 175,60 175,140 150,140 C 125,140 125,100 100,100 C 75,100 75,145 50,145 C 25,145 25,130 0,130" 
                      fill="none" 
                      stroke="#001c56" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* The Dots */}
                    <circle cx="300" cy="20" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="250" cy="130" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="200" cy="60" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="150" cy="140" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="100" cy="100" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="50" cy="145" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                    <circle cx="0" cy="130" r="4" fill="white" stroke="#001c56" strokeWidth="2.5" />
                  </svg>
                </div>
                
                {/* X-axis Labels (RTL order) */}
                <div className="absolute right-8 left-2 bottom-0 h-6 flex justify-between items-end text-[8px] font-bold text-gray-400 flex-row-reverse">
                  <span>السبت</span>
                  <span>الأحد</span>
                  <span>الإثنين</span>
                  <span>الثلاثاء</span>
                  <span>الأربعاء</span>
                  <span>الخميس</span>
                  <span>الجمعة</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 flex-row-reverse">
                <span className="w-2 h-2 rounded-full bg-[#001c56]"></span>
                <span className="text-[10px] font-bold text-[#001c56]">النشاط الحالي</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
