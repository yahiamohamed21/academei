"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  UserCheck, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Archive, 
  RotateCcw, 
  AlertCircle, 
  Loader2, 
  LayoutDashboard,
  Search,
  UserMinus,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { 
  useGroup, 
  useGroupStudents, 
  useEligibleGroupStudents, 
  useEnrollGroupStudents, 
  useLeaveGroupStudent, 
  useAssignGroupTeacher, 
  useTransferGroupBranch, 
  useUpdateGroupPrice, 
  useArchiveGroup, 
  useReactivateGroup 
} from "@/lib/hooks/use-groups";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";
import { useSubjects } from "@/lib/hooks/use-subjects";
import { useTeachers } from "@/lib/hooks/use-teachers";
import EmptySearch from "@/components/ui/EmptySearch";

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  // Modals state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  // Form states
  const [eligibleSearch, setEligibleSearch] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [priceInput, setPriceInput] = useState<string>("");
  const [priceReason, setPriceReason] = useState<string>("");

  // Data fetching
  const { data: rawGroup, isLoading, isError } = useGroup({ tenantId, groupId: params.id });
  const group: any = rawGroup;

  const { data: rawEnrolled = [], isLoading: isLoadingStudents } = useGroupStudents({ tenantId, groupId: params.id });
  const enrolledStudents: any[] = Array.isArray(rawEnrolled) ? rawEnrolled : (rawEnrolled as any)?.items || [];

  const { data: rawEligible, isLoading: isLoadingEligible } = useEligibleGroupStudents({
    tenantId,
    groupId: params.id,
    search: eligibleSearch,
  });
  const eligibleStudents: any[] = Array.isArray(rawEligible) ? rawEligible : (rawEligible as any)?.items || [];

  const { data: branches = [] } = useBranches(tenantId);
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);
  const { data: rawSubjects } = useSubjects(tenantId);
  const subjects: any[] = Array.isArray(rawSubjects) ? rawSubjects : (rawSubjects as any)?.items || [];
  const { data: teachersData } = useTeachers({ tenantId });
  const teachers: any[] = Array.isArray(teachersData) ? teachersData : (teachersData as any)?.items || [];

  // Mutations
  const enrollMutation = useEnrollGroupStudents();
  const leaveMutation = useLeaveGroupStudent();
  const assignTeacherMutation = useAssignGroupTeacher();
  const transferBranchMutation = useTransferGroupBranch();
  const updatePriceMutation = useUpdateGroupPrice();
  const archiveMutation = useArchiveGroup();
  const reactivateMutation = useReactivateGroup();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold">حدث خطأ أثناء جلب بيانات المجموعة</h2>
        <Link href="/groups" className="mt-4 text-sm text-[var(--primary)] hover:underline flex items-center gap-1 font-bold">
          <ArrowRight size={16} /> العودة لقائمة المجموعات
        </Link>
      </div>
    );
  }

  const groupCode = group.code || `GRP-${group.id.substring(0, 6)}`;
  const assignedTeacherId = group.teacherId || group.teacherProfileId;

  const subjectName = subjects.find(s => s.id === group.subjectId)?.name || "غير محدد";
  const gradeLevelName = gradeLevels.find(g => g.id === group.gradeLevelId)?.name || "غير محدد";
  const branchName = branches.find(b => b.id === group.branchId)?.name || "غير محدد";
  const teacherName = teachers.find(t => t.id === assignedTeacherId)?.fullName || "غير معين";

  const maxCapacity = group.maxCapacity || (typeof group.capacity === 'number' ? group.capacity : Number(group.capacity) || 0);
  const enrolledCount = group.enrolledCount ?? group.activeStudentCount ?? enrolledStudents.length;

  const isArchived = group.status === 2;
  const fillPercentage = maxCapacity > 0 ? Math.min(100, Math.round((enrolledCount / maxCapacity) * 100)) : 0;

  // Actions
  const handleOpenEnrollModal = () => {
    setSelectedStudentIds([]);
    setEligibleSearch("");
    setIsEnrollModalOpen(true);
  };

  const handleToggleSelectStudent = (id: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleSelectAllEligible = () => {
    if (selectedStudentIds.length === eligibleStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(eligibleStudents.map(s => s.id));
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || selectedStudentIds.length === 0) return;

    try {
      await enrollMutation.mutateAsync({
        tenantId,
        groupId: group.id,
        studentIds: selectedStudentIds,
      });
      setIsEnrollModalOpen(false);
      setSelectedStudentIds([]);
      window.alert("تم تسجيل الطلاب في المجموعة بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تسجيل الطلاب");
    }
  };

  const handleLeaveStudent = async (studentId: string, studentName: string) => {
    if (!tenantId || !window.confirm(`هل أنت متأكد من إلغاء تسجيل الطالب "${studentName}" من المجموعة؟`)) return;

    try {
      await leaveMutation.mutateAsync({
        tenantId,
        groupId: group.id,
        studentId,
      });
      window.alert("تم إزالة الطالب من المجموعة بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء إزالة الطالب");
    }
  };

  const handleOpenTeacherModal = () => {
    setSelectedTeacherId(assignedTeacherId || "");
    setIsTeacherModalOpen(true);
  };

  const handleAssignTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId) return;

    try {
      await assignTeacherMutation.mutateAsync({
        tenantId,
        groupId: group.id,
        teacherId: selectedTeacherId || null,
      });
      setIsTeacherModalOpen(false);
      window.alert("تم تعيين المعلم بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تعيين المعلم");
    }
  };

  const handleOpenBranchModal = () => {
    setSelectedBranchId(group.branchId);
    setIsBranchModalOpen(true);
  };

  const handleTransferBranchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !selectedBranchId) return;

    try {
      await transferBranchMutation.mutateAsync({
        tenantId,
        groupId: group.id,
        branchId: selectedBranchId,
      });
      setIsBranchModalOpen(false);
      window.alert("تم نقل المجموعة للفرع الجديد بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء نقل الفرع");
    }
  };

  const handleOpenPriceModal = () => {
    setPriceInput(group.pricePerSession !== null && group.pricePerSession !== undefined ? String(group.pricePerSession) : "");
    setPriceReason("");
    setIsPriceModalOpen(true);
  };

  const handleUpdatePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId) return;

    if (!priceReason.trim()) {
      window.alert("يرجى كتابة سبب التغيير لأغراض التدقيق المالي");
      return;
    }

    const numericPrice = priceInput.trim() === "" ? null : Number(priceInput);
    if (numericPrice !== null && (isNaN(numericPrice) || numericPrice < 0)) {
      window.alert("يرجى إدخال سعر حصة صحيح وموجب");
      return;
    }

    try {
      await updatePriceMutation.mutateAsync({
        tenantId,
        groupId: group.id,
        body: {
          pricePerSession: numericPrice,
          reason: priceReason.trim(),
        },
      });
      setIsPriceModalOpen(false);
      window.alert("تم تحديث سعر الحصة بنجاح");
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تحديث سعر الحصة");
    }
  };

  const handleToggleArchive = async () => {
    if (!tenantId) return;

    try {
      if (isArchived) {
        await reactivateMutation.mutateAsync({ tenantId, groupId: group.id });
        window.alert("تم إعادة تفعيل المجموعة بنجاح");
      } else {
        if (!window.confirm("هل أنت متأكد من أرشفة هذه المجموعة؟")) return;
        await archiveMutation.mutateAsync({ tenantId, groupId: group.id });
        window.alert("تم أرشفة المجموعة بنجاح");
      }
    } catch (error: any) {
      window.alert(error.message || "حدث خطأ أثناء تغيير حالة المجموعة");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-2">
        <Link href="/dashboard" className="hover:text-[var(--primary)] flex items-center gap-1">
          <LayoutDashboard size={14} /> لوحة القيادة
        </Link>
        <span>/</span>
        <Link href="/groups" className="hover:text-[var(--primary)] flex items-center gap-1">
          <Users size={14} /> المجموعات الدراسية
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">{group.name}</span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-black text-[#001c56]">{group.name}</h1>
            <span className="bg-blue-50 text-[var(--primary)] text-xs font-mono font-bold px-3 py-1 rounded-full border border-blue-100">
              {groupCode}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isArchived 
                ? "bg-gray-100 text-gray-600 border border-gray-200" 
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}>
              {isArchived ? "مؤرشفة" : "نشطة"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              <BookOpen size={14} className="text-[var(--primary)]" /> {subjectName}
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              <GraduationCap size={14} className="text-purple-600" /> {gradeLevelName}
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              <MapPin size={14} className="text-emerald-600" /> {branchName}
            </span>
          </div>
        </div>

        {/* Management Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 z-10">
          <Button
            onClick={handleOpenEnrollModal}
            disabled={isArchived}
            className="bg-[#001c56] hover:bg-[#001033] text-white rounded-xl h-11 px-5 font-bold gap-2 text-sm shadow-sm"
          >
            <UserPlus size={16} /> تسجيل طلاب
          </Button>
          <Button
            onClick={handleOpenTeacherModal}
            variant="outline"
            className="rounded-xl h-11 px-4 font-bold gap-1.5 text-sm border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <UserCheck size={16} className="text-blue-600" /> المعلم
          </Button>
          <Button
            onClick={handleOpenBranchModal}
            variant="outline"
            className="rounded-xl h-11 px-4 font-bold gap-1.5 text-sm border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <MapPin size={16} className="text-emerald-600" /> الفرع
          </Button>
          <Button
            onClick={handleOpenPriceModal}
            variant="outline"
            className="rounded-xl h-11 px-4 font-bold gap-1.5 text-sm border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <DollarSign size={16} className="text-amber-600" /> السعر
          </Button>
          <Button
            onClick={handleToggleArchive}
            disabled={archiveMutation.isPending || reactivateMutation.isPending}
            variant="outline"
            className={`rounded-xl h-11 px-4 font-bold gap-1.5 text-sm ${
              isArchived 
                ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50" 
                : "border-amber-200 text-amber-700 hover:bg-amber-50"
            }`}
          >
            {isArchived ? (
              <>
                <RotateCcw size={16} /> استعادة
              </>
            ) : (
              <>
                <Archive size={16} /> أرشفة
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Capacity Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-400">سعة المجموعة</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[var(--primary)] flex items-center justify-center font-bold">
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900">{enrolledCount}</span>
              <span className="text-gray-400 font-bold text-sm">/ {maxCapacity} طالب</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full transition-all duration-300 ${
                  fillPercentage >= 90 ? "bg-red-500" : fillPercentage >= 70 ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-2 text-left" dir="ltr">
              {fillPercentage}% Capacity filled
            </p>
          </div>
        </div>

        {/* Teacher Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-400">المعلم المسؤول</span>
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <UserCheck size={16} />
            </div>
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">{teacherName}</p>
            <button 
              onClick={handleOpenTeacherModal}
              className="text-xs text-[var(--primary)] font-bold hover:underline mt-2 inline-block"
            >
              تغيير أو تعيين معلم جديد ←
            </button>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-400">سعر الحصة</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign size={16} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {group.pricePerSession !== null && group.pricePerSession !== undefined
                ? `${group.pricePerSession} ج.م`
                : "مجاني / غير محدد"}
            </p>
            <button 
              onClick={handleOpenPriceModal}
              className="text-xs text-amber-600 font-bold hover:underline mt-2 inline-block"
            >
              تعديل السعر وسجل التدقيق ←
            </button>
          </div>
        </div>

      </div>

      {/* Enrolled Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-black text-[#001c56]">الطلاب المسجلون في المجموعة</h2>
            <p className="text-xs text-gray-400 font-medium mt-1">إجمالي الطلاب المسجلين حالياً ({enrolledStudents.length})</p>
          </div>
          <Button
            onClick={handleOpenEnrollModal}
            disabled={isArchived}
            className="bg-[#001c56] hover:bg-[#001033] text-white rounded-xl h-10 px-4 font-bold text-xs gap-1.5"
          >
            <UserPlus size={14} /> إضافة طالب جديد
          </Button>
        </div>

        <div className="overflow-x-auto">
          {isLoadingStudents ? (
            <div className="p-12 text-center text-gray-400 font-medium text-sm flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={18} /> جاري تحميل الطلاب...
            </div>
          ) : enrolledStudents.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-medium text-sm">
              <Users size={36} className="mx-auto text-gray-300 mb-3" />
              لا يوجد طلاب مسجلون في هذه المجموعة حالياً
            </div>
          ) : (
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 text-xs font-bold">
                  <th className="py-4 px-6">اسم الطالب</th>
                  <th className="py-4 px-6">كود الطالب</th>
                  <th className="py-4 px-6">رقم الهوية</th>
                  <th className="py-4 px-6">رقم الهاتف</th>
                  <th className="py-4 px-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {enrolledStudents.map((student: any) => (
                  <tr key={student.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-gray-900">
                      <Link href={`/students/${student.id}`} className="hover:text-[var(--primary)] transition-colors">
                        {student.fullName}
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-600">
                      {student.studentCode || `ST-${student.id.substring(0, 6)}`}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 font-mono">
                      {student.nationalId || "--"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 font-mono">
                      {student.phoneNumber || "--"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleLeaveStudent(student.id, student.fullName)}
                        disabled={leaveMutation.isPending}
                        title="إلغاء التسجيل من المجموعة"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-flex items-center gap-1 text-xs font-bold"
                      >
                        <UserMinus size={16} /> مغادرة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Enroll Students Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !enrollMutation.isPending && setIsEnrollModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative z-10 animate-in zoom-in-95 duration-200 space-y-6 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">تسجيل طلاب في المجموعة</h3>
                <p className="text-xs text-gray-500 mt-0.5">يتم عرض الطلاب المستحقين بالتوافق مع الصف الدراسي للمجموعة ({gradeLevelName})</p>
              </div>
              <button 
                onClick={() => setIsEnrollModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-2"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                value={eligibleSearch}
                onChange={(e) => setEligibleSearch(e.target.value)}
                placeholder="ابحث عن طالب بالاسم أو الرقم القومي أو الهاتف..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pr-11 pl-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)] focus:bg-white transition-colors"
              />
            </div>

            {/* Eligible List */}
            <div className="flex-1 overflow-y-auto border border-gray-100 rounded-2xl divide-y divide-gray-50 min-h-[250px]">
              {isLoadingEligible ? (
                <div className="p-8 text-center text-gray-400 font-medium text-sm flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> جاري جلب الطلاب المستحقين...
                </div>
              ) : eligibleStudents.length === 0 ? (
                <div className="py-6 px-4">
                  <EmptySearch 
                    title="لا يوجد طلاب مطبقون لبحثك"
                    message="لم نتمكن من العثور على طلاب مستحقين مطابقين لاسم البحث أو كود الطالب."
                  />
                </div>
              ) : (
                <>
                  <div className="p-3 bg-gray-50/80 flex items-center justify-between text-xs font-bold text-gray-600">
                    <span>عدد الطلاب المتاحين: {eligibleStudents.length}</span>
                    <button 
                      type="button" 
                      onClick={handleSelectAllEligible} 
                      className="text-[var(--primary)] hover:underline font-bold"
                    >
                      {selectedStudentIds.length === eligibleStudents.length ? "إلغاء تحديد الكل" : "تحديد الكل"}
                    </button>
                  </div>
                  {eligibleStudents.map((student: any) => {
                    const isSelected = selectedStudentIds.includes(student.id);
                    return (
                      <div 
                        key={student.id} 
                        onClick={() => handleToggleSelectStudent(student.id)}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected ? "bg-blue-50/60" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "border-gray-300"
                          }`}>
                            {isSelected && <CheckCircle2 size={14} />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{student.fullName}</p>
                            <p className="text-xs text-gray-500 font-mono mt-0.5">
                              {student.studentCode || `ST-${student.id.substring(0, 6)}`} | {student.phoneNumber || "بدون رقم"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500">
                المحدد: <strong className="text-gray-900">{selectedStudentIds.length}</strong> طالب
              </span>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  variant="outline"
                  className="rounded-xl h-11 px-5 font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleEnrollSubmit}
                  disabled={selectedStudentIds.length === 0 || enrollMutation.isPending}
                  className="bg-[#001c56] hover:bg-[#001033] text-white rounded-xl h-11 px-6 font-bold gap-2"
                >
                  {enrollMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : "تأكيد التسجيل"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Teacher Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsTeacherModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-gray-900 mb-6">تعيين المعلم المسؤول</h3>
            <form onSubmit={handleAssignTeacherSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">اختر المعلم</label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- بدون معلم (غير معين) --</option>
                  {teachers.map((teacher: any) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fullName} {teacher.specialization ? `(${teacher.specialization})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={assignTeacherMutation.isPending}
                  className="flex-1 h-12 bg-[#001c56] hover:bg-[#001033] text-white rounded-xl font-bold"
                >
                  {assignTeacherMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "حفظ التعيين"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Branch Modal */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsBranchModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-gray-900 mb-6">نقل المجموعة إلى فرع آخر</h3>
            <form onSubmit={handleTransferBranchSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">الفرع المستهدف *</label>
                <select
                  required
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- اختر الفرع --</option>
                  {branches.map((branch: any) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={transferBranchMutation.isPending}
                  className="flex-1 h-12 bg-[#001c56] hover:bg-[#001033] text-white rounded-xl font-bold"
                >
                  {transferBranchMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "تأكيد النقل"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Price & Audit Modal */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsPriceModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-gray-900 mb-2">تحديث سعر الحصة</h3>
            <p className="text-xs text-gray-500 font-medium mb-6">يتطلب تحديث سعر الحصة إدخال سبب للتسجيل في سجل التدقيق المالي</p>
            
            <form onSubmit={handleUpdatePriceSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">سعر الحصة (ج.م)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="اتركه فارغاً إذا كانت مجانية / غير محددة"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">سبب التغيير (إجباري للتدقيق) *</label>
                <textarea
                  required
                  rows={3}
                  value={priceReason}
                  onChange={(e) => setPriceReason(e.target.value)}
                  placeholder="مثال: تعديل التسعير السنوي للمجموعة بقرار الإدارة..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-[var(--primary)] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsPriceModalOpen(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={updatePriceMutation.isPending}
                  className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold"
                >
                  {updatePriceMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "تأكيد التعديل"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

