"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  LayoutDashboard,
  Users,
  ChevronDown,
  Save,
  XCircle,
  Camera,
  TriangleAlert
} from "lucide-react";

export default function EditStudentProfilePage({ params }: { params: { id: string } }) {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = React.useState(false);
  
  // Mock Data
  const student = {
    id: params.id,
    name: "أحمد محمد علي",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    status: "نشط",
    phone: "0501234567",
    email: "ahmed.ali@example.com",
    address: "الرياض، حي العليا، شارع التحلية",
    grade: "الصف الثاني الثانوي",
    group: "المجموعة B",
    major: "علمي",
    currentPlan: "الباقة المميزة (الفصل الدراسي الأول)",
    planEnd: "06/30/2024",
    notes: ""
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Top Bar / Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/dashboard" className="hover:text-[var(--primary)] flex items-center gap-1">
            <LayoutDashboard size={14} /> إدارة الطلاب
          </Link>
          <span>/</span>
          <Link href={`/students/${student.id}`} className="hover:text-[var(--primary)] font-bold">
            تعديل بيانات الطالب: {student.name}
          </Link>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Link href={`/students/${student.id}`}>
            <Button variant="outline" className="bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200 h-10 px-5 rounded-full font-bold w-full md:w-auto">
              إلغاء
            </Button>
          </Link>
          <Button className="bg-[#0f172a] hover:bg-[#1e293b] text-white h-10 px-6 rounded-full font-bold gap-2 shadow-sm w-full md:w-auto">
            <Save size={16} /> حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-12">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 rounded-3xl p-6 bg-gray-50/50">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm relative bg-gray-200">
                <Image src={student.avatar} alt={student.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">{student.name}</h1>
              <p className="text-gray-500 font-medium">رقم الطالب: ST-{student.id}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-full px-4 py-2 border border-gray-200 cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            {student.status}
            <ChevronDown size={14} className="text-gray-400 mr-1" />
          </div>
        </div>

        {/* Forms Sections */}
        <div className="max-w-3xl space-y-10">
          
          {/* Section 1 */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">البيانات الشخصية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الاسم الكامل</label>
                <input type="text" defaultValue={student.name} className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">رقم الهاتف</label>
                <input type="text" defaultValue={student.phone} className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-left" dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</label>
                <input type="email" defaultValue={student.email} className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-left" dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">العنوان الوطني</label>
                <input type="text" defaultValue={student.address} className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">البيانات الأكاديمية</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">السنة الدراسية</label>
                <div className="relative">
                  <select className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all">
                    <option>{student.grade}</option>
                    <option>الصف الأول الثانوي</option>
                    <option>الصف الثالث الثانوي</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">التخصص / المسار</label>
                <div className="relative">
                  <select className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all">
                    <option>{student.major}</option>
                    <option>أدبي</option>
                    <option>علمي علوم</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">المجموعة</label>
                <div className="relative">
                  <select className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all">
                    <option>{student.group}</option>
                    <option>المجموعة A</option>
                    <option>المجموعة C</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">البيانات المالية والاشتراكات</h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">الباقة الحالية</label>
                <div className="relative">
                  <select className="w-full h-12 rounded-xl bg-white border border-gray-200 px-4 text-sm font-medium text-gray-900 appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all">
                    <option>{student.currentPlan}</option>
                    <option>الباقة الذهبية (سنة كاملة)</option>
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 mr-1">تاريخ انتهاء الاشتراك</label>
                <div className="relative">
                  <input type="date" defaultValue="2024-06-30" className="w-full h-12 rounded-xl bg-white border border-gray-200 px-4 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-gray-900">الملاحظات (للاستخدام الداخلي)</h3>
            <div className="space-y-2">
              <textarea 
                placeholder="أضف ملاحظات إدارية هنا..." 
                className="w-full h-32 rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                defaultValue={student.notes}
              ></textarea>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Danger Zone */}
          <div className="bg-[#fff1f2] rounded-2xl p-6 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-right">
              <h4 className="text-red-700 text-lg font-black mb-1">تريد إيقاف حساب الطالب؟</h4>
              <p className="text-red-400 font-medium">لن يتمكن الطالب من الوصول إلى حسابه بعد الإيقاف.</p>
            </div>
            <Button 
              onClick={() => setIsSuspendModalOpen(true)}
              className="bg-[#ffe4e6] hover:bg-red-200 text-red-600 px-10 h-12 rounded-xl font-bold gap-2 shadow-sm"
            >
              إيقاف <XCircle size={18} />
            </Button>
          </div>

        </div>
      </div>

      {/* Suspend Confirmation Modal */}
      {isSuspendModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsSuspendModalOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                <TriangleAlert size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">هل أنت متأكد من إيقاف حساب الطالب؟</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                سيتم تعليق وصول الطالب للمحتوى الأكاديمي والمنصة مؤقتاً حتى يتم إعادة التفعيل يدوياً.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 w-full flex items-center justify-between mb-8 border border-gray-100">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500 mt-1">ST-{student.id}</p>
                </div>
                <div className="text-left text-xs font-bold text-gray-500 space-y-1">
                  <p>الطالب:</p>
                  <p>المعرف:</p>
                </div>
              </div>
              
              <div className="flex w-full gap-3">
                <Button 
                  onClick={() => setIsSuspendModalOpen(false)}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  تراجع
                </Button>
                <Button className="flex-1 h-12 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold">
                  تأكيد الإيقاف
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
