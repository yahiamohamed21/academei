"use client";

import React from "react";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Download, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FinancePage() {
  const stats = [
    { label: "إجمالي الإيرادات (هذا الشهر)", value: "124,500 ج.م", trend: "+12.5%", isUp: true, icon: Wallet, color: "text-green-600", bg: "bg-green-50" },
    { label: "المدفوعات المعلقة", value: "14,200 ج.م", trend: "-2.4%", isUp: false, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "إجمالي المصروفات", value: "32,100 ج.م", trend: "+5.1%", isUp: true, icon: CreditCard, color: "text-red-600", bg: "bg-red-50" },
  ];

  const transactions = [
    { id: "TRX-001", student: "أحمد محمد علي", amount: "1,200 ج.م", date: "20 أغسطس 2026", status: "ناجح", method: "فيزا" },
    { id: "TRX-002", student: "سارة محمود", amount: "800 ج.م", date: "19 أغسطس 2026", status: "معلق", method: "تحويل بنكي" },
    { id: "TRX-003", student: "عمر خالد", amount: "1,200 ج.م", date: "18 أغسطس 2026", status: "ناجح", method: "مدى" },
    { id: "TRX-004", student: "فاطمة علي", amount: "450 ج.م", date: "18 أغسطس 2026", status: "مرفوض", method: "أبل باي" },
    { id: "TRX-005", student: "يوسف أحمد", amount: "1,200 ج.م", date: "17 أغسطس 2026", status: "ناجح", method: "فيزا" },
  ];

  // Dummy data for simple CSS chart (percentages representing height)
  const chartData = [
    { month: "يناير", value: 40 },
    { month: "فبراير", value: 65 },
    { month: "مارس", value: 55 },
    { month: "أبريل", value: 80 },
    { month: "مايو", value: 70 },
    { month: "يونيو", value: 95 },
    { month: "يوليو", value: 85 },
    { month: "أغسطس", value: 100 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#001c56] mb-2 tracking-tight">الإدارة المالية</h1>
          <p className="text-gray-500 font-medium">متابعة الإيرادات، المصروفات، وحالة المدفوعات</p>
        </div>
        <Button className="bg-[#001c56] hover:bg-[#001033] text-white gap-2 h-11 px-6 rounded-xl shadow-md font-bold">
          <Download size={18} />
          تصدير التقرير المالي
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span dir="ltr">{stat.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-[#001c56]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-[#001c56] mb-8">تحليل الإيرادات (2026)</h2>
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 pt-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-3 flex-1 group">
                {/* Tooltip equivalent (visible on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded absolute -mt-10 pointer-events-none">
                  {data.value}%
                </div>
                {/* Bar */}
                <div className="w-full bg-gray-100 rounded-t-xl overflow-hidden relative flex-1 flex items-end">
                  <div 
                    className="w-full bg-[#001c56] rounded-t-xl group-hover:bg-blue-600 transition-colors duration-300" 
                    style={{ height: `${data.value}%` }} 
                  />
                </div>
                {/* Label */}
                <span className="text-xs font-bold text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions or Summary */}
        <div className="bg-gradient-to-br from-[#001c56] to-blue-900 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black mb-2">رصيد الحساب المتاح</h3>
            <p className="text-blue-200 text-sm font-medium mb-6">يتم تحديث الرصيد تلقائياً بعد تأكيد عمليات الدفع.</p>
            <p className="text-5xl font-black mb-8">452,000 <span className="text-2xl font-bold">ج.م</span></p>
          </div>
          <div className="space-y-3">
            <Button className="w-full bg-white text-[#001c56] hover:bg-gray-50 h-12 rounded-xl font-bold text-sm">سحب الأموال</Button>
            <Button variant="outline" className="w-full border-blue-400 text-white hover:bg-blue-800/50 h-12 rounded-xl font-bold text-sm">إدارة الحسابات البنكية</Button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-black text-[#001c56]">أحدث المعاملات</h2>
          <Button variant="link" className="text-[var(--primary)] font-bold text-sm">عرض السجل الكامل</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">رقم المعاملة</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">الطالب</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">التاريخ</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">طريقة الدفع</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">المبلغ</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors bg-white">
                  <td className="py-4 px-6 text-sm font-bold text-gray-500" dir="ltr">{trx.id}</td>
                  <td className="py-4 px-6 text-sm font-bold text-[#001c56]">{trx.student}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">{trx.date}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">{trx.method}</td>
                  <td className="py-4 px-6 text-sm font-black text-gray-900">{trx.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold 
                      ${trx.status === 'ناجح' ? 'bg-green-50 text-green-700' : 
                        trx.status === 'معلق' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}
                    >
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
