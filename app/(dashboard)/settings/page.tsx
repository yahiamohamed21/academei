"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building2, User, BellRing, Monitor, BookOpen, Layers, MapPin } from "lucide-react";
import { useSession } from "@/lib/hooks/use-auth";
import { useBranches } from "@/lib/hooks/use-branches";
import { useGradeLevels } from "@/lib/hooks/use-grade-levels";
import { useSubjects } from "@/lib/hooks/use-subjects";

export default function SettingsPage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: branches = [], isLoading: loadingBranches } = useBranches(tenantId);
  const { data: gradeLevels = [], isLoading: loadingGrades } = useGradeLevels(tenantId);
  const { data: subjects = [], isLoading: loadingSubjects } = useSubjects(tenantId);

  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="text-right mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--primary)] mb-2">إعدادات النظام</h1>
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
            <Input label="الاسم الكامل" defaultValue={session?.email ? session.email.split('@')[0] : "معلم TeacherOS"} />
            <Input label="البريد الإلكتروني" type="email" defaultValue={session?.email || "user@teachos.com"} dir="ltr" className="text-left" />
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

        {/* System Data Settings (Branches, Grade Levels, Subjects) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Layers className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">إعدادات المنظومة التعليمية</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Branches */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 text-[var(--primary)] rounded-xl flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">الفروع (Branches)</h3>
              <p className="text-sm text-gray-500 mb-4">
                {loadingBranches ? "جاري التحميل..." : `${Array.isArray(branches) ? branches.length : (branches as any)?.totalCount || 0} فرع متاح`}
              </p>
              <Button variant="outline" className="w-full text-sm h-10 border-gray-200">إدارة الفروع</Button>
            </div>

            {/* Grade Levels */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Layers size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">المراحل الدراسية (Grades)</h3>
              <p className="text-sm text-gray-500 mb-4">
                {loadingGrades ? "جاري التحميل..." : `${Array.isArray(gradeLevels) ? gradeLevels.length : (gradeLevels as any)?.totalCount || 0} مرحلة دراسية`}
              </p>
              <Button variant="outline" className="w-full text-sm h-10 border-gray-200">إدارة المراحل</Button>
            </div>

            {/* Subjects */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">المواد الدراسية (Subjects)</h3>
              <p className="text-sm text-gray-500 mb-4">
                {loadingSubjects ? "جاري التحميل..." : `${Array.isArray(subjects) ? subjects.length : (subjects as any)?.totalCount || 0} مادة دراسية`}
              </p>
              <Button variant="outline" className="w-full text-sm h-10 border-gray-200">إدارة المواد</Button>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
          <Button className="px-8 h-12">حفظ التغييرات</Button>
          <Button variant="outline" className="px-8 h-12">الرجوع</Button>
        </div>

      </div>
    </div>
  );
}
