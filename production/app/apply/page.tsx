"use client";

import React, { useState } from "react";
import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ApplyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")' }}
    >
      <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
      
      <div className="relative z-10 w-full flex justify-center py-10">
        <AuthCard 
          title="طلب التحاق ببرامج التعليم" 
          description="يرجى تعبئة النموذج التالي بدقة لتقديم طلب الالتحاق"
          className="max-w-[700px] w-full"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center border-4 border-green-100 shadow-sm">
                <CheckCircle2 size={48} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح</h3>
                <p className="text-gray-500 font-medium">
                  سيتم مراجعة طلبك وإرسال النتيجة إلى بريدك الإلكتروني في أقرب وقت ممكن.
                </p>
              </div>
              <Link href="/login" className="w-full max-w-sm mt-4">
                <Button type="button" className="w-full">
                  العودة لتسجيل الدخول
                </Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-8 w-full text-right" onSubmit={handleSubmit}>
              
              {/* Section 1 */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary)] border-b pb-2">بيانات مقدم الطلب</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="الاسم الأول" placeholder="أدخل اسمك الأول" required />
                  <Input label="اسم العائلة" placeholder="أدخل اسم العائلة" required />
                  <Input label="رقم الهوية" placeholder="أدخل رقم الهوية الوطنية" required />
                  <Input label="تاريخ الميلاد" type="date" required />
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary)] border-b pb-2">بيانات الاتصال</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="رقم الجوال" type="tel" placeholder="05xxxxxxxx" required />
                  <Input label="البريد الإلكتروني" type="email" placeholder="example@email.com" required />
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">المدينة</label>
                    <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                      <option>الرياض</option>
                      <option>جدة</option>
                      <option>الدمام</option>
                      <option>مكة المكرمة</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary)] border-b pb-2">البرنامج الأكاديمي</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">الدرجة العلمية</label>
                    <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                      <option>بكالوريوس</option>
                      <option>ماجستير</option>
                      <option>دبلوم</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">التخصص</label>
                    <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]">
                      <option>علوم الحاسب</option>
                      <option>إدارة الأعمال</option>
                      <option>الهندسة</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--primary)] border-b pb-2">المرفقات</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-300 transition-colors">
                    <UploadCloud className="text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-gray-700">صورة الهوية الوطنية</span>
                    <span className="text-xs text-gray-500 mt-1">PDF أو JPG</span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-300 transition-colors">
                    <UploadCloud className="text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-gray-700">شهادة الثانوية</span>
                    <span className="text-xs text-gray-500 mt-1">PDF فقط</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full text-lg h-14" size="lg">
                  تقديم الطلب
                </Button>
              </div>
            </form>
          )}
        </AuthCard>
      </div>
    </div>
  );
}
