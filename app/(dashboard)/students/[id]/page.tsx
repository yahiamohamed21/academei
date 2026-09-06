"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Edit2, 
  History, 
  Star, 
  UserCheck, 
  CreditCard, 
  GraduationCap, 
  XCircle,
  LayoutDashboard,
  Users,
  TriangleAlert,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useStudent, useSuspendStudentAdministrative, useSuspendStudentNonPayment, useReactivateStudent } from "@/lib/hooks/use-student";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;
  
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState<"administrative" | "non-payment">("administrative");
  
  const { data: student, isLoading, isError } = useStudent({ tenantId, studentId: params.id });
  const { data: branches = [] } = useBranches(tenantId);
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);

  const suspendAdminMutation = useSuspendStudentAdministrative();
  const suspendNonPaymentMutation = useSuspendStudentNonPayment();
  const reactivateMutation = useReactivateStudent();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold">حدث خطأ أثناء جلب بيانات الطالب</h2>
      </div>
    );
  }

  const branchName = branches.find(b => b.id === student.branchId)?.name || "غير محدد";
  const gradeLevelName = gradeLevels.find(g => g.id === student.gradeLevelId)?.name || "غير محدد";

  // Map integer status to text & color
  let statusText = "غير معروف";
  let statusColor = "bg-gray-100 text-gray-600 border-gray-200";
  let statusIndicator = "bg-gray-500";
  
  if (student.status === 1) { // Assuming 1 is Active
    statusText = "نشط";
    statusColor = "bg-blue-50 text-blue-700 border-blue-100";
    statusIndicator = "bg-green-500";
  } else if (student.status === 2 || student.status === 3) { // Assuming 2/3 are suspended
    statusText = "موقوف";
    statusColor = "bg-red-50 text-red-700 border-red-100";
    statusIndicator = "bg-red-500";
  } else if (student.status === 4) { // Assuming 4 is Graduated
    statusText = "خريج";
    statusColor = "bg-purple-50 text-purple-700 border-purple-100";
    statusIndicator = "bg-purple-500";
  }

  const handleSuspend = async () => {
    try {
      if (suspendReason === "administrative") {
        await suspendAdminMutation.mutateAsync({ tenantId, studentId: student.id });
      } else {
        await suspendNonPaymentMutation.mutateAsync({ tenantId, studentId: student.id });
      }
      setIsSuspendModalOpen(false);
      window.alert("تم إيقاف حساب الطالب بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء إيقاف الحساب");
    }
  };

  const handleReactivate = async () => {
    try {
      await reactivateMutation.mutateAsync({ tenantId, studentId: student.id });
      window.alert("تم تفعيل حساب الطالب بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تفعيل الحساب");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-2">
        <Link href="/dashboard" className="hover:text-[var(--primary)] flex items-center gap-1">
          <LayoutDashboard size={14} /> لوحة القيادة
        </Link>
        <span>/</span>
        <Link href="/students" className="hover:text-[var(--primary)] flex items-center gap-1">
          <Users size={14} /> الطلاب
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">الملف الشخصي: {student.fullName}</span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Cover */}
        <div className="relative h-48 md:h-64 bg-gray-200">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop" 
            alt="Cover" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info Header */}
        <div className="relative px-8 pb-8 flex flex-col items-center text-center -mt-16 z-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
              <Image src={student.photoUrl || "https://i.pravatar.cc/150?u=student"} alt={student.fullName} fill className="object-cover" />
            </div>
            <Link 
              href={`/students/${student.id}/edit`} 
              className="absolute bottom-1 -right-1 bg-white p-2.5 rounded-full shadow-md text-gray-600 hover:text-[var(--primary)] transition-colors border border-gray-100"
            >
              <Edit2 size={16} />
            </Link>
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mt-4 mb-1">{student.fullName}</h1>
          <p className="text-gray-500 font-medium mb-3">ID: {student.studentCode || `ST-${student.id.substring(0, 8)}`}</p>
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${statusColor}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${statusIndicator}`} />
            {statusText}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8 bg-gray-50/50">
          
          {/* Left Column (Sidebar-like info) */}
          <div className="space-y-6">
            
            {/* Recent Activity (Placeholder) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm opacity-60 pointer-events-none">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <History className="text-[var(--primary)]" size={20} />
                النشاط الأخير (قريباً)
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 relative">
                  <div className="absolute top-2 bottom-[-20px] right-[7px] w-px bg-gray-100" />
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#1e3a8a] mt-1 shrink-0 ring-4 ring-white shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">حضور محاضرة الرياضيات الهندسية</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">اليوم - 10:30 ص</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards (Placeholder) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between opacity-60 pointer-events-none">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">متوسط الدرجات (قريباً)</p>
                  <p className="text-2xl font-black text-gray-900">--%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between opacity-60 pointer-events-none">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <UserCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">نسبة الحضور (قريباً)</p>
                  <p className="text-2xl font-black text-gray-900">--%</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Main Info) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Academic Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <GraduationCap className="text-[var(--primary)]" size={22} />
                البيانات الأكاديمية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">الفرقة الدراسية</p>
                  <p className="font-black text-gray-900">{gradeLevelName}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">الفرع</p>
                  <p className="font-black text-gray-900">{branchName}</p>
                </div>
              </div>
            </div>

            {/* Financial Info (Placeholder) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm opacity-60 pointer-events-none">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <CreditCard className="text-[var(--primary)]" size={22} />
                البيانات المالية والاشتراكات (قريباً)
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-500 font-bold mb-1">الباقة الحالية</p>
                    <p className="font-black text-[#1e3a8a]">باقة الكيمياء المكثفة</p>
                  </div>
                  <div className="text-left bg-white px-4 py-2 rounded-lg border border-blue-50 shadow-sm">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">تاريخ الانتهاء:</p>
                    <p className="font-bold text-gray-900 text-sm">2024/12/30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            {student.status === 1 ? (
              <div className="bg-[#fff1f2] rounded-2xl p-6 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-right">
                  <h4 className="text-red-700 text-lg font-black mb-1">تريد إيقاف حساب الطالب؟</h4>
                  <p className="text-red-400 font-medium">لن يتمكن الطالب من الوصول إلى حسابه بعد الإيقاف.</p>
                </div>
                <Button 
                  onClick={() => setIsSuspendModalOpen(true)}
                  className="bg-[#ffe4e6] hover:bg-red-200 text-red-600 px-10 h-12 rounded-xl font-bold gap-2 shadow-sm"
                >
                  إيقاف <XCircle size={18} />
                </Button>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-right">
                  <h4 className="text-emerald-700 text-lg font-black mb-1">إعادة تفعيل حساب الطالب؟</h4>
                  <p className="text-emerald-500 font-medium">سيتمكن الطالب من الدخول إلى حسابه والمحتوى الخاص به.</p>
                </div>
                <Button 
                  onClick={handleReactivate}
                  disabled={reactivateMutation.isPending}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-10 h-12 rounded-xl font-bold gap-2 shadow-sm"
                >
                  {reactivateMutation.isPending ? "جاري التفعيل..." : "تفعيل الحساب"} <CheckCircle size={18} />
                </Button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Suspend Confirmation Modal */}
      {isSuspendModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !suspendAdminMutation.isPending && !suspendNonPaymentMutation.isPending && setIsSuspendModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                <TriangleAlert size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">هل أنت متأكد من إيقاف حساب الطالب؟</h3>
              <p className="text-gray-500 font-medium mb-6 leading-relaxed">
                سيتم تعليق وصول الطالب للمحتوى الأكاديمي والمنصة مؤقتاً حتى يتم إعادة التفعيل يدوياً.
              </p>
              
              <div className="w-full text-right mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">سبب الإيقاف:</label>
                <select 
                  value={suspendReason} 
                  onChange={(e) => setSuspendReason(e.target.value as "administrative" | "non-payment")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
                >
                  <option value="administrative">إيقاف إداري (مخالفة سلوكية، إلخ)</option>
                  <option value="non-payment">إيقاف مالي (عدم سداد المصروفات)</option>
                </select>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 w-full flex items-center justify-between mb-8 border border-gray-100">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{student.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">{student.studentCode || `ST-${student.id.substring(0, 8)}`}</p>
                </div>
                <div className="text-left text-xs font-bold text-gray-500 space-y-1">
                  <p>الطالب:</p>
                  <p>المعرف:</p>
                </div>
              </div>
              
              <div className="flex w-full gap-3">
                <Button 
                  onClick={() => setIsSuspendModalOpen(false)}
                  disabled={suspendAdminMutation.isPending || suspendNonPaymentMutation.isPending}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  تراجع
                </Button>
                <Button 
                  onClick={handleSuspend}
                  disabled={suspendAdminMutation.isPending || suspendNonPaymentMutation.isPending}
                  className="flex-1 h-12 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold"
                >
                  {(suspendAdminMutation.isPending || suspendNonPaymentMutation.isPending) ? "جاري الإيقاف..." : "تأكيد الإيقاف"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

