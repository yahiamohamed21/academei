"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  Wallet, 
  AlertTriangle, 
  Users,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const allTransactions = [
  { id: 1, student: "أحمد محمد عبدالله", type: "قسط دراسي", amount: 4500, date: "12 أكتوبر 2023", status: "مكتملة", statusColor: "bg-blue-50 text-blue-600" },
  { id: 2, student: "فهد عبدالرحمن", type: "قسط دراسي", amount: 4500, date: "10 أكتوبر 2023", status: "فاشلة", statusColor: "bg-red-50 text-red-500" },
  { id: 3, student: "نورة سعد القحطاني", type: "نشاطات لاصفية", amount: 250, date: "09 أكتوبر 2023", status: "مكتملة", statusColor: "bg-blue-50 text-blue-600" },
  { id: 4, student: "سارة خالد العتيبي", type: "رسوم تسجيل", amount: 1200, date: "11 أكتوبر 2023", status: "قيد الانتظار", statusColor: "bg-gray-100 text-gray-600" },
  { id: 5, student: "عمر زيدان", type: "قسط دراسي", amount: 4500, date: "08 أكتوبر 2023", status: "مكتملة", statusColor: "bg-blue-50 text-blue-600" },
  { id: 6, student: "ليلى الدوسري", type: "رسوم تسجيل", amount: 1200, date: "05 أكتوبر 2023", status: "مكتملة", statusColor: "bg-blue-50 text-blue-600" },
  { id: 7, student: "عبدالله السالم", type: "نشاطات لاصفية", amount: 300, date: "01 أكتوبر 2023", status: "قيد الانتظار", statusColor: "bg-gray-100 text-gray-600" },
];

const statsData = {
  "سنوي": { revenues: "14,940,000", revenuesChange: "+ 25% مقارنة بالعام السابق", payments: "5,420,000", paymentsElec: "65%", paymentsCash: "35%", outstanding: "1,540,000", outStudents: "850", subs: "34,140", subsProgress: "92%" },
  "شهري": { revenues: "1,245,000", revenuesChange: "+ 12% مقارنة بالشهر السابق", payments: "452,300", paymentsElec: "70%", paymentsCash: "30%", outstanding: "128,500", outStudents: "350", subs: "2,845", subsProgress: "75%" },
  "أسبوعي": { revenues: "311,250", revenuesChange: "+ 5% مقارنة بالأسبوع السابق", payments: "113,000", paymentsElec: "75%", paymentsCash: "25%", outstanding: "32,100", outStudents: "80", subs: "710", subsProgress: "40%" },
};

const chartDataOptions = {
  "سنوي": [
    { name: 'الربع الأول', revenues: 3500, payments: 1200 },
    { name: 'الربع الثاني', revenues: 4200, payments: 1500 },
    { name: 'الربع الثالث', revenues: 3800, payments: 1300 },
    { name: 'الربع الرابع', revenues: 3440, payments: 1420 },
  ],
  "شهري": [
    { name: 'الأسبوع 1', revenues: 300, payments: 110 },
    { name: 'الأسبوع 2', revenues: 400, payments: 120 },
    { name: 'الأسبوع 3', revenues: 245, payments: 100 },
    { name: 'الأسبوع 4', revenues: 300, payments: 122 },
  ],
  "أسبوعي": [
    { name: 'الأحد', revenues: 50, payments: 20 },
    { name: 'الإثنين', revenues: 60, payments: 15 },
    { name: 'الثلاثاء', revenues: 45, payments: 25 },
    { name: 'الأربعاء', revenues: 55, payments: 10 },
    { name: 'الخميس', revenues: 101, payments: 43 },
  ]
};

export default function FinancePage() {
  const [timeFilter, setTimeFilter] = useState<"سنوي" | "شهري" | "أسبوعي">("شهري");
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Get current data based on filter
  const currentStats = statsData[timeFilter];
  const currentChartData = chartDataOptions[timeFilter];
  
  // Scramble transactions slightly to simulate changing data, keeping 'showAll' logic
  const filteredTransactions = timeFilter === "سنوي" 
    ? allTransactions 
    : timeFilter === "شهري" 
    ? allTransactions.slice(0, 6) 
    : allTransactions.slice(0, 5);

  const visibleTransactions = showAllTransactions ? filteredTransactions : filteredTransactions.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#001c56] mb-2">الإدارة المالية</h1>
          <p className="text-gray-500">نظرة عامة على الأداء المالي، تتبع الإيرادات، وتحليل حركة السيولة النقدية.</p>
        </div>
        <div className="flex bg-white rounded-full p-1 border border-gray-100 shadow-sm">
          {(["سنوي", "شهري", "أسبوعي"] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                timeFilter === filter 
                  ? "bg-[#001c56] text-white shadow-md" 
                  : "text-gray-500 hover:text-[#001c56] hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Revenues */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all h-[180px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">إجمالي الإيرادات</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="animate-in fade-in duration-300" key={`rev-${timeFilter}`}>
            <div className="text-3xl font-extrabold text-[#001c56] mb-2">{currentStats.revenues} <span className="text-xl">ريال</span></div>
            <div className="text-xs font-bold text-green-600 flex items-center gap-1">
              {currentStats.revenuesChange}
            </div>
          </div>
        </div>

        {/* Card 2: Payments */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all h-[180px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">المدفوعات</h3>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <Wallet size={20} />
            </div>
          </div>
          <div className="animate-in fade-in duration-300" key={`pay-${timeFilter}`}>
            <div className="text-3xl font-extrabold text-[#001c56] mb-3">{currentStats.payments} <span className="text-xl">ريال</span></div>
            <div className="flex gap-4">
              <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex-1 text-center">
                <p className="text-[10px] text-gray-500 font-bold mb-1">إلكتروني</p>
                <p className="text-sm text-[#001c56] font-extrabold">{currentStats.paymentsElec}</p>
              </div>
              <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex-1 text-center">
                <p className="text-[10px] text-gray-500 font-bold mb-1">نقدي</p>
                <p className="text-sm text-[#001c56] font-extrabold">{currentStats.paymentsCash}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Outstanding Amounts */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-red-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all h-[180px]">
          <div className="absolute top-0 right-10 w-24 h-1.5 bg-red-500 rounded-b-full"></div>
          <div className="flex justify-between items-start mb-4 mt-2">
            <h3 className="text-gray-500 font-bold text-sm">المبالغ المستحقة</h3>
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="animate-in fade-in duration-300" key={`out-${timeFilter}`}>
            <div className="text-3xl font-extrabold text-red-500 mb-2">{currentStats.outstanding} <span className="text-xl">ريال</span></div>
            <div className="text-[11px] font-bold text-gray-400">
              من إجمالي {currentStats.outStudents} طالب متأخر عن السداد
            </div>
          </div>
        </div>

        {/* Card 4: Active Subscriptions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all h-[180px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">الاشتراكات النشطة</h3>
            <div className="w-10 h-10 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="animate-in fade-in duration-300" key={`subs-${timeFilter}`}>
            <div className="text-3xl font-extrabold text-[#001c56] mb-4">{currentStats.subs}</div>
            <div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
                <div className="bg-[#001c56] h-1.5 rounded-full transition-all duration-1000" style={{ width: currentStats.subsProgress }}></div>
              </div>
              <div className="flex justify-start text-[11px] font-bold text-gray-400">
                <span>{currentStats.subsProgress} من الهدف</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              أحدث المعاملات
            </h2>
            <button 
              onClick={() => setShowAllTransactions(!showAllTransactions)}
              className="text-sm font-bold text-[#7896C7] hover:text-[#001c56] transition-colors"
            >
              {showAllTransactions ? "إخفاء" : "عرض الكل"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right pb-4 text-xs font-bold text-gray-400 w-1/4">الطالب</th>
                  <th className="text-right pb-4 text-xs font-bold text-gray-400 w-1/5">نوع العملية</th>
                  <th className="text-right pb-4 text-xs font-bold text-gray-400 w-1/6">المبلغ</th>
                  <th className="text-right pb-4 text-xs font-bold text-gray-400 w-1/5">التاريخ</th>
                  <th className="text-center pb-4 text-xs font-bold text-gray-400 w-1/6">الحالة</th>
                </tr>
              </thead>
              <tbody className="animate-in fade-in duration-300" key={`table-${timeFilter}`}>
                {visibleTransactions.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="py-5 font-bold text-[#001c56] text-sm">{t.student}</td>
                    <td className="py-5 text-gray-500 font-medium text-xs">{t.type}</td>
                    <td className="py-5 font-extrabold text-[#001c56] text-sm">{t.amount.toLocaleString()} <span className="text-xs text-gray-400">ريال</span></td>
                    <td className="py-5 text-gray-500 font-medium text-xs">{t.date}</td>
                    <td className="py-5 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold w-24 ${t.statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Cash Flow Chart */}
        <div className="lg:col-span-1 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              ملخص حركة السيولة
            </h2>
          </div>

          <div className="flex-1 bg-gray-50/50 rounded-[32px] p-6 flex flex-col justify-end min-h-[300px] animate-in zoom-in-95 duration-500" key={`chart-${timeFilter}`}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenues" name="الإيرادات" fill="#7896C7" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="payments" name="المدفوعات" fill="#E4ECF7" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Chart Legend */}
            <div className="flex justify-center items-center gap-8 mt-8 pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E4ECF7]"></div>
                <span className="text-xs font-bold text-gray-400">المدفوعات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7896C7]"></div>
                <span className="text-xs font-bold text-[#001c56]">الإيرادات</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
