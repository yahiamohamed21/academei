"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, PlayCircle, Users, Clock, FileText, CheckCircle2, Activity, Calendar, FileClock, ClipboardEdit, BarChart2, X, Award, Target, List, Settings, Timer, Shield, Info, ChevronDown } from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";
import { useExams } from "@/lib/hooks/use-exams";
import EmptySearch from "@/components/ui/EmptySearch";

// Status mapping
// 0: مسودة, 1: منشور (قادم/الآن), 2: مغلق/منتهي
const EXAM_STATUS_LABELS: Record<number, string> = {
  0: "مسودة",
  1: "نشط",
  2: "منتهي"
};

const EXAM_STATUS_COLORS: Record<number, string> = {
  0: "bg-gray-100 text-gray-500",
  1: "bg-blue-50 text-blue-500",
  2: "bg-green-50 text-green-600"
};

export default function ExamsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedExamForResults, setSelectedExamForResults] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExamForEdit, setSelectedExamForEdit] = useState<any>(null);

  // Status mappings for filter
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

  // 2. Fetch exams based on selected course
  const { data: examsData, isLoading: isLoadingExams } = useExams({
    tenantId: tenantId,
    courseId: selectedCourseId,
    status: filterToStatusMap[activeFilter],
    page: 1,
    pageSize: 50,
  });

  const exams = (examsData as any)?.items || [];

  // Search filter
  const filteredExams = exams.filter((exam: any) => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">الامتحانات</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 flex-row-reverse bg-white p-3 rounded-full border border-gray-100 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <input 
            type="text" 
            placeholder="ابحث باسم الامتحان..." 
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

      {isLoadingCourses || isLoadingExams ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-10 h-10 border-4 border-[#001c56]/20 border-t-[#001c56] rounded-full animate-spin mb-4"></div>
          <p className="font-bold">جاري تحميل البيانات...</p>
        </div>
      ) : !selectedCourseId ? (
        <EmptySearch message="يرجى اختيار كورس أولاً لعرض امتحاناته." />
      ) : filteredExams.length === 0 ? (
        <EmptySearch message="لم يتم العثور على أي امتحانات تطابق بحثك أو الفلتر المختار في هذا الكورس." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredExams.map((exam: any) => {
            const statusLabel = EXAM_STATUS_LABELS[exam.status] || "غير معروف";
            const statusColor = EXAM_STATUS_COLORS[exam.status] || "bg-gray-100 text-gray-500";
            
            return (
              <div key={exam.id} className="bg-white rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                <div className="flex justify-between items-start mb-8 flex-row-reverse">
                  <h3 className="text-lg font-extrabold text-[#001c56] text-right line-clamp-2">{exam.title}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm shrink-0 ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
                
                <div className="flex flex-col items-center justify-center py-6 mb-6 bg-[#f8fafc] rounded-[24px] border border-gray-50">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                     <FileClock size={24} className="text-[#001c56]" />
                   </div>
                   <h4 className="text-sm font-extrabold text-[#001c56] mb-1 text-center" dir="rtl">{exam.durationMinutes ? `${exam.durationMinutes} دقيقة` : 'غير محدد المدة'}</h4>
                   <p className="text-[10px] font-bold text-gray-400 text-center" dir="rtl">
                     متاح: {exam.availableFromUtc ? new Date(exam.availableFromUtc).toLocaleDateString('ar-EG') : 'الآن'}
                   </p>
                </div>

                <div className="flex gap-2 flex-row-reverse">
                  {exam.status === 2 ? (
                    <button 
                      onClick={() => {
                        setSelectedExamForResults(exam);
                        setIsResultsModalOpen(true);
                      }}
                      className="w-full py-3 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2 flex-row-reverse shadow-md"
                    >
                      نتائج الطلاب
                      <BarChart2 size={14} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setSelectedExamForEdit(exam);
                        setIsEditModalOpen(true);
                      }}
                      className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#001c56] rounded-full text-xs font-bold transition-colors flex justify-center items-center gap-2 flex-row-reverse border border-gray-100"
                    >
                      تعديل 
                      <ClipboardEdit size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Modal (Placeholder functionality) */}
      {isResultsModalOpen && selectedExamForResults && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-[700px] h-[90vh] md:h-auto overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 p-6 flex flex-col relative">
            <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-6 flex-row-reverse">
              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-12 h-12 rounded-full bg-[#001c56] text-white flex items-center justify-center shadow-sm shrink-0">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#001c56] mb-1">تحليل نتائج {selectedExamForResults.title}</h2>
                  <p className="text-xs font-bold text-gray-500">لا توجد داتا حقيقية للنتائج بعد في API</p>
                </div>
              </div>
              <button 
                onClick={() => setIsResultsModalOpen(false)} 
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10">
               <Activity size={48} className="text-gray-300 mb-4" />
               <p className="text-sm font-bold text-gray-500 text-center">البيانات الإحصائية لم يتم ربطها بعد لأن الـ API الخاص بها غير متاح حالياً.</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Details Modal (Placeholder) */}
      {isEditModalOpen && selectedExamForEdit && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[500px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 overflow-hidden relative">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-50 shrink-0 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-[#001c56] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Settings size={18} />
                </div>
                <h2 className="text-base font-extrabold text-[#001c56] text-right">تعديل الامتحان</h2>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                 <div className="space-y-1.5 text-right">
                   <label className="text-[10px] font-bold text-gray-500 mr-2">عنوان الامتحان</label>
                   <input 
                     type="text" 
                     defaultValue={selectedExamForEdit.title}
                     className="w-full bg-gray-50 border border-gray-50 rounded-full h-11 px-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right" 
                     dir="rtl" 
                   />
                 </div>
               </div>
               <p className="text-xs text-gray-500 text-center mt-10 font-bold">باقي الحقول سيتم ربطها بـ الـ API الخاص بالتعديل (PATCH)</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
