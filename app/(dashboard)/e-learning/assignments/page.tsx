"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Users, Clock, AlertCircle, AlertTriangle, CheckCircle2, FileText, FlaskConical, Globe, BookOpen, X, GraduationCap, User, PieChart, Bell, Calendar } from "lucide-react";
import EmptySearch from "@/components/ui/EmptySearch";
import Link from "next/link";
import { useSession } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";
import { useHomeworks } from "@/lib/hooks/use-homeworks";

// Status mapping for UI
// 0: مسودة, 1: منشور, 2: مغلق
const HOMEWORK_STATUS_LABELS: Record<number, string> = {
  0: "مسودة",
  1: "نشط",
  2: "منتهي"
};

const HOMEWORK_STATUS_COLORS: Record<number, string> = {
  0: "text-gray-500 bg-gray-50 border-gray-500",
  1: "text-blue-600 bg-blue-50 border-blue-600",
  2: "text-green-600 bg-green-50 border-green-600"
};

const HOMEWORK_PILL_COLORS: Record<number, string> = {
  0: "text-gray-500 bg-gray-50",
  1: "text-blue-600 bg-blue-50",
  2: "text-green-600 bg-green-50"
};

export default function AssignmentsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLateModalOpen, setIsLateModalOpen] = useState(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false);

  // Filters mapping
  const filterToStatusMap: Record<string, number | undefined> = {
    "الكل": undefined,
    "مسودة": 0,
    "نشط": 1,
    "منتهي": 2,
  };

  const filters = ["الكل", "مسودة", "نشط", "منتهي"];

  // 1. Fetch courses to populate dropdown
  const { data: coursesData, isLoading: isLoadingCourses } = useCourses({
    tenantId: tenantId,
    page: 1,
    pageSize: 50,
  });

  const courses = (coursesData as any)?.items || [];

  // Automatically select the first course if none is selected
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses, selectedCourseId]);

  // 2. Fetch homeworks based on selected course
  const { data: homeworksData, isLoading: isLoadingHomeworks } = useHomeworks({
    tenantId: tenantId,
    courseId: selectedCourseId,
    status: filterToStatusMap[activeFilter],
    page: 1,
    pageSize: 50,
  });

  const homeworks = (homeworksData as any)?.items || [];

  // Search filter
  const filteredAssignments = homeworks.filter((assignment: any) => 
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">الواجبات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-white p-3 rounded-full border border-gray-100 shadow-sm flex-row-reverse">
        
        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الواجب..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          
          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
          
          {/* Course Selector Dropdown */}
          <div className="relative w-full md:w-auto shrink-0">
             <select
                value={selectedCourseId || ""}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="appearance-none w-full bg-gray-100 border-none rounded-full h-11 pl-4 pr-10 text-xs font-bold text-gray-700 text-right outline-none focus:ring-2 focus:ring-[#001c56]/20 cursor-pointer"
                dir="rtl"
              >
                {isLoadingCourses ? (
                  <option value="">جاري تحميل الكورسات...</option>
                ) : courses.length === 0 ? (
                  <option value="">لا توجد كورسات</option>
                ) : (
                  courses.map((course: any) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))
                )}
             </select>
             <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

      </div>

      {isLoadingCourses || isLoadingHomeworks ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-10 h-10 border-4 border-[#001c56]/20 border-t-[#001c56] rounded-full animate-spin mb-4"></div>
          <p className="font-bold">جاري تحميل البيانات...</p>
        </div>
      ) : !selectedCourseId ? (
        <EmptySearch message="يرجى اختيار كورس أولاً لعرض واجباته." />
      ) : filteredAssignments.length === 0 ? (
        <EmptySearch message="لم يتم العثور على أي واجبات تطابق بحثك أو الفلتر المختار في هذا الكورس." />
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment: any) => {
            const statusLabel = HOMEWORK_STATUS_LABELS[assignment.status] || "غير معروف";
            const statusColor = HOMEWORK_STATUS_COLORS[assignment.status] || "text-gray-500 bg-gray-50 border-gray-500";
            const pillColor = HOMEWORK_PILL_COLORS[assignment.status] || "text-gray-500 bg-gray-50";
            
            return (
              <div 
                key={assignment.id} 
                className="bg-white rounded-[24px] p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Status Border Right */}
                <div className={`absolute right-0 top-0 bottom-0 w-1.5 ${statusColor.split(' ')[2]}`}></div>
                
                {/* Right Group (Icon + Text) */}
                <div className="flex items-center gap-4 flex-row-reverse flex-1 mr-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                    <FileText size={20} className="text-[#001c56]" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-extrabold text-[#001c56] mb-1.5">{assignment.title}</h3>
                    <p className="text-[10px] font-bold text-gray-400">{courses.find((c:any) => c.id === selectedCourseId)?.title}</p>
                  </div>
                </div>

                {/* Middle Group (Stats & Time) */}
                <div className="flex items-center justify-between gap-8 flex-1 md:flex-row-reverse">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-500" dir="rtl">- طالب</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <Clock size={14} className="text-gray-400" />
                    <span className={`text-[11px] font-bold text-gray-500`} dir="rtl">
                      {assignment.dueAtUtc ? new Date(assignment.dueAtUtc).toLocaleDateString('ar-EG') : 'بدون موعد نهائي'}
                    </span>
                  </div>
                </div>

                {/* Left Group (Pill & Button) */}
                <div className="flex items-center justify-end gap-6 w-full md:w-auto">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm ${pillColor}`}>
                    {statusLabel}
                  </span>
                  <button 
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      if (assignment.status === 2) {
                        setIsFinishedModalOpen(true);
                      } else {
                        setIsDetailsModalOpen(true);
                      }
                    }}
                    className="px-6 py-2.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-[11px] transition-colors shadow-md min-w-[120px]"
                  >
                    عرض التفاصيل
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Assignment Details Modal (Placeholder function) */}
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
                <h2 className="text-lg md:text-xl font-extrabold text-[#001c56]">تفاصيل الواجب</h2>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-10">
               <AlertCircle size={48} className="text-gray-300 mb-4" />
               <p className="text-sm font-bold text-gray-500 text-center">تفاصيل الواجب وبيانات الطلاب لم تُربط بعد مع ה-API لعدم توفرها حالياً.</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setIsDetailsModalOpen(false)} 
                className="px-6 py-3 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-md shadow-blue-900/20 flex items-center gap-2 flex-row-reverse"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Finished Assignment Modal (Placeholder function) */}
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

            <div className="flex flex-col items-center justify-center py-10">
               <AlertCircle size={48} className="text-gray-300 mb-4" />
               <p className="text-sm font-bold text-gray-500 text-center">أرشيف وتسليمات الطلاب غير متاحة حالياً بسبب نقص مسارات ה-API الخاصة بها.</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-start">
              <button 
                onClick={() => setIsFinishedModalOpen(false)} 
                className="px-6 py-3 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-md shadow-blue-900/20 flex items-center gap-2 flex-row-reverse"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
