"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { 
  ChevronDown, 
  CheckCircle, 
  Users, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  UserCheck,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useCreateGroup } from "@/lib/hooks/use-groups";
import { useSubjects } from "@/lib/hooks/use-subjects";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";
import { useBranches } from "@/lib/hooks/use-branches";
import { useTeachers } from "@/lib/hooks/use-teachers";

export default function NewGroupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: rawSubjects } = useSubjects(tenantId);
  const subjects: any[] = Array.isArray(rawSubjects) ? rawSubjects : (rawSubjects as any)?.items || [];
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);
  const { data: branches = [] } = useBranches(tenantId);
  const { data: teachersData } = useTeachers({ tenantId });
  const teachers = teachersData?.items || [];

  const createGroupMutation = useCreateGroup();

  // Form State
  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeLevelId, setGradeLevelId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [teacherProfileId, setTeacherProfileId] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !name || !subjectId || !gradeLevelId || !branchId) return;

    try {
      await createGroupMutation.mutateAsync({
        tenantId,
        body: {
          name,
          subjectId,
          gradeLevelId,
          branchId,
          teacherProfileId: teacherProfileId || null,
          capacity: capacity ? Number(capacity) : null,
        },
      });

      window.alert("تم إنشاء المجموعة بنجاح");
      router.push("/groups");
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء إنشاء المجموعة");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Header Inside Card */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl font-extrabold text-[#001c56]">إضافة مجموعة دراسية جديدة</h1>
          <p className="text-gray-500 font-medium text-sm">أدخل بيانات وتوزيع المجموعة الأكاديمية ليتم إنشاؤها في النظام.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          
          {/* Class / Group Name */}
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-[#001c56] block text-right">اسم المجموعة *</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: مجموعة الكيمياء - الصف الثاني الثانوي - قسم أ" 
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all"
            />
          </div>

          {/* Subject and Grade Level Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">المادة الدراسية *</label>
              <div className="relative">
                <select 
                  required
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-800 cursor-pointer"
                >
                  <option value="">اختر المادة</option>
                  {subjects.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">الصف / المرحلة الدراسية *</label>
              <div className="relative">
                <select 
                  required
                  value={gradeLevelId}
                  onChange={(e) => setGradeLevelId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-800 cursor-pointer"
                >
                  <option value="">اختر الصف الدراسي</option>
                  {gradeLevels.map((gl: any) => (
                    <option key={gl.id} value={gl.id}>{gl.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Branch and Teacher Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">الفرع / Campus *</label>
              <div className="relative">
                <select 
                  required
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-800 cursor-pointer"
                >
                  <option value="">اختر الفرع</option>
                  {branches.map((b: any) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">إسناد المعلم (اختياري)</label>
              <div className="relative">
                <select 
                  value={teacherProfileId}
                  onChange={(e) => setTeacherProfileId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-800 cursor-pointer"
                >
                  <option value="">بدون معلم (غير مسند)</option>
                  {teachers.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.fullName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-[#001c56] block text-right">السعة الاستيعابية (الحد الأقصى للطلاب)</label>
            <div className="relative">
              <input 
                type="number" 
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : "")}
                placeholder="مثال: 30 (اتركه فارغاً لسعة مفتوحة)" 
                className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all"
              />
              <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 flex items-center justify-end gap-4 w-full border-t border-gray-100">
            <Link href="/groups">
              <Button type="button" variant="outline" className="h-12 px-8 bg-blue-50/50 text-[#001c56] hover:bg-blue-100 border-transparent font-bold rounded-xl text-sm">
                إلغاء
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={createGroupMutation.isPending}
              className="h-12 px-8 bg-[#001c56] hover:bg-[#001033] text-white font-bold rounded-xl text-sm gap-2"
            >
              {createGroupMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
              إنشاء المجموعة الآن
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
