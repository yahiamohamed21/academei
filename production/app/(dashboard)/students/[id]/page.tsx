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
  AlertCircle,
  UserPlus,
  Unlink,
  Phone,
  User,
  Shield,
  Loader2,
  Plus
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { 
  useStudent, 
  useSuspendStudentAdministrative, 
  useSuspendStudentNonPayment, 
  useReactivateStudent,
  useGraduateStudent,
  useGuardians,
  useCreateGuardian,
  useStudentGuardians, 
  useLinkStudentGuardian, 
  useUpdateStudentGuardian, 
  useUnlinkStudentGuardian 
} from "@/lib/hooks/use-students";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";

const relationshipTypes = [
  { value: 1, label: "أب" },
  { value: 2, label: "أم" },
  { value: 3, label: "ولي أمر شرعي" },
  { value: 4, label: "آخر" },
];

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;
  
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isGraduateModalOpen, setIsGraduateModalOpen] = useState(false);
  const [isLinkGuardianModalOpen, setIsLinkGuardianModalOpen] = useState(false);
  const [isCreateGuardianModalOpen, setIsCreateGuardianModalOpen] = useState(false);

  const [suspendReason, setSuspendReason] = useState<"administrative" | "non-payment">("administrative");
  
  // Link Guardian Form State
  const [selectedGuardianId, setSelectedGuardianId] = useState("");
  const [relationshipType, setRelationshipType] = useState<number>(1);
  const [isPrimaryContact, setIsPrimaryContact] = useState<boolean>(true);

  // New Guardian Form State
  const [newGuardianName, setNewGuardianName] = useState("");
  const [newGuardianPhone, setNewGuardianPhone] = useState("");

  const { data: student, isLoading, isError } = useStudent({ tenantId, studentId: params.id });
  const { data: branches = [] } = useBranches(tenantId);
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);
  const { data: tenantGuardians = [] } = useGuardians(tenantId);
  const { data: studentGuardians = [], isLoading: isLoadingGuardians } = useStudentGuardians({ tenantId, studentId: params.id });

  const suspendAdminMutation = useSuspendStudentAdministrative();
  const suspendNonPaymentMutation = useSuspendStudentNonPayment();
  const reactivateMutation = useReactivateStudent();
  const graduateMutation = useGraduateStudent();

  const createGuardianMutation = useCreateGuardian();
  const linkGuardianMutation = useLinkStudentGuardian();
  const updateStudentGuardianMutation = useUpdateStudentGuardian();
  const unlinkStudentGuardianMutation = useUnlinkStudentGuardian();

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

  // Map status integer
  let statusText = "غير معروف";
  let statusColor = "bg-gray-100 text-gray-600 border-gray-200";
  let statusIndicator = "bg-gray-500";
  
  if (student.status === 1) {
    statusText = "نشط ومستمر";
    statusColor = "bg-blue-50 text-blue-700 border-blue-100";
    statusIndicator = "bg-green-500";
  } else if (student.status === 2) {
    statusText = "موقوف مؤقتاً (إدارياً)";
    statusColor = "bg-amber-50 text-amber-700 border-amber-100";
    statusIndicator = "bg-amber-500";
  } else if (student.status === 3) {
    statusText = "موقوف (عدم سداد المصروفات)";
    statusColor = "bg-red-50 text-red-700 border-red-100";
    statusIndicator = "bg-red-500";
  } else if (student.status === 4) {
    statusText = "خريج / أكمل الكورسات";
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

  const handleGraduate = async () => {
    try {
      await graduateMutation.mutateAsync({ tenantId, studentId: student.id });
      setIsGraduateModalOpen(false);
      window.alert("تم تسجيل الطالب كخريج بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تسجيل التخرج");
    }
  };

  const handleLinkGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !selectedGuardianId) return;

    try {
      await linkGuardianMutation.mutateAsync({
        tenantId,
        studentId: student.id,
        body: {
          guardianId: selectedGuardianId,
          relationshipType: relationshipType as any,
          isPrimaryContact,
        },
      });
      setIsLinkGuardianModalOpen(false);
      setSelectedGuardianId("");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء ربط ولي الأمر");
    }
  };

  const handleCreateAndLinkGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !newGuardianName || !newGuardianPhone) return;

    try {
      const guardianRes: any = await createGuardianMutation.mutateAsync({
        tenantId,
        body: {
          fullName: newGuardianName,
          phoneNumber: newGuardianPhone,
        },
      });

      if (guardianRes?.id) {
        await linkGuardianMutation.mutateAsync({
          tenantId,
          studentId: student.id,
          body: {
            guardianId: guardianRes.id,
            relationshipType: relationshipType as any,
            isPrimaryContact,
          },
        });
      }
      setIsCreateGuardianModalOpen(false);
      setNewGuardianName("");
      setNewGuardianPhone("");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء إنشاء وربط ولي الأمر");
    }
  };

  const handleUnlinkGuardian = async (guardianId: string) => {
    if (!tenantId || !window.confirm("هل أنت متأكد من إلغاء ربط ولي الأمر بالطالب؟")) return;
    try {
      await unlinkStudentGuardianMutation.mutateAsync({ tenantId, studentId: student.id, guardianId });
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء إلغاء الربط");
    }
  };

  const handleTogglePrimaryContact = async (gLink: any) => {
    if (!tenantId) return;
    try {
      await updateStudentGuardianMutation.mutateAsync({
        tenantId,
        studentId: student.id,
        guardianId: gLink.guardianId,
        body: {
          relationshipType: gLink.relationshipType,
          isPrimaryContact: !gLink.isPrimaryContact,
        },
      });
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تحديث بيانات الربط");
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
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative flex items-center justify-center text-gray-400">
              {student.photoUrl ? (
                <Image src={student.photoUrl} alt={student.fullName} fill className="object-cover" />
              ) : (
                <User size={48} />
              )}
            </div>
            <Link 
              href={`/students/${student.id}/edit`} 
              className="absolute bottom-1 -right-1 bg-white p-2.5 rounded-full shadow-md text-gray-600 hover:text-[var(--primary)] transition-colors border border-gray-100"
            >
              <Edit2 size={16} />
            </Link>
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mt-4 mb-1">{student.fullName}</h1>
          <p className="text-gray-500 font-medium mb-3">كود الطالب: {student.studentCode || `ST-${student.id.substring(0, 8)}`}</p>
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${statusColor}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${statusIndicator}`} />
            {statusText}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8 bg-gray-50/50">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Guardian Links Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#1e3a8a] flex items-center gap-2">
                  <Shield className="text-[var(--primary)]" size={20} />
                  أولياء الأمور
                </h3>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsLinkGuardianModalOpen(true)}
                    className="text-xs bg-blue-50 text-[var(--primary)] font-bold px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                  >
                    <UserPlus size={14} /> ربط
                  </button>
                  <button 
                    onClick={() => setIsCreateGuardianModalOpen(true)}
                    className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> جديد
                  </button>
                </div>
              </div>

              {isLoadingGuardians ? (
                <div className="text-center py-6 text-xs text-gray-500 font-medium">جاري التحميل...</div>
              ) : studentGuardians.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium mb-3">لا يوجد أولياء أمور مرتبطين بعد</p>
                  <Button onClick={() => setIsLinkGuardianModalOpen(true)} variant="outline" className="text-xs h-8 px-3 font-bold">
                    ربط ولي أمر
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {studentGuardians.map((gLink: any) => {
                    const matchedGuardian = tenantGuardians.find((g: any) => g.id === gLink.guardianId);
                    const relLabel = relationshipTypes.find(r => r.value === gLink.relationshipType)?.label || "ولي أمر";

                    return (
                      <div key={gLink.guardianId} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">{matchedGuardian?.fullName || 'ولي أمر'}</span>
                            {gLink.isPrimaryContact && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">الرئيسي</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>صلة القرابة: {relLabel}</span>
                            {matchedGuardian?.phoneNumber && (
                              <span className="flex items-center gap-1 font-mono text-gray-700"><Phone size={10} /> {matchedGuardian.phoneNumber}</span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleTogglePrimaryContact(gLink)}
                            title="تغيير صفة الاتصال الرئيسي"
                            className="p-1.5 text-gray-400 hover:text-amber-600 transition-colors"
                          >
                            <Star size={16} fill={gLink.isPrimaryContact ? "currentColor" : "none"} className={gLink.isPrimaryContact ? "text-amber-500" : ""} />
                          </button>
                          <button 
                            onClick={() => handleUnlinkGuardian(gLink.guardianId)}
                            title="إلغاء الربط"
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Unlink size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Stats Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">تاريخ الالتحاق</p>
                  <p className="text-sm font-black text-gray-900">
                    {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString("ar-EG") : '--'}
                  </p>
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
                البيانات الأكاديمية والشخصية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">الصف / المرحلة الدراسية</p>
                  <p className="font-black text-gray-900">{gradeLevelName}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">الفرع / المقر</p>
                  <p className="font-black text-gray-900">{branchName}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">رقم الهوية / القومي</p>
                  <p className="font-black text-gray-900">{student.nationalId || '--'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">رقم الهاتف</p>
                  <p className="font-black text-gray-900">{student.phoneNumber || '--'}</p>
                </div>
              </div>
            </div>

            {/* Actions & Status Management */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-gray-900 mb-2">إدارة حالة الطالب</h3>

              <div className="flex flex-wrap gap-3">
                {student.status === 1 ? (
                  <>
                    <Button 
                      onClick={() => setIsSuspendModalOpen(true)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 h-11 px-5 rounded-xl font-bold gap-2 text-sm"
                    >
                      <XCircle size={16} /> إيقاف حساب الطالب
                    </Button>
                    <Button 
                      onClick={() => setIsGraduateModalOpen(true)}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 h-11 px-5 rounded-xl font-bold gap-2 text-sm"
                    >
                      <GraduationCap size={16} /> تسجيل كخريج
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleReactivate}
                    disabled={reactivateMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white h-11 px-6 rounded-xl font-bold gap-2 text-sm shadow-sm"
                  >
                    {reactivateMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                    إعادة تفعيل الحساب
                  </Button>
                )}
              </div>
            </div>

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
              <h3 className="text-xl font-black text-gray-900 mb-2">إيقاف حساب الطالب</h3>
              <p className="text-gray-500 font-medium mb-6 leading-relaxed text-sm">
                اختر سبب الإيقاف المناسب لإجراء التغيير على حالة الطالب.
              </p>
              
              <div className="w-full text-right mb-6">
                <label className="block text-xs font-bold text-gray-700 mb-2">سبب الإيقاف:</label>
                <select 
                  value={suspendReason} 
                  onChange={(e) => setSuspendReason(e.target.value as "administrative" | "non-payment")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
                >
                  <option value="administrative">إيقاف إداري (مخالفة سلوكية أو إدارية)</option>
                  <option value="non-payment">إيقاف مالي (عدم سداد المصروفات)</option>
                </select>
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

      {/* Graduation Modal */}
      {isGraduateModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !graduateMutation.isPending && setIsGraduateModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">تخرج الطالب</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed text-sm">
                هل أنت متأكد من تغيير حالة الطالب إلى (خريج)؟ عادة ما تعتبر هذه العملية غير قابلة للتراجع.
              </p>
              
              <div className="flex w-full gap-3">
                <Button 
                  onClick={() => setIsGraduateModalOpen(false)}
                  disabled={graduateMutation.isPending}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  إلغاء
                </Button>
                <Button 
                  onClick={handleGraduate}
                  disabled={graduateMutation.isPending}
                  className="flex-1 h-12 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold"
                >
                  {graduateMutation.isPending ? "جاري التغيير..." : "تأكيد التخرج"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link Guardian Modal */}
      {isLinkGuardianModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsLinkGuardianModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-gray-900 mb-6">ربط ولي أمر موجود</h3>
            <form onSubmit={handleLinkGuardian} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">اختر ولي الأمر *</label>
                <select 
                  required
                  value={selectedGuardianId}
                  onChange={(e) => setSelectedGuardianId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- اختر ولي الأمر --</option>
                  {tenantGuardians.map((g: any) => (
                    <option key={g.id} value={g.id}>{g.fullName} ({g.phoneNumber})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">صلة القرابة *</label>
                <select 
                  value={relationshipType}
                  onChange={(e) => setRelationshipType(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  {relationshipTypes.map(rt => (
                    <option key={rt.value} value={rt.value}>{rt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="primaryContactCheck"
                  checked={isPrimaryContact}
                  onChange={(e) => setIsPrimaryContact(e.target.checked)}
                  className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <label htmlFor="primaryContactCheck" className="text-sm font-bold text-gray-700 cursor-pointer">
                  تعيين كجهة اتصال رئيسية
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={() => setIsLinkGuardianModalOpen(false)}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button 
                  type="submit"
                  disabled={linkGuardianMutation.isPending}
                  className="flex-1 h-12 bg-[#001c56] hover:bg-[#001033] text-white rounded-xl font-bold"
                >
                  {linkGuardianMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "تأكيد الربط"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create & Link Guardian Modal */}
      {isCreateGuardianModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsCreateGuardianModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-gray-900 mb-6">إنشاء وربط ولي أمر جديد</h3>
            <form onSubmit={handleCreateAndLinkGuardian} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">اسم ولي الأمر بالكامل *</label>
                <input 
                  type="text" 
                  required
                  value={newGuardianName}
                  onChange={(e) => setNewGuardianName(e.target.value)}
                  placeholder="أدخل اسم ولي الأمر"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">رقم الهاتف *</label>
                <input 
                  type="text" 
                  required
                  value={newGuardianPhone}
                  onChange={(e) => setNewGuardianPhone(e.target.value)}
                  placeholder="أدخل رقم الهاتف"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">صلة القرابة *</label>
                <select 
                  value={relationshipType}
                  onChange={(e) => setRelationshipType(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  {relationshipTypes.map(rt => (
                    <option key={rt.value} value={rt.value}>{rt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="primaryContactCheckNew"
                  checked={isPrimaryContact}
                  onChange={(e) => setIsPrimaryContact(e.target.checked)}
                  className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <label htmlFor="primaryContactCheckNew" className="text-sm font-bold text-gray-700 cursor-pointer">
                  تعيين كجهة اتصال رئيسية
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={() => setIsCreateGuardianModalOpen(false)}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button 
                  type="submit"
                  disabled={createGuardianMutation.isPending || linkGuardianMutation.isPending}
                  className="flex-1 h-12 bg-[#001c56] hover:bg-[#001033] text-white rounded-xl font-bold"
                >
                  {(createGuardianMutation.isPending || linkGuardianMutation.isPending) ? <Loader2 className="animate-spin" size={18} /> : "حفظ وربط"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
