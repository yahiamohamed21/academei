import React from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Calendar, CreditCard, Info, Users, ChevronDown } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[var(--primary)] mb-3 tracking-tight">التنبيهات</h1>
        <p className="text-gray-500 font-medium text-lg">تابع آخر المستجدات والنشاطات في نظامك</p>
      </div>

      <div className="space-y-4">
        
        {/* Admin Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-r-2xl"></div>
          
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
            <AlertTriangle size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">تنبيه إداري</h3>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">منذ 5 دقائق</span>
            </div>
            <p className="text-gray-600">يرجى تحديث سجلات غياب الطلاب للفصل الدراسي الأول قبل نهاية يوم العمل لتجنب التأخير في التقارير.</p>
          </div>
        </div>

        {/* New Class Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[var(--primary)] rounded-r-2xl"></div>
          
          <div className="w-12 h-12 bg-blue-50 text-[var(--primary)] rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
            <Calendar size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">موعد حصة جديد</h3>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">منذ ساعتين</span>
            </div>
            <p className="text-gray-600 mb-4">تمت إضافة حصة "مراجعة الرياضيات المتقدمة" لجدولك يوم غد الساعة 10:00 صباحاً. القاعة: 304.</p>
            <div className="flex gap-3">
              <Button size="sm" className="bg-[var(--primary)] text-white">تأكيد الحضور</Button>
              <Button size="sm" variant="outline">تفاصيل الجدول</Button>
            </div>
          </div>
        </div>

        {/* Financial Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <CreditCard size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">إشعار مالي</h3>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">أمس 10:30 ص</span>
            </div>
            <p className="text-gray-600">تم تحويل مستحقات الشهر الماضي إلى حسابك البنكي بنجاح. يمكنك الاطلاع على قسيمة الراتب في قسم المالية.</p>
          </div>
        </div>

        {/* System Update Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <Info size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">تحديث النظام</h3>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">12 أكتوبر، 08:00 م</span>
            </div>
            <p className="text-gray-600">تم تحديث منصة إنجاز إلى الإصدار 2.4. يتضمن التحديث تحسينات في سرعة تحميل التقارير وإضافة ميزة تصدير البيانات إلى Excel.</p>
          </div>
        </div>

        {/* Registration Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">تسجيل طلاب جدد</h3>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">10 أكتوبر، 09:15 ص</span>
            </div>
            <p className="text-gray-600">تم انضمام 3 طلاب جدد إلى مجموعة "اللغة العربية - المستوى المتقدم". يرجى مراجعة قائمة الطلاب وتحديث خطة الدرس إن لزم الأمر.</p>
          </div>
        </div>

      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" className="gap-2 rounded-full px-6 font-bold text-gray-600 hover:text-gray-900">
          عرض المزيد
          <ChevronDown size={18} />
        </Button>
      </div>

    </div>
  );
}
