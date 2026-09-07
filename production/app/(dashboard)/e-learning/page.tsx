"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  PlayCircle, Clock, CheckCircle2, ChevronLeft, 
  FileText, Video, BookOpen, AlertCircle, Info,
  MonitorPlay, GraduationCap, FileSignature, FileKey, CheckSquare, 
  Users, X, Scale
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useCourses } from "@/lib/hooks/use-courses";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useHomeworks } from "@/lib/hooks/use-homeworks";
import { useExams } from "@/lib/hooks/use-exams";

export default function ELearningDashboard() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: coursesData } = useCourses({ tenantId, page: 1, pageSize: 50 });
  const coursesList = coursesData?.items || [];

  const firstCourseId = coursesList.length > 0 ? coursesList[0].id : undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const { data: sessionsList = [] } = useSessions({ tenantId, from: today.toISOString(), to: nextMonth.toISOString() });
  const { data: homeworksData } = useHomeworks({ tenantId, courseId: firstCourseId, page: 1, pageSize: 50 });
  const { data: examsData } = useExams({ tenantId, courseId: firstCourseId, page: 1, pageSize: 50 });

  const homeworksList = homeworksData?.items || [];
  const examsList = examsData?.items || [];

  const stats = [
    { label: "الكورسات النشطة", value: coursesData?.totalCount || coursesList.length, subtext: "مسجلة للنظام", icon: <MonitorPlay size={20} className="text-blue-500" /> },
    { label: "الجلسات والمحاضرات", value: sessionsList.length, subtext: "هذا الشهر", icon: <BookOpen size={20} className="text-blue-500" /> },
    { label: "الواجبات", value: homeworksData?.totalCount || homeworksList.length, subtext: "نشطة", icon: <FileSignature size={20} className="text-amber-600" /> },
    { label: "الامتحانات", value: examsData?.totalCount || examsList.length, subtext: "متاحة", icon: <FileKey size={20} className="text-red-500" /> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 space-y-6 xl:space-y-8">
      
      {/* Hero Section */}
      <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center border border-gray-100 shadow-sm relative min-h-[260px]">
        <div className="p-8 md:p-12 md:pr-16 w-full md:w-1/2 flex flex-col justify-center text-center md:text-right z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#001c56] mb-4 leading-tight">
            منصة التعليم الإلكتروني
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base mb-6 max-w-md ml-auto">
            متابعة الكورسات الأكاديمية، المحاضرات المباشرة، الواجبات والاختبارات الرقمية.
          </p>
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <Link href="/e-learning/courses">
              <button className="px-8 py-3.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-sm transition-colors shadow-lg shadow-blue-900/20">
                عرض كل الكورسات
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden flex items-center justify-center p-8">
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-[8px] border-white shadow-2xl overflow-hidden z-20 shrink-0">
            <Image 
              src="/e-learning.jpg"
              alt="E-Learning"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <div className="text-xs text-gray-500 font-bold mb-1">{stat.label}</div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400 font-bold">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Courses List */}
        <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <Link href="/e-learning/courses" className="text-xs font-bold text-[#001c56] hover:underline flex items-center gap-1">
              <ChevronLeft size={14} /> عرض الكل
            </Link>
            <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
              الكورسات المتاحة <MonitorPlay size={20} className="text-[#001c56]" />
            </h2>
          </div>
          
          <div className="space-y-4">
            {coursesList.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold">لا توجد كورسات مسجلة حالياً</div>
            ) : (
              coursesList.slice(0, 5).map((course: any) => (
                <div key={course.id} className="bg-[#f8fafc] rounded-3xl p-5 border border-gray-50 flex items-center justify-between">
                  <div className="text-right flex-1">
                    <h3 className="font-extrabold text-[#001c56] text-base mb-1">{course.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{course.description || "كورس أكاديمي"}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                    نشط
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sessions & Lectures List */}
        <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <Link href="/e-learning/lectures" className="text-xs font-bold text-[#001c56] hover:underline flex items-center gap-1">
              <ChevronLeft size={14} /> عرض الجلسات
            </Link>
            <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
              المحاضرات والجلسات القادمة <BookOpen size={20} className="text-[#001c56]" />
            </h2>
          </div>
          
          <div className="space-y-4">
            {sessionsList.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold">لا توجد محاضرات مجدولة حالياً</div>
            ) : (
              sessionsList.slice(0, 5).map((session: any) => (
                <div key={session.id} className="bg-[#f8fafc] rounded-3xl p-5 border border-gray-50 flex items-center justify-between">
                  <div className="text-right flex-1">
                    <h3 className="font-extrabold text-[#001c56] text-base mb-1">{session.groupName || "جلسة تعليمية"}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      المادة: {session.subjectName || "عام"} | المحاضر: {session.teacherFullName || "غير محدد"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 font-bold">
                    {new Date(session.scheduledStartUtc).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
