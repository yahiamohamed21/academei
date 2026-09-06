"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/lib/hooks/use-auth";
import { useStudents, useCreateStudent } from "@/lib/hooks/use-students";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGroups } from "@/lib/hooks/use-groups";
import { useSuspendStudentAdministrative, useReactivateStudent } from "@/lib/hooks/use-student";
import { 
  UserPlus, 
  Search, 
  ChevronDown,
  Edit2,
  Eye,
  SearchX,
  CheckSquare,
  Square,
  X,
  User,
  TriangleAlert,
  XCircle,
  Loader2
} from "lucide-react";

const statusOptions = [
  'نشط ومستمر',
  'موقوف مؤقتاً (إدارياً)',
  'موقوف لعدم سداد المصروفات',
  'متخرج / أكمل الكورسات'
];

const subscriptionOptions = [
  'اشتراك سنوي - أساسي',
  'اشتراك نصف سنوي - ترم أول',
  'اشتراك شهري - متجدد',
  'باقة المراجعة النهائية',
  'اشتراك منتهي الصلاحية'
];

export default function StudentsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownSearch, setDropdownSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<'group' | 'status' | 'subscription' | null>(null);

  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  
  // Quick View & Suspension State
  const [quickViewStudent, setQuickViewStudent] = useState<any | null>(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  // Add Student State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newNationalId, setNewNationalId] = useState("");
  const [newStudentCode, setNewStudentCode] = useState("");
  const [newGradeLevelId, setNewGradeLevelId] = useState("");
  const [newBranchId, setNewBranchId] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const { data: studentsData = [], isLoading, isError } = useStudents({ tenantId });
  const { data: gradeLevels = [] } = useGradeLevels(tenantId);
  const { data: branches = [] } = useBranches(tenantId);
  const { data: groupsData } = useGroups({ tenantId });

  const createStudentMutation = useCreateStudent();
  const suspendMutation = useSuspendStudentAdministrative();
  const reactivateMutation = useReactivateStudent();

  const groupOptions = useMemo(() => {
    return groupsData?.items?.map(g => g.name) || [
      'مجموعة الرياضيات - أولى ثانوي',
      'مجموعة الفيزياء - ثانية ثانوي',
      'مجموعة الكيمياء - ثالثة ثانوي'
    ];
  }, [groupsData]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !newFullName || !newNationalId || !newBranchId || !newGradeLevelId) return;

    try {
      await createStudentMutation.mutateAsync({
        tenantId,
        body: {
          fullName: newFullName,
          nationalId: newNationalId,
          studentCode: newStudentCode || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
          branchId: newBranchId,
          gradeLevelId: newGradeLevelId,
          enrollmentDate: new Date().toISOString().split("T")[0],
          phoneNumber: newPhoneNumber || null,
          photoUrl: null,
        },
      });
      setIsAddStudentOpen(false);
      setNewFullName("");
      setNewNationalId("");
      setNewStudentCode("");
      setNewPhoneNumber("");
    } catch (err: any) {
      alert(err?.message || "حدث خطأ أثناء إضافة الطالب");
    }
  };

  const handleToggleSuspension = async (student: any) => {
    if (!tenantId || !student?.id) return;
    try {
      if (student.status === 1) {
        await suspendMutation.mutateAsync({ tenantId, studentId: student.id });
      } else {
        await reactivateMutation.mutateAsync({ tenantId, studentId: student.id });
      }
      setIsSuspendModalOpen(false);
      setQuickViewStudent(null);
    } catch (err: any) {
      alert(err?.message || "حدث خطأ أثناء تغيير حالة الطالب");
    }
  };
  
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student: any) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        (student.fullName || '').toLowerCase().includes(q) || 
        (student.studentCode || '').toLowerCase().includes(q) || 
        (student.id || '').toLowerCase().includes(q);
      
      const statusText = student.status === 1 ? 'نشط ومستمر' : 'موقوف مؤقتاً (إدارياً)';
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(statusText);
      
      return matchesSearch && matchesStatus;
    });
  }, [studentsData, searchQuery, selectedStatuses]);

  const showEmptyState = filteredStudents.length === 0;

  const toggleSelection = (option: string, selectedList: string[], setList: (val: string[]) => void) => {
    if (selectedList.includes(option)) {
      setList(selectedList.filter(o => o !== option));
    } else {
      setList([...selectedList, option]);
    }
  };

  const removeTag = (option: string, type: 'group' | 'status' | 'subscription') => {
    if (type === 'group') setSelectedGroups(selectedGroups.filter(o => o !== option));
    if (type === 'status') setSelectedStatuses(selectedStatuses.filter(o => o !== option));
    if (type === 'subscription') setSelectedSubscriptions(selectedSubscriptions.filter(o => o !== option));
  };

  const clearAllFilters = () => {
    setSelectedGroups([]);
    setSelectedStatuses([]);
    setSelectedSubscriptions([]);
    setSearchQuery("");
  };

  const handleDropdownOpen = (key: 'group' | 'status' | 'subscription') => {
    if (activeFilter === key) {
      setActiveFilter(null);
    } else {
      setActiveFilter(key);
      setDropdownSearch(""); 
    }
  };

  const renderDropdown = (
    label: string, 
    filterKey: 'group' | 'status' | 'subscription', 
    options: string[], 
    selectedList: string[], 
    setList: (val: string[]) => void
  ) => {
    const isOpen = activeFilter === filterKey;
    const filteredOptions = options.filter(opt => opt.toLowerCase().includes(dropdownSearch.toLowerCase()));
    
    return (
      <div className="relative">
        <Button 
          onClick={() => handleDropdownOpen(filterKey)}
          variant="outline" 
          className={`bg-white text-gray-700 h-12 px-5 rounded-xl font-bold border-gray-200 hover:border-gray-300 gap-2 ${selectedList.length > 0 ? 'border-[var(--primary)] text-[var(--primary)] bg-blue-50/50' : ''}`}
        >
          {label}
          {selectedList.length > 0 && (
            <span className="bg-[var(--primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ml-1">
              {selectedList.length}
            </span>
          )}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-20 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={dropdownSearch}
                  onChange={(e) => setDropdownSearch(e.target.value)}
                  placeholder="بحث..." 
                  className="w-full text-sm bg-gray-50 rounded-lg h-9 pr-9 pl-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" 
                />
              </div>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto mb-3">
              {filteredOptions.length > 0 ? filteredOptions.map(option => (
                <label key={option} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group/item">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={selectedList.includes(option)}
                      onChange={() => toggleSelection(option, selectedList, setList)}
                    />
                    {selectedList.includes(option) ? (
                      <CheckSquare className="text-[var(--primary)] shrink-0" size={18} />
                    ) : (
                      <Square className="text-gray-300 peer-hover:text-[var(--primary)] transition-colors shrink-0" size={18} />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 font-medium leading-tight">{option}</span>
                </label>
              )) : (
                <div className="text-center text-sm text-gray-500 py-4">لا توجد خيارات مطابقة</div>
              )}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                onClick={() => setList([])} 
                className="text-sm text-gray-500 hover:text-gray-900 font-medium"
              >
                مسح
              </button>
              <button 
                onClick={() => setList([...options])} 
                className="text-sm text-[var(--primary)] font-bold hover:underline"
              >
                تحديد الكل
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--primary)] mb-2 tracking-tight">الطلاب</h1>
          <p className="text-gray-500 font-medium">إدارة بيانات ومتابعة سجلات الطلاب والمجموعات</p>
        </div>
        <Button 
          onClick={() => setIsAddStudentOpen(true)}
          className="bg-[var(--primary)] text-white gap-2 h-12 px-6 rounded-xl shadow-md w-full md:w-auto"
        >
          <UserPlus size={18} />
          إضافة طالب
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-bold mb-2">إجمالي الطلاب</p>
          <div className="flex items-end justify-center gap-3">
            <span className="text-4xl font-black text-[var(--primary)]">{studentsData.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-bold mb-2">الطلاب النشطين</p>
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-4xl font-black text-[var(--primary)]">{studentsData.filter((s: any) => s.status === 1).length}</span>
            <span className="text-gray-400 text-xs font-bold">{studentsData.filter((s: any) => s.status !== 1).length} غير نشط</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-bold mb-2">الحسابات الموقوفة</p>
          <div className="flex items-end justify-center gap-3">
            <span className="text-4xl font-black text-red-500">{studentsData.filter((s: any) => s.status !== 1).length}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-bold mb-2">المسجلون مؤخراً</p>
          <div className="flex items-end justify-center gap-3">
            <span className="text-4xl font-black text-[var(--primary)]">{studentsData.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Filters and Search Bar */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 flex-1 w-full">
              {renderDropdown("الفرقة / المجموعة", "group", groupOptions, selectedGroups, setSelectedGroups)}
              {renderDropdown("حالة الطالب", "status", statusOptions, selectedStatuses, setSelectedStatuses)}
              {renderDropdown("حالة الاشتراك", "subscription", subscriptionOptions, selectedSubscriptions, setSelectedSubscriptions)}
              
              <Button variant="outline" className="bg-white text-gray-700 h-12 px-5 rounded-xl font-bold border-gray-200 hover:border-gray-300 gap-2">
                الدفع <ChevronDown size={16} />
              </Button>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم أو الرقم... (اكتب 'empty' للتجربة)"
                className="w-full h-12 rounded-xl border border-gray-200 bg-white pr-12 pl-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all shadow-sm"
              />
            </div>

          </div>
          
          {/* Active Filters Tags */}
          {(selectedGroups.length > 0 || selectedStatuses.length > 0 || selectedSubscriptions.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-bold self-center">الفلاتر النشطة:</span>
              
              {selectedGroups.map((option: string) => (
                <span key={option} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                  {option}
                  <button onClick={() => removeTag(option, 'group')} className="hover:text-red-500 font-black ml-1 transition-colors">×</button>
                </span>
              ))}
              
              {selectedStatuses.map((option: string) => (
                <span key={option} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 rounded-lg text-xs font-bold">
                  {option}
                  <button onClick={() => removeTag(option, 'status')} className="hover:text-red-500 font-black ml-1 transition-colors">×</button>
                </span>
              ))}
              
              {selectedSubscriptions.map((option: string) => (
                <span key={option} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                  {option}
                  <button onClick={() => removeTag(option, 'subscription')} className="hover:text-red-500 font-black ml-1 transition-colors">×</button>
                </span>
              ))}

              <button 
                onClick={clearAllFilters}
                className="text-xs text-gray-400 hover:text-gray-700 font-bold mr-2 underline"
              >
                مسح الكل
              </button>
            </div>
          )}
        </div>

        {/* Data Area */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 font-medium">جاري التحميل...</div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500 font-medium">حدث خطأ أثناء جلب البيانات</div>
        ) : showEmptyState ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500">
            <div className="relative w-64 h-64 bg-[#f8f9fa] rounded-[2.5rem] flex items-center justify-center mb-8 overflow-hidden">
              <Image 
                src="/search_result.jpeg" 
                alt="لا توجد نتائج" 
                fill 
                className="object-contain p-4" 
              />
            </div>
            <h3 className="text-[28px] font-black text-[#0f172a] mb-4">لا توجد نتائج مطابقة لبحثك</h3>
            <p className="text-[#64748b] text-base font-medium mb-8 max-w-lg mx-auto leading-relaxed">
              لم نتمكن من العثور على طلاب مطابقين لخيارات الفلترة الحالية (الفرقة، الحالة، أو المجموعات). جرب تغيير الفلاتر أو إعادة ضبطها.
            </p>
            <Button onClick={clearAllFilters} className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 h-12 rounded-xl text-base gap-2 font-bold shadow-md">
              <span className="mb-0.5">إعادة ضبط الفلاتر</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.013 3 22 3v2l-7.19 8.36"/>
                <path d="M22 22 2 2"/>
                <path d="M11 12 2.72 2.6A2 2 0 0 1 4 2h4.5"/>
                <path d="m14 14-.38.45A2 2 0 0 1 12 15h-1a2 2 0 0 1-1.62-.85L5 8.37V22h4v-7"/>
              </svg>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 font-bold text-gray-600">الطالب</th>
                  <th className="py-4 px-6 font-bold text-gray-600">الفرقة/الصف</th>
                  <th className="py-4 px-6 font-bold text-gray-600">تفاصيل الاشتراك</th>
                  <th className="py-4 px-6 font-bold text-gray-600">الحالة</th>
                  <th className="py-4 px-6 font-bold text-gray-600">آخر نشاط</th>
                  <th className="py-4 px-6 font-bold text-gray-600 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                
                {filteredStudents.map((student: any) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                          {student.photoUrl ? (
                            <Image src={student.photoUrl} alt={student.fullName} fill className="object-cover" />
                          ) : (
                            <User size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{student.fullName}</p>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">كود: {student.studentCode || student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">--</td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900">--</p>
                      <p className="text-xs text-gray-500 mt-0.5">الالتحاق: {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : '--'}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border 
                        ${student.status === 1 ? 'bg-blue-50 text-[var(--primary)] border-blue-100' : 
                          'bg-red-50 text-red-600 border-red-100'}`}>
                        {student.status === 1 ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-medium text-xs">--</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setQuickViewStudent(student)}
                          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <Link href={`/students/${student.id}/edit`} className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></Link>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!showEmptyState && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors" disabled>
                <span className="sr-only">Previous</span>
                <span aria-hidden="true">&raquo;</span>
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--primary)] text-white font-bold shadow-sm">1</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 transition-colors">3</button>
              <span className="px-1 text-gray-400">...</span>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <span className="sr-only">Next</span>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </div>
            <div className="text-sm font-semibold text-gray-500">
              عرض {filteredStudents.length} طلاب
            </div>
          </div>
        )}

      </div>

      {/* Quick View Drawer */}
      {quickViewStudent && typeof document !== 'undefined' && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
            onClick={() => setQuickViewStudent(null)}
          />
          <div className="fixed top-0 left-0 h-full w-[360px] bg-white z-[60] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header / Banner */}
            <div className="bg-[#1e3a8a] text-white pt-6 pb-16 px-6 relative rounded-br-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">عرض سريع للطالب</h2>
                <button 
                  onClick={() => setQuickViewStudent(null)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 flex flex-col items-center -mt-12">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-100 shadow-md flex items-center justify-center text-2xl font-bold text-gray-500 mb-3">
                {quickViewStudent.photoUrl ? (
                  <Image src={quickViewStudent.photoUrl} alt={quickViewStudent.fullName} fill className="object-cover" />
                ) : (
                  <User size={32} />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{quickViewStudent.fullName}</h3>
              <p className="text-gray-500 text-sm font-medium mb-3">كود: {quickViewStudent.studentCode || quickViewStudent.id}</p>
              
              <div className="flex items-center gap-2 bg-blue-50 text-gray-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {quickViewStudent.status === 1 ? 'نشط' : 'غير نشط'}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              
              {/* Academic Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-center gap-2 before:h-px before:flex-1 before:bg-gray-100 after:h-px after:flex-1 after:bg-gray-100">
                  المعلومات الأكاديمية
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-[10px] text-gray-500 mb-1 font-bold">الهاتف</p>
                    <p className="font-bold text-gray-900 text-sm">{quickViewStudent.phoneNumber || '--'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-[10px] text-gray-500 mb-1 font-bold">الرقم القومي</p>
                    <p className="font-bold text-gray-900 text-sm">{quickViewStudent.nationalId || '--'}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-[10px] text-gray-500 mb-1 font-bold">الالتحاق</p>
                  <p className="font-bold text-gray-900 text-sm">
                    {quickViewStudent.enrollmentDate ? new Date(quickViewStudent.enrollmentDate).toLocaleDateString() : '--'}
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center justify-center gap-2 before:h-px before:flex-1 before:bg-gray-100 after:h-px after:flex-1 after:bg-gray-100">
                  سجل النشاط الأخير
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 relative">
                    <div className="absolute top-2 bottom-[-16px] right-[7px] w-px bg-gray-200" />
                    <div className="relative z-10 w-4 h-4 rounded-full bg-[#1e3a8a] mt-1 shrink-0 ring-4 ring-white" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">حضور محاضرة الرياضيات الهندسية</p>
                      <p className="text-xs text-gray-500 mt-1">اليوم - 10:30 ص</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="relative z-10 w-4 h-4 rounded-full bg-gray-300 mt-1 shrink-0 ring-4 ring-white" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">تسليم تكليف التصميم</p>
                      <p className="text-xs text-gray-500 mt-1">أمس - 08:15 م</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 bg-white space-y-3">
              <Link href={`/students/${quickViewStudent.id}`} className="block w-full">
                <Button className="w-full h-12 bg-[#001c56] hover:bg-[#001033] text-white gap-2 font-bold text-base rounded-xl">
                  <User size={18} />
                  عرض الملف الشخصي
                </Button>
              </Link>
              <Button 
                onClick={() => setIsSuspendModalOpen(true)}
                variant="outline" 
                className="w-full h-12 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200 gap-2 font-bold text-base rounded-xl"
              >
                <XCircle size={18} />
                إيقاف
              </Button>
            </div>
          </div>
          
          {/* Suspend Confirmation Modal */}
          {isSuspendModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsSuspendModalOpen(false)} />
              
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                    <TriangleAlert size={32} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">هل أنت متأكد من إيقاف حساب الطالب؟</h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    سيتم تعليق وصول الطالب للمحتوى الأكاديمي والمنصة مؤقتاً حتى يتم إعادة التفعيل يدوياً.
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 w-full flex items-center justify-between mb-8 border border-gray-100">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{quickViewStudent.fullName}</p>
                      <p className="text-xs text-gray-500 mt-1">{quickViewStudent.id}</p>
                    </div>
                    <div className="text-left text-xs font-bold text-gray-500 space-y-1">
                      <p>الطالب:</p>
                      <p>المعرف:</p>
                    </div>
                  </div>
                  
                  <div className="flex w-full gap-3">
                    <Button 
                      onClick={() => setIsSuspendModalOpen(false)}
                      variant="outline" 
                      className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      تراجع
                    </Button>
                    <Button className="flex-1 h-12 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold">
                      تأكيد الإيقاف
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>,
        document.body
      )}

      {/* Add Student Drawer (Left side) */}
      {isAddStudentOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
            onClick={() => setIsAddStudentOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[400px] bg-white z-[60] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="pt-8 pb-6 px-8 relative border-b border-gray-100">
              <button 
                onClick={() => setIsAddStudentOpen(false)}
                className="absolute top-8 left-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black text-[#1e3a8a] mb-2">إضافة طالب جديد</h2>
              <p className="text-gray-500 text-xs font-medium">أدخل بيانات الطالب الأكاديمية والشخصية لإنشاء سجل جديد في النظام.</p>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
              
              <form onSubmit={handleCreateStudent} className="space-y-8">
                {/* Section 1: Personal Data */}
                <div>
                  <h4 className="text-[#1e3a8a] font-black text-sm mb-4">البيانات الشخصية</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">الاسم الرباعي *</label>
                      <input 
                        type="text" 
                        required
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        placeholder="أدخل اسم الطالب الكامل" 
                        className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">الرقم القومي / المعرف *</label>
                      <input 
                        type="text" 
                        required
                        value={newNationalId}
                        onChange={(e) => setNewNationalId(e.target.value)}
                        placeholder="أدخل رقم الهوية" 
                        className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">رقم الهاتف</label>
                      <input 
                        type="text" 
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                        placeholder="أدخل رقم الهاتف" 
                        className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Section 2: Academic Distribution */}
                <div>
                  <h4 className="text-[#1e3a8a] font-black text-sm mb-4">التوزيع الأكاديمي</h4>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-xs font-bold text-gray-500">الصف الدراسي *</label>
                      <div className="relative">
                        <select 
                          required
                          value={newGradeLevelId}
                          onChange={(e) => setNewGradeLevelId(e.target.value)}
                          className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                        >
                          <option value="">اختر الصف</option>
                          {gradeLevels.map((gl: any) => (
                            <option key={gl.id} value={gl.id}>{gl.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-xs font-bold text-gray-500">الفرع *</label>
                      <div className="relative">
                        <select 
                          required
                          value={newBranchId}
                          onChange={(e) => setNewBranchId(e.target.value)}
                          className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                        >
                          <option value="">اختر الفرع</option>
                          {branches.map((b: any) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-100 bg-white flex gap-3">
                  <Button 
                    type="button"
                    onClick={() => setIsAddStudentOpen(false)}
                    variant="outline" 
                    className="w-1/3 h-12 bg-blue-50 text-[var(--primary)] hover:bg-blue-100 border-transparent font-bold text-sm rounded-xl"
                  >
                    إلغاء
                  </Button>
                  <Button 
                    type="submit"
                    disabled={createStudentMutation.isPending}
                    className="w-2/3 h-12 bg-[#001c56] hover:bg-[#001033] text-white font-bold text-sm rounded-xl gap-2"
                  >
                    {createStudentMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : null}
                    حفظ وإنشاء السجل
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
