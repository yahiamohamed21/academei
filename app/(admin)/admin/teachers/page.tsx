"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  Ban
} from "lucide-react";

type Teacher = {
  id: number;
  name: string;
  owner: string;
  plan: string;
  status: "active" | "suspended" | "warning";
  joinDate: string;
  students: number;
  expires: string;
};

const initialTeachers: Teacher[] = [
  { id: 1, name: "مركز الأوائل التعليمي", owner: "أحمد حسن", plan: "الباقة الاحترافية", status: "active", joinDate: "2023-01-15", students: 450, expires: "2024-01-15" },
  { id: 2, name: "سنتر التفوق", owner: "محمود سعد", plan: "الباقة المتقدمة", status: "active", joinDate: "2023-03-22", students: 210, expires: "2024-03-22" },
  { id: 3, name: "أ. محمد محمود", owner: "محمد محمود", plan: "الباقة الأساسية", status: "suspended", joinDate: "2023-05-10", students: 45, expires: "2023-11-10" },
  { id: 4, name: "د. هدى صالح", owner: "هدى صالح", plan: "الباقة المتقدمة", status: "active", joinDate: "2023-08-05", students: 120, expires: "2024-08-05" },
  { id: 5, name: "مركز النخبة", owner: "كريم مجدي", plan: "الباقة الأساسية", status: "warning", joinDate: "2023-09-01", students: 100, expires: "2023-10-01" },
  { id: 6, name: "سنتر المستقبل", owner: "علي إبراهيم", plan: "الباقة الأساسية", status: "active", joinDate: "2023-10-15", students: 80, expires: "2024-10-15" },
  { id: 7, name: "أكاديمية العلوم", owner: "سعاد علي", plan: "الباقة المتقدمة", status: "active", joinDate: "2023-11-20", students: 300, expires: "2024-11-20" },
  { id: 8, name: "أ. خالد النجار", owner: "خالد النجار", plan: "الباقة الاحترافية", status: "warning", joinDate: "2023-12-05", students: 500, expires: "2024-01-05" },
];

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended" | "warning">("all");
  
  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // New teacher form state
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    owner: "",
    plan: "الباقة الأساسية"
  });

  const itemsPerPage = 5;

  // Filtering
  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchesSearch = t.name.includes(searchTerm) || t.owner.includes(searchTerm) || t.plan.includes(searchTerm);
      const matchesStatus = statusFilter === "all" ? true : t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [teachers, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(start, start + itemsPerPage);
  }, [filteredTeachers, currentPage]);

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...teachers.map(t => t.id)) + 1;
    const date = new Date().toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    
    setTeachers([{
      id: newId,
      name: newTeacher.name,
      owner: newTeacher.owner,
      plan: newTeacher.plan,
      status: "active",
      joinDate: date,
      students: 0,
      expires: nextYear.toISOString().split('T')[0]
    }, ...teachers]);
    
    setIsAddModalOpen(false);
    setNewTeacher({ name: "", owner: "", plan: "الباقة الأساسية" });
  };

  const toggleStatus = (id: number) => {
    setTeachers(teachers.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'suspended' ? 'active' : 'suspended' };
      }
      return t;
    }));
    setActiveDropdown(null);
  };

  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    setActiveDropdown(null);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsEditModalOpen(true);
    setActiveDropdown(null);
  };

  const handleEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    
    setTeachers(teachers.map(t => 
      t.id === editingTeacher.id ? editingTeacher : t
    ));
    
    setIsEditModalOpen(false);
    setEditingTeacher(null);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold"><CheckCircle2 size={14} /> نشط</span>;
      case 'suspended':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold"><XCircle size={14} /> موقوف</span>;
      case 'warning':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold"><AlertCircle size={14} /> قارب على الانتهاء</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">إدارة المدرسين والمراكز</h1>
          <p className="text-slate-500">إدارة حسابات المدرسين والمراكز، وتفعيل أو إيقاف اشتراكاتهم.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <UserPlus size={18} />
          إضافة عميل جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="ابحث بالاسم، المالك، أو الباقة..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 border px-4 h-11 rounded-xl font-semibold text-sm transition-colors ${
                statusFilter !== 'all' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={18} />
              تصفية
              {statusFilter !== 'all' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">1</span>
              )}
            </button>
            
            {/* Filter Dropdown */}
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-20 animate-in fade-in slide-in-from-top-2 duration-100">
                  <p className="text-xs font-bold text-slate-400 px-3 py-1 mb-1">حالة الحساب</p>
                  <button 
                    onClick={() => { setStatusFilter("all"); setIsFilterOpen(false); setCurrentPage(1); }}
                    className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "all" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    الكل
                  </button>
                  <button 
                    onClick={() => { setStatusFilter("active"); setIsFilterOpen(false); setCurrentPage(1); }}
                    className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "active" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    نشط فقط
                  </button>
                  <button 
                    onClick={() => { setStatusFilter("suspended"); setIsFilterOpen(false); setCurrentPage(1); }}
                    className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "suspended" ? "bg-rose-50 text-rose-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    موقوف فقط
                  </button>
                  <button 
                    onClick={() => { setStatusFilter("warning"); setIsFilterOpen(false); setCurrentPage(1); }}
                    className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "warning" ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    قارب على الانتهاء
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 text-sm font-bold text-slate-500">المركز / المدرس</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">الباقة الحالية</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">الحالة</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">عدد الطلاب</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">تاريخ الانتهاء</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500 w-16 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                    لا يوجد نتائج مطابقة للبحث
                  </td>
                </tr>
              ) : (
                paginatedTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-900">{teacher.name}</p>
                        <p className="text-xs font-medium text-slate-500">{teacher.owner}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                        {teacher.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(teacher.status)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-slate-700">{teacher.students} طالب</span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-500">
                      {teacher.expires}
                    </td>
                    <td className="py-4 px-4 text-center relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === teacher.id ? null : teacher.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === teacher.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveDropdown(null)} 
                          />
                          <div className="absolute left-4 top-12 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                            <button 
                              onClick={() => openEditModal(teacher)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Edit2 size={16} className="text-slate-400" />
                              تعديل البيانات
                            </button>
                            <button 
                              onClick={() => toggleStatus(teacher.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                              <Ban size={16} className="text-amber-500" />
                              {teacher.status === 'suspended' ? 'تفعيل الحساب' : 'إيقاف مؤقت'}
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button 
                              onClick={() => deleteTeacher(teacher.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 size={16} className="text-rose-500" />
                              حذف العميل
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              عرض {(currentPage - 1) * itemsPerPage + 1} إلى {Math.min(currentPage * itemsPerPage, filteredTeachers.length)} من إجمالي {filteredTeachers.length} عميل
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                السابق
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">إضافة عميل جديد</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">اسم المركز / المدرس</label>
                <input 
                  required
                  type="text" 
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  placeholder="مثال: سنتر الأمل"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">اسم المالك</label>
                <input 
                  required
                  type="text" 
                  value={newTeacher.owner}
                  onChange={(e) => setNewTeacher({...newTeacher, owner: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  placeholder="مثال: أحمد محمود"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">الباقة</label>
                <select 
                  value={newTeacher.plan}
                  onChange={(e) => setNewTeacher({...newTeacher, plan: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                >
                  <option>الباقة الأساسية</option>
                  <option>الباقة المتقدمة</option>
                  <option>الباقة الاحترافية</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  حفظ العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">تعديل بيانات العميل</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditTeacher} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">اسم المركز / المدرس</label>
                <input 
                  required
                  type="text" 
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">اسم المالك</label>
                <input 
                  required
                  type="text" 
                  value={editingTeacher.owner}
                  onChange={(e) => setEditingTeacher({...editingTeacher, owner: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">الباقة</label>
                <select 
                  value={editingTeacher.plan}
                  onChange={(e) => setEditingTeacher({...editingTeacher, plan: e.target.value})}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                >
                  <option>الباقة الأساسية</option>
                  <option>الباقة المتقدمة</option>
                  <option>الباقة الاحترافية</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  تحديث البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
