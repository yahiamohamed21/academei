"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Users, BookOpen, User, Layers } from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useGroups } from "@/lib/hooks/use-groups";

export default function GroupsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: groupsPage, isLoading, isError } = useGroups({
    tenantId,
    page,
    pageSize,
  });

  const groups = groupsPage?.items || [];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--primary)] mb-2 tracking-tight">إدارة المجموعات</h1>
          <p className="text-gray-500 font-medium">
            عرض وتنظيم المجموعات الدراسية
          </p>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
          <Link href="/groups/new" className="w-full md:w-auto">
            <Button className="bg-[#001c56] hover:bg-[#001033] text-white gap-2 h-11 px-6 rounded-xl shadow-md w-full font-bold">
              <Plus size={18} />
              إضافة مجموعة جديدة
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500 font-bold">جاري تحميل المجموعات...</div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500 font-bold">حدث خطأ أثناء جلب المجموعات</div>
      ) : groups.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-bold">لا توجد مجموعات حتى الآن</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group: any) => (
            <div 
              key={group.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className="font-extrabold text-[#001c56] text-lg leading-snug flex-1 pr-1">{group.name}</h3>
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shrink-0
                  ${group.status === 1 ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  {group.status === 1 ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <Users size={16} className="text-gray-400" />
                  <span>الطلاب: {group.activeStudentCount} / {group.capacity || 'غير محدد'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
