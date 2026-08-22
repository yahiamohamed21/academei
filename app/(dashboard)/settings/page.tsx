"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building2, User, BellRing, Monitor } from "lucide-react";

export default function SettingsPage() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="text-right mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--primary)] mb-2">إعدادات النظام</h1>
        <p className="text-gray-500 font-medium">إدارة التكوينات وتفضيلات المستخدم</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-10">
        
        {/* Center Details */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Building2 className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">التفاصيل العامة للمركز</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="اسم المركز" defaultValue="أكاديمية التميز للتعليم" />
            <Input label="العنوان الرئيسي" defaultValue="الرياض، طريق الملك فهد، حي الصحافة، مبنى رقم 45" />
          </div>
        </section>

        {/* Account Info */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <User className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">معلومات الحساب</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="الاسم الكامل" defaultValue="أحمد محمد" />
            <Input label="البريد الإلكتروني" type="email" defaultValue="ahmed@excellence-academy.edu" dir="ltr" className="text-left" />
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <BellRing className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">تفضيلات الإشعارات</h2>
          </div>
          <div className="space-y-4">
            
            {/* Toggle Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div>
                <p className="font-bold text-gray-900">تنبيهات النظام</p>
                <p className="text-xs text-gray-500 mt-1">تلقي التنبيهات داخل النظام للإعلانات الهامة</p>
              </div>
              <button 
                type="button"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${alertsEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${alertsEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
              </button>
            </div>

            {/* Toggle Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div>
                <p className="font-bold text-gray-900">رسائل SMS</p>
                <p className="text-xs text-gray-500 mt-1">تلقي الرسائل النصية القصيرة للتنبيهات العاجلة</p>
              </div>
              <button 
                type="button"
                onClick={() => setSmsEnabled(!smsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${smsEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${smsEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
              </button>
            </div>

            {/* Toggle Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div>
                <p className="font-bold text-gray-900">إشعارات واتساب</p>
                <p className="text-xs text-gray-500 mt-1">تلقي التحديثات اليومية عبر تطبيق واتساب</p>
              </div>
              <button 
                type="button"
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${whatsappEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${whatsappEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
              </button>
            </div>
            
          </div>
        </section>

        {/* Display Preferences */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Monitor className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">تفضيلات العرض</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">لغة النظام</label>
              <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                <option>العربية</option>
                <option>English</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">مظهر النظام</label>
              <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                <option>الوضع الفاتح</option>
                <option>الوضع الداكن</option>
                <option>تلقائي (حسب النظام)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-100 flex gap-4">
          <Button className="px-8 h-12">حفظ التغييرات</Button>
          <Button variant="outline" className="px-8 h-12">الرجوع</Button>
        </div>

      </div>
    </div>
  );
}
