"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { 
  LayoutDashboard,
  Users,
  ChevronDown,
  Save,
  User,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useStudent, useUpdateStudent, useUpdateStudentBranch, useUpdateStudentGradeLevel } from "@/lib/hooks/use-students";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";

export default function EditStudentProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;
  
  const { data: student, isLoading, isError } = useStudent({ tenantId, studentId: params.id });
  const { data: branches = [] } = useBranches(tenantId);
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);

  const updateStudentMutation = useUpdateStudent();
  const updateBranchMutation = useUpdateStudentBranch();
  const updateGradeLevelMutation = useUpdateStudentGradeLevel();

  // Form State
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [branchId, setBranchId] = useState("");
  const [gradeLevelId, setGradeLevelId] = useState("");

  useEffect(() => {
    if (student) {
      setFullName(student.fullName || "");
      setNationalId(student.nationalId || "");
      setPhoneNumber(student.phoneNumber || "");
      setPhotoUrl(student.photoUrl || "");
      setEnrollmentDate(student.enrollmentDate ? student.enrollmentDate.split("T")[0] : new Date().toISOString().split("T")[0]);
      setBranchId(student.branchId || "");
      setGradeLevelId(student.gradeLevelId || "");
    }
  }, [student]);

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

  const isSaving = updateStudentMutation.isPending || updateBranchMutation.isPending || updateGradeLevelMutation.isPending;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !fullName || !nationalId || !branchId || !gradeLevelId) return;

    try {
      // 1. Update basic info (excluding studentCode as it is immutable)
      await updateStudentMutation.mutateAsync({
        tenantId,
        studentId: student.id,
        body: {
          fullName,
          nationalId,
          phoneNumber: phoneNumber || null,
          photoUrl: photoUrl || null,
          enrollmentDate: enrollmentDate || new Date().toISOString().split("T")[0],
          branchId,
          gradeLevelId,
        },
      });

      // 2. Update branch if changed
      if (branchId !== student.branchId) {
        await updateBranchMutation.mutateAsync({
          tenantId,
          studentId: student.id,
          branchId,
        });
      }

      // 3. Update grade level if changed
      if (gradeLevelId !== student.gradeLevelId) {
        await updateGradeLevelMutation.mutateAsync({
          tenantId,
          studentId: student.id,
          gradeLevelId,
        });
      }

      window.alert("تم حفظ التعديلات بنجاح");
      router.push(`/students/${student.id}`);
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء حفظ التعديلات");
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-10">
      
      {/* Top Bar / Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/dashboard" className="hover:text-[var(--primary)] flex items-center gap-1">
            <LayoutDashboard size={14} /> لوحة القيادة
          </Link>
          <span>/</span>
          <Link href="/students" className="hover:text-[var(--primary)] flex items-center gap-1">
            <Users size={14} /> الطلاب
          </Link>
          <span>/</span>
          <Link href={`/students/${student.id}`} className="hover:text-[var(--primary)] font-bold">
            تعديل بيانات الطالب: {student.fullName}
          </Link>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Link href={`/students/${student.id}`}>
            <Button type="button" variant="outline" className="bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200 h-10 px-5 rounded-full font-bold w-full md:w-auto">
              إلغاء
            </Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="bg-[#0f172a] hover:bg-[#1e293b] text-white h-10 px-6 rounded-full font-bold gap-2 shadow-sm w-full md:w-auto">
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-12">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 rounded-3xl p-6 bg-gray-50/50">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm relative bg-gray-200 flex items-center justify-center text-gray-500">
              {photoUrl ? (
                <Image src={photoUrl} alt={fullName} fill className="object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">{fullName || student.fullName}</h1>
              <p className="text-gray-500 font-medium">كود الطالب (غير قابل للتعديل): {student.studentCode}</p>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="max-w-3xl space-y-10">
          
          {/* Section 1: Personal Data */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">البيانات الشخصية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الاسم الكامل *</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الرقم القومي / الهوية *</label>
                <input 
                  type="text" 
                  required
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">رقم الهاتف</label>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-left" 
                  dir="ltr" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">رابط الصورة (URL)</label>
                <input 
                  type="url" 
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-left" 
                  dir="ltr" 
                />
              </div>
            </div>
          </section>

          {/* Section 2: Academic Placement */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">التوزيع الأكاديمي</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الصف / المرحلة الدراسية *</label>
                <div className="relative">
                  <select 
                    required
                    value={gradeLevelId}
                    onChange={(e) => setGradeLevelId(e.target.value)}
                    className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  >
                    <option value="">اختر الصف</option>
                    {gradeLevels.map((g: any) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الفرع / Campus *</label>
                <div className="relative">
                  <select 
                    required
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  >
                    <option value="">اختر الفرع</option>
                    {branches.map((b: any) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">تاريخ الالتحاق *</label>
                <input 
                  type="date" 
                  required
                  value={enrollmentDate}
                  onChange={(e) => setEnrollmentDate(e.target.value)}
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href={`/students/${student.id}`}>
              <Button type="button" variant="outline" className="h-12 px-6 rounded-xl font-bold border-gray-200 text-gray-600">
                إلغاء
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isSaving}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white h-12 px-8 rounded-xl font-bold gap-2 shadow-md"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              حفظ التغييرات
            </Button>
          </div>

        </div>
      </div>
    </form>
  );
}
