"use client";

import React from "react";
import { Headset, Users, Lock, Activity, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-right mb-12 mt-4 flex flex-col items-end">
        <h1 className="text-3xl font-extrabold text-[#001c56] flex items-center justify-end gap-3 mb-2 flex-row-reverse">
          مركز المساعدة والدعم الإداري
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#001c56] flex items-center justify-center shadow-sm shrink-0">
            <Headset size={24} />
          </div>
        </h1>
        <p className="text-sm font-bold text-gray-500 mr-16">
          دليل التشغيل والإرشادات الفنية لمدراء السناتر والموظفين
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mb-12">
        
        {/* Card 1 */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm mb-6">
            <Users size={28} />
          </div>
          <h3 className="text-base font-extrabold text-[#001c56] mb-6">دليل صلاحيات المدير والموظفين</h3>
          <ul className="space-y-4 text-right w-full">
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              خطوات تفعيل حسابات الموظفين
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              تحديد الصلاحيات المالية والتعليمية
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              إدارة المذكرات والواجبات
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm mb-6">
            <Lock size={28} />
          </div>
          <h3 className="text-base font-extrabold text-[#001c56] mb-6">إدارة اشتراكات الطلاب والسنتر</h3>
          <ul className="space-y-4 text-right w-full">
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              آلية مراجعة المدفوعات
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              تسجيل الحضور اليدوي
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              إصدار أكواد الخصم
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-sm mb-6">
            <Activity size={28} />
          </div>
          <h3 className="text-base font-extrabold text-[#001c56] mb-6">مشاكل البث المباشر والامتحانات</h3>
          <ul className="space-y-4 text-right w-full">
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <XCircle size={16} className="text-red-500 shrink-0" />
              حلول سريعة لانقطاع الاتصال
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <XCircle size={16} className="text-red-500 shrink-0" />
              إعادة جدولة الامتحانات المكررة
            </li>
            <li className="flex items-center gap-3 flex-row-reverse text-sm font-bold text-gray-600">
              <XCircle size={16} className="text-red-500 shrink-0" />
              استعادة بيانات الاختبارات
            </li>
          </ul>
        </div>

      </div>

      {/* Support Action */}
      <div className="flex justify-start">
        <Link 
          href="#"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-sm transition-colors shadow-lg shadow-blue-900/20 flex-row-reverse"
        >
          زيارة موقع الدعم الفني الرسمي للشركة
          <ExternalLink size={18} />
        </Link>
      </div>

    </div>
  );
}
