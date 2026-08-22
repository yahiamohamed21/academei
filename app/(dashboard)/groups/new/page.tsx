import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, ChevronDown, CheckCircle, Users } from "lucide-react";

export default function NewGroupPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      
      {/* Page Header (Optional, but usually good to have if we want to match layout. Though in the screenshot, the title is inside the white card. Wait, let me look at the screenshot again. Ah, the title is centered inside the white card!) */}
      
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 md:p-14">
        
        {/* Header Inside Card */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-4xl font-extrabold text-[#001c56]">تفاصيل الحصة</h1>
          <p className="text-gray-500 font-medium text-sm">الرجاء إدخال بيانات الحصة الجديدة ليتم جدولتها في النظام.</p>
        </div>

        {/* Form */}
        <div className="space-y-8 max-w-2xl mx-auto">
          
          {/* Class Name */}
          <div className="space-y-3">
            <label className="text-sm font-extrabold text-[#001c56] block text-right">اسم الحصة</label>
            <input 
              type="text" 
              placeholder="مثال: رياضيات متقدمة - الفصل الأول" 
              className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Group and Room Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">اختيار المجموعة</label>
              <div className="relative">
                <select className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-400 cursor-pointer">
                  <option value="" disabled selected>اختر المجموعة المستهدفة</option>
                  <option value="1">مجموعة الكيمياء - الصف الثاني الثانوي</option>
                  <option value="2">مجموعة الفيزياء - الصف الأول الثانوي</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">تحديد القاعة</label>
              <div className="relative">
                <select className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-400 cursor-pointer">
                  <option value="" disabled selected>اختر القاعة الدراسية</option>
                  <option value="1">القاعة أ-101</option>
                  <option value="2">المدرج ب</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Date and Max Students Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">موعد الحصة</label>
              <div className="relative">
                <input 
                  type="datetime-local" 
                  className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#001c56] block text-right">الحد الأقصى للطلاب</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="مثال: 30" 
                  className="w-full h-12 rounded-xl border border-gray-200 bg-white pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400"
                />
                <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <label className="text-sm font-extrabold text-[#001c56] block text-right">ملاحظات إضافية (اختياري)</label>
            <textarea 
              placeholder="أي تفاصيل أو متطلبات خاصة بهذه الحصة..." 
              className="w-full h-32 rounded-xl border border-gray-200 bg-white p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="pt-6 flex items-center justify-end gap-4 w-full">
            <Link href="/groups">
              <Button variant="outline" className="h-12 px-8 bg-blue-50/50 text-[#001c56] hover:bg-blue-100 border-transparent font-bold rounded-xl text-sm w-32">
                إلغاء
              </Button>
            </Link>
            <Button className="h-12 px-8 bg-[#001c56] hover:bg-[#001033] text-white font-bold rounded-xl text-sm gap-2">
              <CheckCircle size={18} />
              إضافة الحصة الآن
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
