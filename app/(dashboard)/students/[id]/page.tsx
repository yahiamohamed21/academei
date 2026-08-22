"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Edit2, 
  History, 
  Star, 
  UserCheck, 
  CreditCard, 
  GraduationCap, 
  XCircle,
  LayoutDashboard,
  Users,
  TriangleAlert
} from "lucide-react";

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = React.useState(false);
  
  // Mock Data
  const student = {
    id: params.id,
    name: "أحمد محمد علي",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    status: "نشط",
    grade: "الثاني الثانوي",
    group: "مجموعة A",
    major: "علمي رياضة",
    currentPlan: "باقة الكيمياء المكثفة",
    planEnd: "2024/12/30",
    gradesAvg: "88%",
    attendance: "95%",
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-2">
        <Link href="/dashboard" className="hover:text-[var(--primary)] flex items-center gap-1">
          <LayoutDashboard size={14} /> لوحة القيادة
        </Link>
        <span>/</span>
        <Link href="/students" className="hover:text-[var(--primary)] flex items-center gap-1">
          <Users size={14} /> الطلاب
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">الملف الشخصي: {student.name}</span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Cover */}
        <div className="relative h-48 md:h-64 bg-gray-200">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop" 
            alt="Cover" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info Header */}
        <div className="relative px-8 pb-8 flex flex-col items-center text-center -mt-16 z-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
              <Image src={student.avatar} alt={student.name} fill className="object-cover" />
            </div>
            <Link 
              href={`/students/${student.id}/edit`} 
              className="absolute bottom-1 -right-1 bg-white p-2.5 rounded-full shadow-md text-gray-600 hover:text-[var(--primary)] transition-colors border border-gray-100"
            >
              <Edit2 size={16} />
            </Link>
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mt-4 mb-1">{student.name}</h1>
          <p className="text-gray-500 font-medium mb-3">ID: ST-{student.id}</p>
          <div className="flex items-center gap-2 bg-blue-50 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            {student.status}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8 bg-gray-50/50">
          
          {/* Left Column (Sidebar-like info) */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <History className="text-[var(--primary)]" size={20} />
                النشاط الأخير
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 relative">
                  <div className="absolute top-2 bottom-[-20px] right-[7px] w-px bg-gray-100" />
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#1e3a8a] mt-1 shrink-0 ring-4 ring-white shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">حضور محاضرة الرياضيات الهندسية</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">اليوم - 10:30 ص</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="absolute top-2 bottom-[-20px] right-[7px] w-px bg-gray-100" />
                  <div className="relative z-10 w-4 h-4 rounded-full bg-blue-400 mt-1 shrink-0 ring-4 ring-white shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">تسليم تكليف التصميم</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">أمس - 08:15 م</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="relative z-10 w-4 h-4 rounded-full bg-gray-300 mt-1 shrink-0 ring-4 ring-white shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-600">دخول النظام</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">أمس - 08:00 ص</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">متوسط الدرجات</p>
                  <p className="text-2xl font-black text-gray-900">{student.gradesAvg}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <UserCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">نسبة الحضور</p>
                  <p className="text-2xl font-black text-gray-900">{student.attendance}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Main Info) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Academic Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <GraduationCap className="text-[var(--primary)]" size={22} />
                البيانات الأكاديمية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">الفرقة الدراسية</p>
                  <p className="font-black text-gray-900">{student.grade}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">المجموعة</p>
                  <p className="font-black text-gray-900">{student.group}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold mb-2">التخصص</p>
                  <p className="font-black text-gray-900">{student.major}</p>
                </div>
              </div>
            </div>

            {/* Financial Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e3a8a] mb-6 flex items-center gap-2">
                <CreditCard className="text-[var(--primary)]" size={22} />
                البيانات المالية والاشتراكات
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-500 font-bold mb-1">الباقة الحالية</p>
                    <p className="font-black text-[#1e3a8a]">{student.currentPlan}</p>
                  </div>
                  <div className="text-left bg-white px-4 py-2 rounded-lg border border-blue-50 shadow-sm">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">تاريخ الانتهاء:</p>
                    <p className="font-bold text-gray-900 text-sm">{student.planEnd}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900">سجل الاشتراكات</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 font-bold text-gray-600">الباقة</th>
                        <th className="py-3 px-4 font-bold text-gray-600">التاريخ</th>
                        <th className="py-3 px-4 font-bold text-gray-600">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-800">باقة الكيمياء المكثفة</td>
                        <td className="py-3 px-4 text-gray-500 font-medium">2024/09/01</td>
                        <td className="py-3 px-4"><span className="text-xs font-bold text-[var(--primary)] bg-blue-50 px-2.5 py-1 rounded-md">نشط</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-800">الفيزياء الأساسية</td>
                        <td className="py-3 px-4 text-gray-500 font-medium">2024/06/15</td>
                        <td className="py-3 px-4"><span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">منتهي</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

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
