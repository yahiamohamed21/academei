"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight
} from "lucide-react";

type Transaction = {
  id: string;
  center: string;
  plan: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "new" | "renewal";
};

const mockTransactions: Transaction[] = [
  { id: "TRX-1092", center: "مركز الأوائل التعليمي", plan: "الباقة الاحترافية", amount: "1,500 ج.م", date: "24 أغسطس 2026", status: "completed", type: "renewal" },
  { id: "TRX-1091", center: "أ. محمد محمود (فيزياء)", plan: "الباقة الأساسية", amount: "500 ج.م", date: "24 أغسطس 2026", status: "completed", type: "new" },
  { id: "TRX-1090", center: "سنتر التفوق", plan: "الباقة المتقدمة", amount: "1,000 ج.م", date: "23 أغسطس 2026", status: "pending", type: "renewal" },
  { id: "TRX-1089", center: "د. هدى صالح (أحياء)", plan: "الباقة المتقدمة", amount: "1,000 ج.م", date: "23 أغسطس 2026", status: "completed", type: "new" },
  { id: "TRX-1088", center: "مركز النور", plan: "الباقة الأساسية", amount: "500 ج.م", date: "21 أغسطس 2026", status: "failed", type: "renewal" },
  { id: "TRX-1087", center: "أكاديمية العلوم", plan: "الباقة الاحترافية", amount: "1,500 ج.م", date: "20 أغسطس 2026", status: "completed", type: "new" },
  { id: "TRX-1086", center: "سنتر المستقبل", plan: "الباقة الأساسية", amount: "500 ج.م", date: "19 أغسطس 2026", status: "completed", type: "renewal" },
];

export default function AdminFinancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "new" | "renewal">("all");

  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(trx => {
      const matchesSearch = trx.id.includes(searchTerm) || trx.center.includes(searchTerm) || trx.plan.includes(searchTerm);
      const matchesStatus = statusFilter === "all" ? true : trx.status === statusFilter;
      const matchesType = typeFilter === "all" ? true : trx.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handleExport = () => {
    // Generate dummy CSV
    const headers = ["رقم المعاملة", "المركز / المدرس", "النوع", "المبلغ", "التاريخ", "الحالة"];
    
    const translateStatus = (s: string) => {
      switch(s) {
        case 'completed': return 'مكتمل';
        case 'pending': return 'قيد المراجعة';
        case 'failed': return 'فشل الدفع';
        default: return s;
      }
    };

    const translateType = (t: string) => {
      return t === 'new' ? 'اشتراك جديد' : 'تجديد باقة';
    };

    const rows = filteredTransactions.map(trx => {
      // Escape quotes and wrap in quotes to prevent comma splitting
      const row = [
        `"${trx.id}"`, 
        `"${trx.center} (${trx.plan})"`, 
        `"${translateType(trx.type)}"`, 
        `"${trx.amount}"`, 
        `"${trx.date}"`, 
        `"${translateStatus(trx.status)}"`
      ];
      return row.join(",");
    });
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold"><CheckCircle2 size={14} /> مكتمل</span>;
      case 'pending':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold"><Clock size={14} /> قيد المراجعة</span>;
      case 'failed':
        return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold"><XCircle size={14} /> فشل الدفع</span>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'new' 
      ? <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">اشتراك جديد</span>
      : <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">تجديد باقة</span>;
  }

  const activeFiltersCount = (statusFilter !== "all" ? 1 : 0) + (typeFilter !== "all" ? 1 : 0);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">المالية والاشتراكات</h1>
          <p className="text-slate-500">متابعة كافة المعاملات المالية، وتجديدات الباقات والاشتراكات الجديدة.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Download size={18} />
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">إيرادات هذا الشهر</p>
            <h3 className="text-2xl font-black text-slate-900">45,200 ج.م</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <ArrowUpRight size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">الاشتراكات النشطة</p>
            <h3 className="text-2xl font-black text-slate-900">142</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">معاملات قيد المراجعة</p>
            <h3 className="text-2xl font-black text-slate-900">5</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
            <Clock size={24} />
          </div>
        </div>
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
              placeholder="ابحث برقم المعاملة، أو المركز..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 border px-4 h-11 rounded-xl font-semibold text-sm transition-colors ${
                activeFiltersCount > 0 ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={18} />
              تصفية
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">{activeFiltersCount}</span>
              )}
            </button>
            
            {/* Filter Dropdown */}
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-20 animate-in fade-in slide-in-from-top-2 duration-100">
                  
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-400 mb-2">حالة المعاملة</p>
                    <div className="space-y-1">
                      <button 
                        onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "all" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        الكل
                      </button>
                      <button 
                        onClick={() => { setStatusFilter("completed"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "completed" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        مكتملة
                      </button>
                      <button 
                        onClick={() => { setStatusFilter("pending"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "pending" ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        قيد المراجعة
                      </button>
                      <button 
                        onClick={() => { setStatusFilter("failed"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${statusFilter === "failed" ? "bg-rose-50 text-rose-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        فشل الدفع
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-2"></div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-2">نوع الاشتراك</p>
                    <div className="space-y-1">
                      <button 
                        onClick={() => { setTypeFilter("all"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${typeFilter === "all" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        الكل
                      </button>
                      <button 
                        onClick={() => { setTypeFilter("new"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${typeFilter === "new" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        اشتراك جديد
                      </button>
                      <button 
                        onClick={() => { setTypeFilter("renewal"); setCurrentPage(1); }}
                        className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${typeFilter === "renewal" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        تجديد باقة
                      </button>
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 text-sm font-bold text-slate-500">رقم المعاملة</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">المركز / المدرس</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">النوع</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">المبلغ</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">التاريخ</th>
                <th className="py-4 px-4 text-sm font-bold text-slate-500">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                    لا يوجد معاملات مطابقة للبحث
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((trx) => (
                  <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-700 text-sm">{trx.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{trx.center}</p>
                        <p className="text-xs font-medium text-slate-500">{trx.plan}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getTypeBadge(trx.type)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-black text-slate-900">{trx.amount}</span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-500">
                      {trx.date}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(trx.status)}
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
              عرض {(currentPage - 1) * itemsPerPage + 1} إلى {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} من إجمالي {filteredTransactions.length} معاملة
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
    </div>
  );
}
