"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  ShieldCheck, 
  Activity, 
  Settings2, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Clock,
  Edit2
} from "lucide-react";

export default function ProfilePage() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="h-48 w-full relative">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative px-8 pb-8 pt-4 flex flex-col items-center">
          <div className="absolute -top-16 w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
            <Image 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              alt="Avatar"
              fill
              className="object-cover"
            />
            <button className="absolute bottom-2 left-2 bg-white rounded-full p-1.5 shadow-sm text-gray-600 hover:text-[var(--primary)] transition-colors">
              <Edit2 size={14} />
            </button>
          </div>
          
          <div className="mt-16 text-center space-y-2">
            <h1 className="text-2xl font-black text-gray-900">د. محمود القاضي</h1>
            <p className="text-gray-600 font-medium">المدير العام والمسؤول الرئيسي - الإدارة العليا للاتصال والتحكم</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mt-2">
              <ShieldCheck size={16} />
              صلاحيات مطلقة المستوى 1
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Right Column: Security & Advanced Control */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <ShieldCheck className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">إعدادات الأمان والتحكم المتقدم</h2>
          </div>

          <div className="space-y-5">
            <Input label="اسم المستخدم" defaultValue="admin.mahmoud.sys" icon={<User size={18} />} dir="ltr" className="text-left" />
            <Input label="البريد الإلكتروني الإداري" type="email" defaultValue="m.alkadi@edu-system.com" icon={<Mail size={18} />} dir="ltr" className="text-left" />
            <Input label="رقم الهاتف الموثق" type="tel" defaultValue="+20 01012345678" icon={<Phone size={18} />} dir="ltr" className="text-left" />
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50/50 border border-green-100">
              <div className="flex items-center gap-3">
                <Lock className="text-green-600" size={20} />
                <span className="font-bold text-gray-900 text-sm">المصادقة الثنائية (2FA)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">نشط</span>
                <button 
                  type="button"
                  onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFaEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFaEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">مهلة الجلسة</label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock size={18} />
                </div>
                <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 pr-12 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]" dir="rtl">
                  <option>30 دقيقة</option>
                  <option>60 دقيقة</option>
                  <option>ساعتان</option>
                </select>
              </div>
            </div>

            <Button className="w-full h-12 mt-4 text-base">تحديث الأمان وكلمة المرور</Button>
          </div>
        </div>

        {/* Left Column: Activity Log */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Activity className="text-[var(--primary)]" size={24} />
            <h2 className="text-xl font-bold text-gray-900">سجل نشاط النظام والعمليات الإدارية</h2>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent pr-4">
            
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-red-500 shrink-0 absolute -right-[22px] shadow-sm"></div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">إجراء حرج</span>
                  <span className="text-[10px] text-gray-400 font-medium">اليوم، 10:45 صباحاً</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">إيقاف حساب مستخدم</h4>
                <p className="text-xs text-gray-600 leading-relaxed">تم إيقاف حساب الطالب (أحمد ناصر - ID: 49201) مؤقتاً.</p>
                <div className="text-[10px] text-gray-400 bg-white inline-block px-2 py-1 rounded border border-gray-100">السبب: انتهاك سياسة الاستخدام | IP: 192.168.1.45</div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-blue-500 shrink-0 absolute -right-[22px] shadow-sm"></div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400">أمس، 15:20 مساءً</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">تصدير تقرير النظام المالي</h4>
                <p className="text-xs text-gray-600 leading-relaxed">تم استخراج التقرير الشهري للمصروفات بصيغة PDF.</p>
                <div className="text-[10px] text-gray-400 bg-white inline-block px-2 py-1 rounded border border-gray-100">الجهاز: Mac (Safari)</div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-orange-400 shrink-0 absolute -right-[22px] shadow-sm"></div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">نظام</span>
                  <span className="text-[10px] text-gray-400 font-medium">12 أكتوبر، 09:00 صباحاً</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">تحديث صلاحيات مجموعة</h4>
                <p className="text-xs text-gray-600 leading-relaxed">تعديل صلاحيات الوصول لمجموعة "المشرفين الأكاديميين".</p>
                <div className="text-[10px] text-gray-400 bg-white inline-block px-2 py-1 rounded border border-gray-100">إضافة إمكانية اعتماد النتائج</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Area: Full Admin Permissions */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-center gap-3 border-b border-gray-100 pb-4">
          <Settings2 className="text-[var(--primary)]" size={24} />
          <h2 className="text-xl font-bold text-gray-900">الصلاحيات والتحكم الإداري الشامل</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
            <div>
              <p className="font-bold text-gray-900 text-sm">إدارة الطلاب</p>
              <p className="text-xs text-gray-500 mt-1">صلاحية التعديل والحذف</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--primary)] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform -translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
            <div>
              <p className="font-bold text-gray-900 text-sm">إدارة الحسابات</p>
              <p className="text-xs text-gray-500 mt-1">تفعيل الطلاب والمعلمين</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--primary)] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform -translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
            <div>
              <p className="font-bold text-gray-900 text-sm">التدقيق المالي</p>
              <p className="text-xs text-gray-500 mt-1">عرض التقارير فقط</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--primary)] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform -translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
            <div>
              <p className="font-bold text-gray-900 text-sm">إدارة الكادر الأكاديمي</p>
              <p className="text-xs text-gray-500 mt-1">صلاحية كاملة</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--primary)] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform -translate-x-6" />
            </button>
          </div>

          <div className="md:col-span-2 flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50/30">
            <div>
              <p className="font-bold text-red-700 text-sm">الإعدادات الحساسة للنظام</p>
              <p className="text-xs text-red-500/80 mt-1">تتطلب مصادقة إضافية</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform -translate-x-1" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
