"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  BookOpen,
  MessageSquare,
  Wallet,
  FileText,
  User,
  MonitorPlay,
  ClipboardList,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck,
  FlaskConical,
  FileText as FileTextIcon
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useSession } from "@/lib/hooks/use-auth";
import { useStudents } from "@/lib/hooks/use-students";
import { useGroups } from "@/lib/hooks/use-groups";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useTeachers } from "@/lib/hooks/use-teachers";
import { useCourses } from "@/lib/hooks/use-courses";
import { useExams } from "@/lib/hooks/use-exams";
import { useHomeworks } from "@/lib/hooks/use-homeworks";

function DashboardContent() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: studentsData = [] } = useStudents({ tenantId });
  const { data: groupsData } = useGroups({ tenantId });
  const { data: teachersPage } = useTeachers({ tenantId, page: 1, pageSize: 10 });
  const { data: coursesPage } = useCourses({ tenantId, page: 1, pageSize: 20 });
  const { data: homeworksPage } = useHomeworks({ tenantId, courseId: undefined, page: 1, pageSize: 20 });
  const { data: examsPage } = useExams({ tenantId, courseId: undefined, page: 1, pageSize: 20 });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const { data: todaySessions = [] } = useSessions({
    tenantId,
    from: today.toISOString(),
    to: endOfDay.toISOString(),
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    const q = query.toLowerCase();
    const filteredResults = studentsData.filter((s: any) =>
      (s.fullName || '').toLowerCase().includes(q) ||
      (s.studentCode || '').toLowerCase().includes(q)
    );

    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#1A2E44] mb-2">نتائج البحث</h2>
          <p className="text-gray-500 font-medium">
            تم العثور على {filteredResults.length} نتيجة لـ <span className="font-bold text-[var(--primary)]">'{query}'</span>
          </p>
        </div>

        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((student: any) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl p-5 shadow-sm border-r-4 border-r-blue-500 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    {student.photoUrl ? (
                      <Image src={student.photoUrl} fill alt={student.fullName} className="object-cover" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{student.fullName}</h3>
                    <p className="text-xs text-gray-400 mb-2">كود: {student.studentCode || student.code || student.id}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      <GraduationCap size={16} /> {student.gradeLevelName || "طالب"}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-blue-50 text-blue-600">
                  <GraduationCap size={14} /> طالب
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500 font-bold">لم يتم العثور على نتائج تطابق بحثك.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const recentStudents = studentsData.slice(0, 3);
  const groupsList = groupsData?.items?.slice(0, 3) || [];
  const teachersList = teachersPage?.items?.slice(0, 2) || [];
  const activeHomeworksCount = homeworksPage?.items?.length || 0;
  const activeExamsCount = examsPage?.items?.length || 0;
  const activeCoursesCount = coursesPage?.items?.length || 0;
  const totalRevenue = studentsData.length * 250;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">

      {/* Welcome Banner */}
      <div className="relative w-full h-[440px] rounded-[32px] overflow-hidden shadow-sm bg-gray-100">
        <Image
          src="/dashboard_teacher.jpg"
          alt="Welcome"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* The White Overlay Container */}
        <div className="absolute bottom-6 left-6 right-6 h-[180px] rounded-[32px] overflow-hidden z-10 shadow-[0_0_30px_rgba(255,255,255,0.6)] bg-white/75 backdrop-blur-sm">

          {/* Top Left White Swoop (Opaque) */}
          <div className="absolute -top-[140px] -left-[60px] w-[320px] h-[320px] bg-white rounded-full"></div>

          {/* Bottom Right Circular Bump (Opaque) */}
          <div className="absolute -right-[60px] -bottom-[120px] w-[280px] h-[280px] bg-white rounded-full"></div>

          {/* Content layer */}
          <div className="absolute inset-0 flex flex-row-reverse justify-between items-center z-20 px-8">

            {/* Right Stat (حصص اليوم) */}
            <div className="flex flex-col items-center justify-center w-[180px] h-full pt-6 pr-4">
              <p className="text-slate-600 font-bold mb-2 text-[13px]">حصص اليوم</p>
              <p className="text-2xl font-black text-[#001c56] flex items-center justify-center gap-2">
                <BookOpen size={20} className="text-[#001c56]" /> {todaySessions.length}
              </p>
            </div>

            {/* Center Welcome */}
            <div className="flex-1 flex flex-col items-center justify-center h-full pt-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#001c56] mb-3 tracking-tight" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)' }}>
                مرحباً بك مجدداً {session?.email ? session.email.split('@')[0] : 'أستاذ'}
              </h2>
              <p className="text-[#001c56] text-sm md:text-base font-semibold mb-6" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)' }}>
                إليك نظرة عامة على نشاط المركز اليوم
              </p>

              <div className="flex items-center gap-6">
                <p className="text-[#001c56] font-bold text-sm" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)' }}>إجمالي الطلاب</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-[10px] mt-0.5">▲</span>
                  <p className="text-2xl font-black text-[#001c56] flex items-center gap-1.5" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.95), 0 0 5px rgba(255,255,255,0.95)' }}>
                    {studentsData.length} <Users size={20} className="text-[#001c56]" />
                  </p>
                </div>
              </div>
            </div>

            {/* Left Stat (المجموعات النشطة) */}
            <div className="flex flex-col items-center justify-center w-[180px] h-full pt-4 pl-4">
              <p className="text-slate-600 font-bold mb-2 text-[13px]">المجموعات النشطة</p>
              <p className="text-2xl font-black text-[#001c56] flex items-center justify-center gap-2">
                {groupsData?.totalCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Right Column (Wider) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">

          {/* Students Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <Users size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">قسم الطلاب</h3>
              </div>
              <Link href="/students" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              {recentStudents.length > 0 ? (
                recentStudents.map((student: any) => (
                  <div key={student.id} className="bg-white rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                      {student.photoUrl ? (
                        <Image src={student.photoUrl} fill alt={student.fullName || "Student"} className="object-cover" />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-gray-900">{student.fullName || `${student.firstName || ''} ${student.lastName || ''}`}</h4>
                        <span className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">{student.status === 1 ? 'نشط' : 'مسجل'}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{student.gradeLevelName || "طالب"}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">كود: {student.studentCode || student.id?.substring(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-6 text-center text-gray-400 font-medium text-sm">
                  لا يوجد طلاب مسجلون حالياً
                </div>
              )}
            </div>
          </section>

          {/* Groups & Sessions Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <CalendarDays size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">المجموعات والحصص</h3>
              </div>
              <Link href="/groups" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              {groupsList.length > 0 ? (
                groupsList.map((group: any) => (
                  <div key={group.id} className="bg-white border-r-4 border-r-[#1A2E44] rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{group.name}</h4>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">{group.gradeLevelName || "نشطة"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500 font-medium">
                      <div className="flex items-center gap-2"><User size={16} /> المادة: {group.subjectName || "عامة"}</div>
                      <div className="flex items-center gap-2"><Users size={16} /> الفرع: {group.branchName || "الرئيسي"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-6 text-center text-gray-400 font-medium text-sm">
                  لا توجد مجموعات حالياً
                </div>
              )}
            </div>
          </section>

          {/* E-Learning Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <MonitorPlay size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">التعليم الإلكتروني</h3>
              </div>
              <Link href="/e-learning" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 rounded-full border-[3px] border-blue-600 flex items-center justify-center font-bold text-blue-600 text-sm">
                  {activeCoursesCount}
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">المقررات والواجبات</h4>
                  <p className="text-xs text-gray-500 mt-1">{activeHomeworksCount} واجب نشط • {activeExamsCount} اختبار حديث</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <ClipboardList size={20} />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                  {activeExamsCount}
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">إحصائيات الاختبارات</h4>
                  <p className="text-xs text-gray-500 mt-1">{activeExamsCount > 0 ? 'اختبارات متاحة للطلاب' : 'لا توجد اختبارات حالياً'}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <BarChart3 size={20} />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Left Column (Narrower) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-8">

          {/* Sessions Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <CalendarDays size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">قسم الجلسات</h3>
              </div>
              <Link href="/sessions" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              {todaySessions.length > 0 ? (
                todaySessions.slice(0, 3).map((sessionItem: any) => (
                  <div key={sessionItem.id} className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${sessionItem.status === 2 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                      {sessionItem.status === 2 ? 'منفذة' : 'مجدولة'}
                    </span>
                    <div className="flex-1 mr-4 text-right">
                      <h4 className="font-bold text-gray-900 text-sm">{sessionItem.groupName || sessionItem.subjectName || "جلسة دراسية"}</h4>
                      <p className="text-xs text-gray-500 mt-1">{sessionItem.teacherName ? `أ. ${sessionItem.teacherName}` : 'جلسة اليوم'}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <MonitorPlay size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-6 text-center text-gray-400 font-medium text-xs">
                  لا توجد جلسات مجدولة اليوم
                </div>
              )}
            </div>
          </section>

          {/* Finance Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <Wallet size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">المالية</h3>
              </div>
              <Link href="/finance" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 rounded-full border-[3px] border-[#1A2E44] flex items-center justify-center font-bold text-[#1A2E44] text-xs">
                  {studentsData.length}
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">إجمالي الإيرادات المقدرة</h4>
                  <p className="text-xs text-gray-500 mt-1">{totalRevenue.toLocaleString()} ج.م • {studentsData.length} طالب</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Wallet size={20} />
                </div>
              </div>
            </div>
          </section>

          {/* Teaching Team Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <GraduationCap size={24} className="text-[#1A2E44]" />
                <h3 className="text-xl font-bold">فريق التدريس</h3>
              </div>
              <Link href="/team" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            {teachersList.length > 0 ? (
              teachersList.map((teacher: any) => (
                <div key={teacher.id} className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">معلم</span>
                  <div className="flex-1 mr-4 text-right">
                    <h4 className="font-bold text-gray-900 text-sm">{teacher.fullName}</h4>
                    <p className="text-xs text-gray-500 mt-1">{teacher.phoneNumber || "مدرس معتمد"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative bg-gray-100 flex items-center justify-center">
                    {teacher.photoUrl ? (
                      <Image src={teacher.photoUrl} fill alt={teacher.fullName} className="object-cover" />
                    ) : (
                      <User size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-6 text-center text-gray-400 font-medium text-xs">
                لا يوجد مدرسون حالياً
              </div>
            )}
          </section>

          {/* Financial Alerts */}
          <section className="bg-orange-50/50 rounded-[32px] p-6 border border-orange-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle size={24} />
                <h3 className="text-xl font-bold text-gray-900">التنبيهات المالية</h3>
              </div>
              <Link href="/finance" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-3 bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-bold text-gray-700 text-sm">رصيد آجل مستحق</span>
                <span className="font-black text-gray-900 text-lg">0 <span className="text-xs font-normal">ج.م</span></span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-700 text-sm">فروق خزينة اليوم</span>
                <span className="font-black text-gray-900 text-lg">0 <span className="text-xs font-normal">ج.م</span></span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
