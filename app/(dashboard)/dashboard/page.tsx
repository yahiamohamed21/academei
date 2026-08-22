"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  ClipboardCheck, 
  Wallet, 
  UserPlus, 
  AlertTriangle,
  Square,
  CalendarDays,
  Clock,
  Users,
  Search,
  GraduationCap,
  Save,
  CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative w-full h-[280px] rounded-3xl overflow-hidden shadow-sm flex items-center p-10">
        <Image 
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop"
          alt="Welcome"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/80 to-transparent" />
        
        <div className="relative z-10 w-full max-w-sm mr-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 animate-in slide-in-from-right-8 duration-700">
          <h2 className="text-3xl font-extrabold text-[var(--primary)] mb-2">مرحباً بك مجدداً د. أحمد</h2>
          <p className="text-gray-600 mb-6 font-medium">إليك نظرة عامة على نشاط المركز اليوم</p>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-semibold mb-1">نسبة الحضور</p>
              <p className="text-2xl font-black text-[var(--primary)]">94%</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-semibold mb-1">الطلاب الموجودون</p>
              <p className="text-2xl font-black text-[var(--primary)]">142</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-semibold mb-1">البث المباشر</p>
              <p className="text-2xl font-black text-[var(--primary)]">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Right Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
            <div className="flex flex-wrap gap-4 relative">
              <Button 
                onClick={() => setActiveAction(null)}
                className="flex-1 bg-[var(--primary)] text-white hover:opacity-90 gap-2 h-14 text-base rounded-2xl"
              >
                <ClipboardCheck size={20} />
                تسجيل حضور
              </Button>
              
              <div className="relative flex-1">
                <Button 
                  onClick={() => setActiveAction(activeAction === 'collection' ? null : 'collection')}
                  variant="outline" 
                  className="w-full bg-blue-50/50 border-blue-100 text-[var(--primary)] hover:bg-blue-100 hover:border-blue-200 gap-2 h-14 text-base rounded-2xl"
                >
                  <Wallet size={20} />
                  تحصيل سريع
                </Button>
                {activeAction === 'collection' && (
                  <div className="absolute top-full mt-2 w-full min-w-[280px] z-50 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="space-y-4">
                      <Input label="اسم الطالب" placeholder="ابحث عن طالب..." icon={<Search size={18} />} />
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">المادة</label>
                        <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                          <option>اختر المادة</option>
                          <option>رياضيات</option>
                          <option>فيزياء</option>
                        </select>
                      </div>

                      <Input label="المبلغ" placeholder="0.00" type="number" />
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">طريقة الدفع</label>
                        <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                          <option>كاش</option>
                          <option>فيزا</option>
                          <option>تحويل بنكي</option>
                        </select>
                      </div>

                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-2">
                        <div className="flex items-center gap-2 mb-2 text-[var(--primary)] font-bold">
                          <Wallet size={16} />
                          <span className="text-sm">ملخص التحصيل</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-gray-500">المادة</span>
                          <span className="font-semibold text-gray-900">-</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">الإجمالي</span>
                          <span className="font-bold text-[var(--primary)] text-lg">0.00 <span className="text-xs">ج.م</span></span>
                        </div>
                      </div>

                      <Button className="w-full gap-2 h-12">
                        <CheckCircle2 size={18} />
                        تأكيد التحصيل
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative flex-1">
                <Button 
                  onClick={() => setActiveAction(activeAction === 'add_student' ? null : 'add_student')}
                  variant="outline" 
                  className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50 gap-2 h-14 text-base rounded-2xl"
                >
                  <UserPlus size={20} />
                  إضافة طالب
                </Button>
                {activeAction === 'add_student' && (
                  <div className="absolute top-full mt-2 w-full min-w-[280px] right-0 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="space-y-4">
                      <Input label="الاسم بالكامل" placeholder="أدخل اسم الطالب رباعياً" icon={<UserPlus size={18} className="text-gray-400" />} />
                      
                      <Input label="رقم الهاتف" placeholder="مثال: 0501234567" dir="ltr" className="text-left" />
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">الصف الدراسي</label>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <GraduationCap size={18} />
                          </div>
                          <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-12 pl-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                            <option>اختر الصف الدراسي...</option>
                            <option>الصف الأول الثانوي</option>
                            <option>الصف الثاني الثانوي</option>
                            <option>الصف الثالث الثانوي</option>
                          </select>
                        </div>
                      </div>

                      <Button className="w-full gap-2 h-12 mt-2">
                        <Save size={18} />
                        حفظ بيانات الطالب
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">الحصص القادمة والحالية</h3>
              <button className="text-sm font-bold text-[var(--primary)] hover:underline">عرض الكل</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Card 1 */}
              <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-400"></div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">الرياضيات المتقدمة - الصف الثالث</h4>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">قادمة</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5"><CalendarDays size={16} /> قاعة 101</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> 14:00 - 15:30</div>
                  <div className="flex items-center gap-1.5"><Users size={16} /> 23 / 30 طالب</div>
                </div>
              </div>

              {/* Class Card 2 */}
              <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-400"></div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">الرياضيات المتقدمة - الصف الثالث</h4>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">قادمة</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5"><CalendarDays size={16} /> قاعة 101</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> 14:00 - 15:30</div>
                  <div className="flex items-center gap-1.5"><Users size={16} /> 23 / 30 طالب</div>
                </div>
              </div>

              {/* Class Card 3 (Live) */}
              <div className="border border-red-100 bg-red-50/30 rounded-2xl p-4 hover:border-red-300 hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500"></div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">مجموعة الكيمياء - الصف الثاني الثانوي</h4>
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold animate-pulse">الآن</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5"><CalendarDays size={16} /> القاعة أ-101</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> 08:00 - 09:30</div>
                  <div className="flex items-center gap-1.5"><Users size={16} /> 18 / 25 طالب</div>
                </div>
              </div>

              {/* Class Card 4 */}
              <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-gray-300"></div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">مجموعة الفيزياء - الصف الأول الثانوي</h4>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">ملغاة</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                  <div className="flex items-center gap-1.5"><CalendarDays size={16} /> المدرج ب</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> 12:00 - 13:30</div>
                  <div className="flex items-center gap-1.5"><Users size={16} /> 40 / 50 طالب</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column (Narrower) */}
        <div className="space-y-6">
          
          {/* Financial Alerts */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-xl font-bold text-gray-900">التنبيهات المالية</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50/50 border border-red-100">
                <span className="font-bold text-gray-700">رصيد آجل</span>
                <span className="font-black text-red-600 text-lg">4,500 ج.م</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="font-bold text-gray-700">فروق خزينة</span>
                <span className="font-black text-blue-600 text-lg">+120 ج.م</span>
              </div>
            </div>
          </div>

          {/* Operational Tasks */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">الاستثناءات ومهام تشغيلية</h3>
            
            <div className="space-y-5">
              <label className="flex items-start gap-3 cursor-pointer group">
                <Square className="text-gray-300 group-hover:text-[var(--primary)] transition-colors mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-gray-800 text-sm">مراجعة طلبات استرداد المصروفات</p>
                  <p className="text-xs text-gray-500 font-medium">3 طلبات معلقة من أمس</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Square className="text-gray-300 group-hover:text-[var(--primary)] transition-colors mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-gray-800 text-sm">تحديث بيانات تواصل ولي أمر (عمر)</p>
                  <p className="text-xs text-gray-500 font-medium">رقم الهاتف غير صالح</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Square className="text-gray-300 group-hover:text-[var(--primary)] transition-colors mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-gray-800 text-sm">تأكيد حجز القاعة 4 للصيانة</p>
                  <p className="text-xs text-gray-500 font-medium">موعد الصيانة: غداً 8:00 ص</p>
                </div>
              </label>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
