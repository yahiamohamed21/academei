"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  Users, 
  BookOpen, 
  Search, 
  ChevronDown, 
  Archive, 
  RotateCcw, 
  Eye, 
  DollarSign, 
  MapPin, 
  GraduationCap,
  Loader2,
  Tag
} from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useGroups, useArchiveGroup, useReactivateGroup, GroupStatus } from "@/lib/hooks/use-groups";
import { useSubjects } from "@/lib/hooks/use-subjects";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";
import { useBranches } from "@/lib/hooks/use-branches";
import { useTeachers } from "@/lib/hooks/use-teachers";
import EmptySearch from "@/components/ui/EmptySearch";

export default function GroupsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const [search, setSearch] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedGradeLevelId, setSelectedGradeLevelId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const { data: groupsPage, isLoading, isError } = useGroups({
    tenantId,
    search: search || undefined,
    subjectId: selectedSubjectId || undefined,
    gradeLevelId: selectedGradeLevelId || undefined,
    branchId: selectedBranchId || undefined,
    status: selectedStatus !== "" ? Number(selectedStatus) : undefined,
    page,
    pageSize,
  });

  const { data: rawSubjects } = useSubjects(tenantId);
  const subjects: any[] = Array.isArray(rawSubjects) ? rawSubjects : (rawSubjects as any)?.items || [];
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);
  const { data: branches = [] } = useBranches(tenantId);
  const { data: teachersData } = useTeachers({ tenantId });
  const teachers = teachersData?.items || [];

  const archiveMutation = useArchiveGroup();
  const reactivateMutation = useReactivateGroup();

  const groups = groupsPage?.items || [];

  const handleArchive = async (groupId: string) => {
    if (!tenantId || !window.confirm("هل أنت متأكد من أرشفة هذه المجموعة؟ لن تتمكن من إضافة طلاب أو جدولة حصص جديدة عليها.")) return;
    try {
      await archiveMutation.mutateAsync({ tenantId, groupId });
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء أرشفة المجموعة");
    }
  };

  const handleReactivate = async (groupId: string) => {
    if (!tenantId) return;
    try {
      await reactivateMutation.mutateAsync({ tenantId, groupId });
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء إعادة تفعيل المجموعة");
    }
  };

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#001c56] mb-2 tracking-tight">إدارة المجموعات الدراسية</h1>
          <p className="text-gray-500 font-medium">
            تنظيم وتجدول المجموعات والأقسام التعليمية، متابعة السعة والتأهيل وإسناد المعلمين.
          </p>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
          <Link href="/groups/new" className="w-full md:w-auto">
            <Button className="bg-[#001c56] hover:bg-[#001033] text-white gap-2 h-12 px-6 rounded-xl shadow-md w-full font-bold">
              <Plus size={18} />
              إضافة مجموعة جديدة
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full lg:w-80">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم المجموعة..."
            className="w-full h-11 rounded-xl bg-gray-50 border border-gray-200 pr-10 pl-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto flex-1 justify-end">
          
          <select 
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 h-11 text-xs font-bold text-gray-700 outline-none"
          >
            <option value="">كل المواد</option>
            {subjects.map((sub: any) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>

          <select 
            value={selectedGradeLevelId}
            onChange={(e) => setSelectedGradeLevelId(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 h-11 text-xs font-bold text-gray-700 outline-none"
          >
            <option value="">كل الصفوف</option>
            {gradeLevels.map((gl: any) => (
              <option key={gl.id} value={gl.id}>{gl.name}</option>
            ))}
          </select>

          <select 
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 h-11 text-xs font-bold text-gray-700 outline-none"
          >
            <option value="">كل الفروع</option>
            {branches.map((b: any) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value ? Number(e.target.value) : "")}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 h-11 text-xs font-bold text-gray-700 outline-none"
          >
            <option value="">كل الحالات</option>
            <option value="1">نشطة (Active)</option>
            <option value="2">مؤرشفة (Archived)</option>
          </select>

        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500 font-bold flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={20} />
          جاري تحميل المجموعات...
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500 font-bold">حدث خطأ أثناء جلب المجموعات</div>
      ) : groups.length === 0 ? (
        <EmptySearch 
          title="لا توجد مجموعات دراسية مطابقة لبحثك"
          message="لم نتمكن من العثور على مجموعات دراسية مطابقة لخيارات البحث والفلترة الحالية."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group: any) => {
            const subjectName = subjects.find(s => s.id === group.subjectId)?.name || "مادة غير محددة";
            const gradeName = gradeLevels.find(g => g.id === group.gradeLevelId)?.name || "صف غير محدد";
            const branchName = branches.find(b => b.id === group.branchId)?.name || "فرع غير محدد";
            const teacherName = teachers.find(t => t.id === group.teacherProfileId)?.fullName || "غير مسند ومعين";

            const capacity = group.capacity || null;
            const activeCount = group.activeStudentCount || 0;
            const fillPercentage = capacity ? Math.min(Math.round((activeCount / capacity) * 100), 100) : 0;

            return (
              <div 
                key={group.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="font-extrabold text-[#001c56] text-lg leading-snug flex-1">{group.name}</h3>
                    <span 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shrink-0
                      ${group.status === 1 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
                    >
                      {group.status === 1 ? 'نشطة' : 'مؤرشفة'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-2 text-gray-700">
                      <BookOpen size={14} className="text-[var(--primary)]" />
                      <span>المادة: {subjectName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} className="text-gray-400" />
                      <span>الصف: {gradeName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span>الفرع: {branchName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <span>المعلم: {teacherName}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 mb-4">
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-gray-500">السعة الاستيعابية</span>
                      <span className="text-[#001c56] font-mono">{activeCount} / {capacity || 'غير محدد'}</span>
                    </div>
                    {capacity ? (
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${fillPercentage >= 90 ? 'bg-red-500' : 'bg-[var(--primary)]'}`}
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-400 font-bold">سعة مفتوحة (غير محدودة)</p>
                    )}
                  </div>

                  {/* Price */}
                  {group.pricePerSession != null && (
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 mb-4 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                      <DollarSign size={14} />
                      <span>سعر الحصة: {group.pricePerSession}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                  <Link href={`/groups/${group.id}`} className="flex-1">
                    <Button variant="outline" className="w-full h-10 text-xs font-bold text-[#001c56] border-gray-200 gap-1.5 rounded-xl">
                      <Eye size={14} /> التفاصيل والطلاب
                    </Button>
                  </Link>

                  {group.status === 1 ? (
                    <Button 
                      onClick={() => handleArchive(group.id)}
                      disabled={archiveMutation.isPending}
                      variant="outline" 
                      className="h-10 px-3 text-xs font-bold bg-red-50 text-red-600 border-red-100 hover:bg-red-100 rounded-xl"
                      title="أرشفة المجموعة"
                    >
                      <Archive size={14} />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleReactivate(group.id)}
                      disabled={reactivateMutation.isPending}
                      variant="outline" 
                      className="h-10 px-3 text-xs font-bold bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 rounded-xl"
                      title="إعادة تفعيل"
                    >
                      <RotateCcw size={14} />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
