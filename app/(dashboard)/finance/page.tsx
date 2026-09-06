"use client";

import React from "react";
import { 
  TrendingUp, 
  Wallet, 
  Users,
  BookOpen,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useStudents } from "@/lib/hooks/use-students";
import { useGroups } from "@/lib/hooks/use-groups";
import { useSessions } from "@/lib/hooks/use-sessions";

export default function FinancePage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: studentsData = [], isLoading: isLoadingStudents } = useStudents({ tenantId });
  const { data: groupsData, isLoading: isLoadingGroups } = useGroups({ tenantId });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const { data: todaySessions = [] } = useSessions({
    tenantId,
    from: today.toISOString(),
    to: endOfDay.toISOString(),
  });

  const activeStudents = studentsData.filter((s: any) => s.status === 1);
  const inactiveStudents = studentsData.filter((s: any) => s.status !== 1);
  const groupsList = groupsData?.items || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#001c56] mb-2">الإدارة المالية واشتراكات الطلاب</h1>
          <p className="text-gray-500">متابعة الاشتراكات الفعالة، المجموعات والمستحقات المباشرة بناءً على السجلات الأكاديمية.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Active Students */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">الطلاب النشطون</h3>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {activeStudents.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              حسابات نشطة ومسددة للاشتراك
            </div>
          </div>
        </div>

        {/* Card 2: Inactive / Suspended */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-red-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">مستحقات معلقة</h3>
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <Wallet size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-red-600 mb-1">
              {inactiveStudents.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              طلاب بانتظار سداد المصروفات/موقوفون
            </div>
          </div>
        </div>

        {/* Card 3: Total Active Groups */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">المجموعات الأكاديمية</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <BookOpen size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {groupsList.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              مجموعات دراسية مسجلة
            </div>
          </div>
        </div>

        {/* Card 4: Today's Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">جلسات اليوم</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {todaySessions.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              حصص مجدولة لهذا اليوم
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Groups Summary Table */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              سجل سعة المجموعات
            </h2>
          </div>

          {isLoadingGroups ? (
            <div className="text-center py-12 text-gray-500 font-medium">جاري التحميل...</div>
          ) : groupsList.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">لا توجد مجموعات دراسية</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                    <th className="pb-4 pr-4">المجموعة</th>
                    <th className="pb-4">عدد الطلاب</th>
                    <th className="pb-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {groupsList.map((g: any) => (
                    <tr key={g.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 font-bold text-[#001c56] text-sm">{g.name}</td>
                      <td className="py-4 text-gray-700 font-medium text-sm">
                        {g.activeStudentCount || 0} / {g.capacity || 'غير محدد'}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          g.status === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {g.status === 1 ? 'نشطة' : 'غير نشطة'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Student Records Summary */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              سجل حالة اشتراكات الطلاب
            </h2>
          </div>

          {isLoadingStudents ? (
            <div className="text-center py-12 text-gray-500 font-medium">جاري التحميل...</div>
          ) : studentsData.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">لا يوجد طلاب مسجلون حتى الآن</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                    <th className="pb-4 pr-4">الطالب</th>
                    <th className="pb-4">الكود</th>
                    <th className="pb-4 text-center">حالة الحساب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {studentsData.slice(0, 8).map((s: any) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 font-bold text-[#001c56] text-sm">{s.fullName}</td>
                      <td className="py-4 text-gray-500 text-xs">{s.studentCode || s.id}</td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          s.status === 1 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {s.status === 1 ? 'نشط ومسدد' : 'موقوف / معلق'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
