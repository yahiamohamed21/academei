"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  CalendarDays, 
  BookOpen,
  MessageSquare,
  Wallet,
  FileText,
  User,
  MonitorPlay,
  ClipboardList,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck,
  FlaskConical,
  FileText as FileTextIcon
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const dummyData = [
  { type: 'student', title: 'أحمد محمد عبدالله', idStr: 'ID: ST-2024-001', subtitle: 'الصف العاشر - شعبة ب', icon: <BookOpenCheck size={16} />, tagIcon: <GraduationCap size={14} />, tagText: 'طالب', color: 'blue', image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { type: 'teacher', title: 'أ. أحمد حسن', idStr: 'الرياضيات', subtitle: 'ahmed.h@injaz.edu', icon: <MessageSquare size={16} />, tagIcon: <Users size={14} />, tagText: 'معلم', color: 'purple', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
  { type: 'session', title: 'مختبر العلوم - مجموعة أحمد', idStr: 'الثلاثاء، 10:00 صباحاً', subtitle: 'مختبر 3', icon: <CalendarDays size={16} />, tagIcon: <CalendarDays size={14} />, tagText: 'جلسة', color: 'green', iconOnly: <FlaskConical size={24} /> },
  { type: 'document', title: 'تقرير أداء - أحمد محمد', idStr: 'تم التحديث: قبل يومين', subtitle: 'تقارير الفصل الأول', icon: <Users size={16} />, tagIcon: <FileTextIcon size={14} />, tagText: 'مستند', color: 'gray', iconOnly: <FileTextIcon size={24} /> },
  { type: 'student', title: 'يوسف علي', idStr: 'ID: ST-2024-002', subtitle: 'الصف الأول الثانوي', icon: <BookOpenCheck size={16} />, tagIcon: <GraduationCap size={14} />, tagText: 'طالب', color: 'blue', image: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { type: 'teacher', title: 'أ. ياسر خالد', idStr: 'الفيزياء', subtitle: 'yasser@injaz.edu', icon: <MessageSquare size={16} />, tagIcon: <Users size={14} />, tagText: 'معلم', color: 'purple', image: 'https://i.pravatar.cc/150?u=a042581f4e29026024f' },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    const filteredResults = dummyData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#1A2E44] mb-2">نتائج البحث</h2>
          <p className="text-gray-500 font-medium">
            تم العثور على {filteredResults.length} نتيجة لـ <span className="font-bold text-[var(--primary)]">'{query}'</span>
          </p>
        </div>

        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl p-5 shadow-sm border-r-4 flex items-center justify-between ${
                  result.color === 'blue' ? 'border-r-blue-500' :
                  result.color === 'purple' ? 'border-r-purple-500' :
                  result.color === 'green' ? 'border-r-green-500' :
                  'border-r-gray-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  {result.image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative">
                      <Image src={result.image} fill alt={result.title} className="object-cover" />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                      result.color === 'green' ? 'bg-green-50 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {result.iconOnly}
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{result.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{result.idStr}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      {result.icon} {result.subtitle}
                    </div>
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  result.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  result.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  result.color === 'green' ? 'bg-green-50 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                   {result.tagIcon} {result.tagText}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500 font-bold">لم يتم العثور على نتائج تطابق بحثك.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-start gap-2 mt-8">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-[var(--primary)] text-white font-bold flex items-center justify-center shadow-md">
            1
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50">
            3
          </button>
          <span className="text-gray-400">...</span>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Welcome Banner */}
      <div className="relative w-full h-[320px] rounded-[32px] overflow-hidden shadow-sm">
        <Image 
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop"
          alt="Welcome"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Curved Card Overlay */}
        <div className="absolute bottom-0 right-0 w-full md:w-auto p-6 md:p-8">
          <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-6 md:px-10 md:py-8 shadow-xl max-w-2xl relative">
            <h2 className="text-3xl font-extrabold text-[#1A2E44] mb-2 text-center">مرحباً بك مجدداً د. أحمد</h2>
            <p className="text-gray-500 mb-8 text-center text-sm font-medium">إليك نظرة عامة على نشاط المركز اليوم</p>
            
            <div className="flex items-center justify-between px-4">
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-500 font-semibold mb-1">نسبة الحضور</p>
                <p className="text-2xl font-black text-[#1A2E44] flex items-baseline gap-1">94% <span className="text-green-500 text-xs flex items-center">▲</span></p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-500 font-semibold mb-1">الطلاب الموجودون</p>
                <p className="text-2xl font-black text-[#1A2E44] flex items-center gap-2">142 <Users size={18} className="text-blue-500" /></p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-500 font-semibold mb-1">حصص اليوم</p>
                <p className="text-2xl font-black text-[#1A2E44] flex items-center gap-2">42 <BookOpen size={18} className="text-[#1A2E44]" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Right Column (Wider) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Students Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <Users size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">قسم الطلاب</h3>
              </div>
              <Link href="/students" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              {/* Student Card 1 */}
              <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                  <Image src="https://i.pravatar.cc/150?u=a042581f4e29026024d" fill alt="Student" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-gray-900">محمد علي</h4>
                    <span className="px-3 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">فائقة الأهمية</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">الصف العاشر</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><MonitorPlay size={12} /> عن بعد</span>
                    <span className="flex items-center gap-1"><BookOpen size={12} /> الفيزياء (كيمياء)</span>
                    <span className="flex items-center gap-1">ST-3023-892</span>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <div className="w-[80%] h-full bg-[#1A2E44] rounded-full"></div>
                </div>
              </div>

              {/* Student Card 2 */}
              <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                  <Image src="https://i.pravatar.cc/150?u=a04258a2462d826712d" fill alt="Student" className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-gray-900">محمد حسن</h4>
                    <span className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">فائقة الأهمية</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">الصف الثاني عشر</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><User size={12} /> سنتر</span>
                    <span className="flex items-center gap-1"><BookOpen size={12} /> الفيزياء (فيزياء)</span>
                    <span className="flex items-center gap-1">ST-3023-451</span>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <div className="w-[40%] h-full bg-[#1A2E44] rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Groups & Sessions Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <CalendarDays size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">المجموعات والحصص</h3>
              </div>
              <Link href="/groups" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-white border-r-4 border-r-[#1A2E44] rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 text-lg">الرياضيات المتقدمة - الصف الثالث</h4>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">قادمة</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><User size={16} /> 23 / 30 طالب</div>
                  <div className="flex items-center gap-2"><CalendarDays size={16} /> 14:00 - 15:30</div>
                  <div className="text-xs">قاعة 101</div>
                </div>
              </div>

              {/* Card 2 (Live) */}
              <div className="bg-white border-r-4 border-r-red-500 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 text-lg">مجموعة الكيمياء - الصف الثاني الثانوي</h4>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">الآن</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><User size={16} /> 18 / 25 طالب</div>
                  <div className="flex items-center gap-2"><CalendarDays size={16} /> 08:00 - 09:30</div>
                  <div className="text-xs">القاعة أ-101</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border-r-4 border-r-blue-300 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 text-lg">جلسة تدريبية 5</h4>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">قادمة</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><User size={16} /> 15 / 30 طالب</div>
                  <div className="flex items-center gap-2"><CalendarDays size={16} /> 14:00 - 15:30</div>
                  <div className="text-xs">قاعة 104</div>
                </div>
              </div>
            </div>
          </section>

          {/* E-Learning Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <MonitorPlay size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">التعليم الإلكتروني</h3>
              </div>
              <Link href="#" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 rounded-full border-[3px] border-blue-600 flex items-center justify-center font-bold text-blue-600 text-sm">
                  99%
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">المقررات والواجبات</h4>
                  <p className="text-xs text-gray-500 mt-1">12 واجب نشط • 4 اختبارات حديثة</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <ClipboardList size={20} />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="flex items-end gap-1 h-8">
                   <div className="w-2 bg-[#1A2E44] h-full rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[60%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[80%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[40%] rounded-t-sm"></div>
                   <div className="w-2 bg-gray-200 h-[70%] rounded-t-sm"></div>
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">إحصائيات الاختبارات</h4>
                  <p className="text-xs text-gray-500 mt-1">85% طالب أدوا الاختبار النهائي</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <BarChart3 size={20} />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Left Column (Narrower) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-8">
          
          {/* Sessions Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <CalendarDays size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">قسم الجلسات</h3>
              </div>
              <Link href="/sessions" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">جارية</span>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900 text-sm">جلسة مراجعة الفيزياء</h4>
                  <p className="text-xs text-gray-500 mt-1">أ. عمر طارق • 12:30 م</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MonitorPlay size={20} />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">قادمة</span>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900 text-sm">استشارات أكاديمية</h4>
                  <p className="text-xs text-gray-500 mt-1">د. نورة صالح • 02:00 م</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                  <MessageSquare size={20} />
                </div>
              </div>
            </div>
          </section>

          {/* Finance Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <Wallet size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">المالية</h3>
              </div>
              <Link href="/finance" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 rounded-full border-[3px] border-[#1A2E44] flex items-center justify-center font-bold text-[#1A2E44] text-sm">
                  65%
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">إجمالي الإيرادات</h4>
                  <p className="text-xs text-gray-500 mt-1">المحصل: 45,000 • المتبقي: 5,000</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Wallet size={20} />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
                 <div className="flex items-end gap-1 h-8">
                   <div className="w-2 bg-[#1A2E44] h-[80%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[60%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[40%] rounded-t-sm"></div>
                   <div className="w-2 bg-gray-200 h-[30%] rounded-t-sm"></div>
                   <div className="w-2 bg-gray-200 h-[20%] rounded-t-sm"></div>
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900">اتجاه التحصيل</h4>
                  <p className="text-xs text-gray-500 mt-1">نمو بنسبة 12% هذا الشهر</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>
          </section>

          {/* Reports Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <FileText size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold">التقارير</h3>
              </div>
              <Link href="/reports" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="space-y-4">
               <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-end gap-1 h-8">
                   <div className="w-2 bg-[#1A2E44] h-[60%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-[80%] rounded-t-sm"></div>
                   <div className="w-2 bg-[#1A2E44] h-full rounded-t-sm"></div>
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900 text-sm">تقرير الحضور</h4>
                  <p className="text-xs text-gray-500 mt-1">متوسط الحضور الأسبوعي: 92%</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600 text-xs">
                  جيد
                </div>
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-gray-900 text-sm">الأداء الأكاديمي</h4>
                  <p className="text-xs text-gray-500 mt-1">تحسن بنسبة 5% في نتائج الاختبارات</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <GraduationCap size={20} />
                </div>
              </div>
            </div>
          </section>

          {/* Teaching Team Section */}
          <section className="bg-blue-50/30 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#1A2E44]">
                <GraduationCap size={24} className="text-[#1A2E44]" />
                <h3 className="text-xl font-bold">فريق التدريس</h3>
              </div>
              <Link href="/team" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">ممتاز</span>
              <div className="flex-1 mr-4 text-right">
                <h4 className="font-bold text-gray-900 text-sm">أ. محمد إبراهيم</h4>
                <p className="text-xs text-gray-500 mt-1">كيمياء • 120 طالب</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative">
                  <Image src="https://i.pravatar.cc/150?u=a042581f4e29026024f" fill alt="Teacher" className="object-cover" />
              </div>
            </div>
          </section>

          {/* Financial Alerts */}
          <section className="bg-orange-50/50 rounded-[32px] p-6 border border-orange-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle size={24} />
                <h3 className="text-xl font-bold text-gray-900">التنبيهات المالية</h3>
              </div>
              <Link href="/notifications" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)]">عرض المزيد</Link>
            </div>
            
            <div className="space-y-3 bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-bold text-gray-700 text-sm">رصيد آجل مستحق</span>
                <span className="font-black text-red-500 text-lg">4,500 <span className="text-xs font-normal">ج.م</span></span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-700 text-sm">فروق خزينة اليوم</span>
                <span className="font-black text-yellow-500 text-lg">+120 <span className="text-xs font-normal">ج.م</span> <span className="text-xs text-yellow-500">▲</span></span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
