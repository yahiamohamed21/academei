"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  CreditCard, 
  Activity, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">نظرة عامة على النظام</h1>
        <p className="text-slate-500">مرحباً بك في لوحة تحكم الإدارة العليا، إليك ملخص لأداء المنصة.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <CreditCard size={24} />
            </div>
            <span className="flex items-center text-emerald-500 text-sm font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={16} className="mr-1" />
              +12.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">إجمالي الإيرادات (الشهر الحالي)</p>
            <h3 className="text-3xl font-black text-slate-900">45,200 <span className="text-lg text-slate-400 font-bold">ج.م</span></h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users size={24} />
            </div>
            <span className="flex items-center text-emerald-500 text-sm font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={16} className="mr-1" />
              +8
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">المراكز/المدرسين النشطين</p>
            <h3 className="text-3xl font-black text-slate-900">142</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center text-rose-500 text-sm font-bold bg-rose-50 px-2.5 py-1 rounded-full">
              <ArrowDownRight size={16} className="mr-1" />
              -2.1%
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">الاشتراكات الجديدة</p>
            <h3 className="text-3xl font-black text-slate-900">28</h3>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Activity size={24} />
            </div>
            <span className="flex items-center text-slate-500 text-sm font-bold bg-slate-100 px-2.5 py-1 rounded-full">
              مستقر
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">حالة الخوادم والنظام</p>
            <h3 className="text-2xl font-black text-emerald-500 flex items-center gap-2 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              تعمل بكفاءة 99.9%
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Subscriptions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">أحدث الاشتراكات والتجديدات</h3>
            <Link href="/admin/finance" className="text-sm font-bold text-blue-600 hover:underline">عرض الكل</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "مركز الأوائل التعليمي", plan: "الباقة الاحترافية", date: "منذ ساعتين", amount: "1,500 ج.م" },
              { name: "أ. محمد محمود (فيزياء)", plan: "الباقة الأساسية", date: "منذ 5 ساعات", amount: "500 ج.م" },
              { name: "سنتر التفوق", plan: "الباقة المتقدمة", date: "أمس", amount: "1,000 ج.م" },
              { name: "د. هدى صالح (أحياء)", plan: "الباقة المتقدمة", date: "أمس", amount: "1,000 ج.م" },
            ].map((sub, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{sub.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{sub.plan} • {sub.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-sm font-black text-slate-900">{sub.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">تنبيهات النظام</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 flex gap-4">
              <div className="mt-0.5 text-rose-500">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-900 mb-1">استهلاك عالٍ لمساحة التخزين</h4>
                <p className="text-xs text-rose-700 leading-relaxed">مركز "النخبة" تجاوز 90% من مساحة التخزين المخصصة للباقة الأساسية. يرجى التواصل معهم للترقية.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 flex gap-4">
              <div className="mt-0.5 text-amber-500">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900 mb-1">تأخر في سداد الاشتراك</h4>
                <p className="text-xs text-amber-700 leading-relaxed">يوجد 5 مراكز متأخرة في سداد اشتراك الشهر الحالي لمدة تزيد عن 3 أيام.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex gap-4">
              <div className="mt-0.5 text-blue-500">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">تحديث النظام القادم</h4>
                <p className="text-xs text-blue-700 leading-relaxed">مجدول تحديث لنظام المنصة يوم الجمعة القادم الساعة 2 صباحاً. لن تتأثر مراكز المستخدمين.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
