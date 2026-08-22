"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, BookOpen, Download, FileText, Medal, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  const topStudents = [
    { id: 1, name: "أحمد محمد علي", grade: "99.5%", group: "مجموعة الكيمياء", avatar: "أ" },
    { id: 2, name: "سارة محمود", grade: "98.2%", group: "مجموعة الفيزياء", avatar: "س" },
    { id: 3, name: "يوسف أحمد", grade: "97.8%", group: "الرياضيات المتقدمة", avatar: "ي" },
    { id: 4, name: "فاطمة خالد", grade: "96.5%", group: "مجموعة الكيمياء", avatar: "ف" },
  ];

  const reports = [
    { title: "تقرير الحضور والغياب الشهري", desc: "سجل مفصل لحضور وغياب الطلاب في جميع المجموعات.", type: "PDF", size: "2.4 MB" },
    { title: "التقرير المالي للربع الأول", desc: "ملخص الإيرادات والمصروفات والمدفوعات المعلقة.", type: "Excel", size: "1.1 MB" },
    { title: "تقييم أداء الطلاب العام", desc: "درجات الاختبارات والتقييمات المستمرة.", type: "PDF", size: "4.5 MB" },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#001c56] mb-2 tracking-tight">التقارير والإحصائيات</h1>
          <p className="text-gray-500 font-medium">تحليل شامل لبيانات الأكاديمية وأداء الطلاب</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="ابحث في التقارير..." 
              className="w-full h-11 rounded-xl border border-gray-200 bg-white pr-10 pl-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all"
            />
          </div>
          <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-gray-200 text-gray-600 shrink-0">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -left-6 -top-6 text-blue-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <Users size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#001c56] flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <p className="text-gray-500 font-bold text-sm mb-1">إجمالي الطلاب المسجلين</p>
            <p className="text-3xl font-black text-[#001c56]">1,240</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -left-6 -top-6 text-green-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
              <TrendingUp size={24} />
            </div>
            <p className="text-gray-500 font-bold text-sm mb-1">متوسط الحضور العام</p>
            <p className="text-3xl font-black text-[#001c56]">85%</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -left-6 -top-6 text-purple-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <BookOpen size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <BookOpen size={24} />
            </div>
            <p className="text-gray-500 font-bold text-sm mb-1">نسبة إنجاز المناهج</p>
            <p className="text-3xl font-black text-[#001c56]">62%</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -left-6 -top-6 text-amber-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <Medal size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Medal size={24} />
            </div>
            <p className="text-gray-500 font-bold text-sm mb-1">معدل النجاح المتوقع</p>
            <p className="text-3xl font-black text-[#001c56]">94%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Students */}
        <div className="lg:col-span-1 bg-gradient-to-b from-[#001c56] to-blue-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Medal size={150} />
          </div>
          <h2 className="text-xl font-black mb-6 relative z-10 flex items-center gap-2">
            <Medal size={24} className="text-yellow-400" /> لوحة الشرف
          </h2>
          <div className="space-y-4 relative z-10">
            {topStudents.map((student, idx) => (
              <div key={student.id} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#001c56] font-black flex items-center justify-center text-sm shadow-inner">
                    {student.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{student.name}</p>
                    <p className="text-xs text-blue-200">{student.group}</p>
                  </div>
                </div>
                <div className="bg-yellow-400 text-yellow-900 font-black text-sm px-2 py-1 rounded-lg">
                  {student.grade}
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border-transparent font-bold">
            عرض كل الطلاب
          </Button>
        </div>

        {/* Exportable Reports */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-black text-[#001c56]">تقارير جاهزة للتصدير</h2>
            <Button variant="link" className="text-[var(--primary)] font-bold text-sm">تخصيص تقرير جديد</Button>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {reports.map((report, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${report.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#001c56] text-sm md:text-base">{report.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{report.desc}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-bold text-gray-400">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{report.type}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button className="shrink-0 bg-gray-50 hover:bg-[#001c56] hover:text-white text-[#001c56] border border-gray-200 hover:border-transparent font-bold h-10 px-4 rounded-xl transition-colors gap-2">
                  <Download size={16} />
                  تحميل
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
