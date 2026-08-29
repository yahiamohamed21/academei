"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  PlayCircle, Clock, CheckCircle2, ChevronLeft, 
  FileText, Video, Folder, BookOpen, AlertCircle, Info,
  MonitorPlay, GraduationCap, FileSignature, FileKey, CheckSquare, 
  BookMarked, Users, X, Megaphone, RefreshCw, Scale
} from "lucide-react";

export default function ELearningDashboard() {
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isAnnouncementsModalOpen, setIsAnnouncementsModalOpen] = useState(false);
  
  // Mock Data
  const stats = [
    { label: "الكورسات النشطة", value: "21", subtext: "+2 هذا الشهر", icon: <MonitorPlay size={20} className="text-blue-500" /> },
    { label: "المحاضرات", value: "84", subtext: "15 مكتملة", icon: <BookOpen size={20} className="text-blue-500" /> },
    { label: "الواجبات", value: "42", subtext: "8 قيد الانتظار", icon: <FileSignature size={20} className="text-amber-600" /> },
    { label: "الامتحانات", value: "6", subtext: "2 قادمة", icon: <FileKey size={20} className="text-red-500" /> },
  ];

  const lectures = [
    { title: "مراجعة شاملة على الفصل الأول: الكهربية", subtitle: "أ. محمود أحمد • بدأ منذ 15 دقيقة", status: "الآن", statusColor: "text-red-600 bg-red-50", icon: <PlayCircle size={24} className="text-red-600" /> },
    { title: "التفاعلات الكيميائية والاتزان", subtitle: "غداً • 10:00 صباحاً", status: "قادمة", statusColor: "text-blue-600 bg-blue-50", icon: <Clock size={24} className="text-blue-400" /> },
    { title: "الهندسة التحليلية - الدرس الأول", subtitle: "بانتظار تحديد الموعد", status: "مغلقة", statusColor: "text-gray-500 bg-gray-100", icon: <CheckSquare size={24} className="text-gray-400" /> },
  ];

  const activeCourses = [
    { title: "الرياضيات المتقدمة (التفاضل)", teacher: "أ. كريم مصطفى", progress: 65, students: 124, icon: <BookOpen size={24} className="text-blue-600" /> },
    { title: "الفيزياء الحديثة والمغناطيسية", teacher: "أ. هاني سيف", progress: 24, students: 89, icon: <MonitorPlay size={24} className="text-blue-600" /> },
  ];

  const files = [
    { title: "ملخص قوانين الفيزياء (الباب الثاني)", type: "pdf", color: "text-red-500 bg-red-50", icon: <FileText size={24} /> },
    { title: "تدريبات - النحو الشاملة (وورد)", type: "doc", color: "text-blue-600 bg-blue-50", icon: <FileText size={24} /> },
    { title: "تسجيل مراجعة ليلة الامتحان", type: "video", color: "text-blue-400 bg-blue-50", icon: <Video size={24} /> },
    { title: "خرائط ذهنية - الكيمياء العضوية", type: "folder", color: "text-amber-700 bg-amber-50", icon: <Folder size={24} /> },
  ];

  const announcements = [
    { title: "تأجيل محاضرة الرياضيات", desc: "تم تأجيل محاضرة اليوم لغد في نفس الموعد نظراً لأعمال الصيانة بالمنصة.", type: "alert", icon: <AlertCircle size={20} className="text-red-500" /> },
    { title: "فتح باب التسجيل للكورس المكثف", desc: "يمكنكم الآن الانضمام لمجموعة المراجعة النهائية لمادة الفيزياء عبر صفحة الكورسات.", type: "info", icon: <Info size={20} className="text-blue-600" /> },
  ];

  const detailedAnnouncements = [
    {
      id: 1,
      title: "تنبيه عاجل: تأجيل محاضرة الرياضيات",
      subtitle: "قسم العلوم الدقيقة • أولوية قصوى",
      type: "alert",
      icon: <AlertCircle size={20} className="text-red-500" />,
      content: (
        <>
          <p className="text-[11px] text-gray-600 font-medium leading-loose mb-3">
            نظراً لأعمال الصيانة الطارئة في المبنى ج (القاعات 301-305)، تقرر تأجيل محاضرة الرياضيات التطبيقية للمجموعة الرابعة المقررة اليوم الثلاثاء.
          </p>
          <ul className="space-y-2 text-[10px] text-gray-600 font-bold leading-relaxed pr-2">
            <li><span className="text-gray-800">السبب:</span> صيانة طارئة لنظام التكييف المركزي والشبكة.</li>
            <li><span className="text-gray-800">الموعد البديل:</span> يوم الخميس القادم في تمام الساعة 10:00 صباحاً.</li>
            <li><span className="text-gray-800">القاعة الجديدة:</span> المدرج الرئيسي المبنى أ.</li>
          </ul>
        </>
      )
    },
    {
      id: 2,
      title: "إشعار هام: فتح باب التسجيل للكورسات المكثفة",
      subtitle: "شؤون الطلاب • تسجيلات",
      type: "info",
      icon: <Info size={20} className="text-[#001c56]" />,
      content: (
        <>
          <p className="text-[11px] text-gray-600 font-medium leading-loose mb-3">
            تعلن إدارة التسجيل عن فتح باب القبول للدورات المكثفة للتحضير للامتحانات النهائية للفصل الدراسي الحالي.
          </p>
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
            <h5 className="text-[10px] font-extrabold text-[#001c56] mb-2">تفاصيل الحجز والمقاعد:</h5>
            <ul className="list-disc list-inside space-y-1 text-[10px] text-gray-600 font-medium leading-relaxed marker:text-[#001c56]">
              <li>المجموعات النهائية محدودة (25 طالب لكل مجموعة كحد أقصى).</li>
              <li>أولوية الحجز للطلاب المشتركين في التقييم الفصلي.</li>
              <li>يغلق التسجيل باكتمال العدد أو بنهاية دوام يوم الأربعاء.</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 3,
      title: "توجيه إداري: تعليمات حضور الامتحانات الشهرية",
      subtitle: "لجنة المراقبة • لوائح وقوانين",
      type: "admin",
      icon: <Scale size={20} className="text-[#001c56]" />,
      content: (
        <>
          <p className="text-[11px] text-gray-600 font-medium leading-loose mb-3">
            يرجى من جميع الطلاب الالتزام التام بالتعليمات التالية لضمان سير عملية الامتحانات الشهرية بانتظام وبدون عوائق إدارية:
          </p>
          <ul className="space-y-3 text-[10px] text-gray-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2 flex-row-reverse">
              <div className="mt-0.5 shrink-0"><CheckSquare size={14} className="text-gray-400" /></div>
              <p><strong className="text-gray-800">قواعد الدخول:</strong> لن يسمح بالدخول لقاعة الامتحان بدون إبراز البطاقة الجامعية سارية المفعول.</p>
            </li>
            <li className="flex items-start gap-2 flex-row-reverse">
              <div className="mt-0.5 shrink-0"><AlertCircle size={14} className="text-gray-400" /></div>
              <p><strong className="text-gray-800">الأجهزة الإلكترونية:</strong> يمنع منعاً باتاً اصطحاب الهواتف المحمولة أو الساعات الذكية إلى مقاعد الاختبار.</p>
            </li>
            <li className="flex items-start gap-2 flex-row-reverse">
              <div className="mt-0.5 shrink-0"><Clock size={14} className="text-gray-400" /></div>
              <p><strong className="text-gray-800">توقيتات الجلسة:</strong> تفتح المنصة الإلكترونية للاختبارات الرقمية قبل 10 دقائق من الموعد وتغلق تلقائياً في الوقت المحدد.</p>
            </li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      title: "تحديث النظام: إطلاق المناهج الرقمية الجديدة",
      subtitle: "تقنية المعلومات • تحديث دوري",
      type: "update",
      icon: <RefreshCw size={20} className="text-[#001c56]" />,
      content: (
        <>
          <p className="text-[11px] text-gray-600 font-medium leading-loose mb-2">
            تم تحديث منصة التعلم الذكي لرفع النسخ النهائية للمناهج الرقمية التفاعلية للفصل الدراسي الثاني.
          </p>
          <p className="text-[11px] text-gray-600 font-medium leading-loose mb-2">
            يتضمن التحديث الجديد ميزات إضافية لدعم المذاكرة الذاتية، وتشمل:
          </p>
          <ul className="space-y-1 text-[10px] text-gray-600 font-medium leading-relaxed pr-3 border-r-[1.5px] border-blue-200 mr-1 mt-2">
            <li>تحديثات أسبوعية لبنك الأسئلة والاختبارات القصيرة المدمجة.</li>
            <li>ملخصات مرئية (خرائط ذهنية) بنهاية كل وحدة دراسية.</li>
            <li>إتاحة مسارات "مراجعات ليلة الامتحان" المخصصة للتركيز على النقاط المحورية.</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 space-y-6 xl:space-y-8">
      
      {/* Hero Section */}
      <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center border border-gray-100 shadow-sm relative min-h-[300px]">
        
        {/* Right Content */}
        <div className="p-8 md:p-12 md:pr-16 w-full md:w-1/2 flex flex-col justify-center text-center md:text-right z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#001c56] mb-4 leading-tight">
            مستقبلك يبدأ هنا: تعلم بذكاء
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base mb-8 max-w-md ml-auto">
            منصة إنجاز توفر لك أفضل الكورسات التعليمية والمحاضرات التفاعلية للوصول إلى القمة.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-end">
            <button className="px-8 py-3.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-sm transition-colors shadow-lg shadow-blue-900/20 w-full sm:w-auto">
              ابدأ التعلم الآن
            </button>
            <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-[#001c56] border-2 border-gray-100 rounded-full font-bold text-sm transition-colors w-full sm:w-auto">
              استكشف الكورسات
            </button>
          </div>
        </div>

        {/* Left Image Mask */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent z-10 hidden md:block"></div>
          {/* Circular mask for image */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-white shadow-2xl overflow-hidden z-20 shrink-0">
            <Image 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
              alt="Students studying"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative blur blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 xl:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 min-w-[150px] bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <div className="text-[10px] text-gray-500 font-bold mb-1">{stat.label}</div>
            <div className="text-2xl font-extrabold text-[#001c56] mb-1">{stat.value}</div>
            <div className="text-[9px] text-gray-400 font-bold">{stat.subtext}</div>
          </div>
        ))}
        {/* Progress Stat */}
        <div className="flex-1 min-w-[200px] bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center gap-3">
          <div className="flex justify-between items-center text-[11px] font-bold text-gray-500">
            <span>متوسط تقدم الطلاب</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookMarked size={14} />
            </div>
          </div>
          <div className="flex items-end gap-3 flex-row-reverse justify-end">
            <div className="text-3xl font-extrabold text-[#001c56]">%78</div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 flex justify-end">
            <div className="bg-[#001c56] h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
        
        {/* Right Column (Wider) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 xl:gap-8 order-2 lg:order-1">
          
          {/* Lectures */}
          <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <Link href="/e-learning/lectures" className="text-xs font-bold text-[#001c56] hover:underline flex items-center gap-1">
                <ChevronLeft size={14} /> عرض المحاضرات
              </Link>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                المحاضرات <MonitorPlay size={20} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="space-y-4">
              {lectures.map((lecture, i) => (
                <div key={i} className="bg-[#f8fafc] rounded-3xl p-4 flex items-center justify-between gap-4 border border-gray-50 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-4 text-right flex-row-reverse w-full justify-between">
                    <div className="flex items-center gap-4 flex-row-reverse">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        {lecture.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-row-reverse">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${lecture.statusColor}`}>
                            {lecture.status === 'الآن' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1 animate-pulse"></span>}
                            {lecture.status}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400">الكيمياء • الصف الثالث الثانوي</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-[#001c56] mb-1">{lecture.title}</h4>
                        <p className="text-[10px] text-gray-500 font-medium">{lecture.subtitle}</p>
                      </div>
                    </div>
                    {lecture.status === 'الآن' && (
                      <button className="px-6 py-2.5 bg-[#001c56] text-white rounded-full text-xs font-bold shrink-0 hover:bg-blue-900 transition-colors shadow-md">
                        ابدأ الآن
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <Link href="/e-learning/courses" className="text-xs font-bold text-[#001c56] hover:underline flex items-center gap-1">
                <ChevronLeft size={14} /> عرض الكورسات
              </Link>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                الكورسات النشطة <BookOpen size={20} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCourses.map((course, i) => (
                <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 shadow-sm border border-gray-50">
                      الصف الثالث
                    </span>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      {course.icon}
                    </div>
                  </div>
                  <div className="text-right mb-6">
                    <h3 className="text-base font-extrabold text-[#001c56] mb-1">{course.title}</h3>
                    <p className="text-[11px] text-gray-500 font-bold">{course.teacher}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                        <span className="text-[#001c56]">{course.progress}%</span>
                        <span className="text-gray-400">التقدم الإجمالي</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 flex justify-end">
                        <div className="bg-[#001c56] h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200/50">
                      <button className="text-xs font-bold text-[#001c56] hover:underline">متابعة</button>
                      <div className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <Users size={12} /> {course.students} طالب
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments & Exams (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
            
            {/* Assignments */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <Link href="/e-learning/assignments" className="text-xs font-bold text-[#001c56] hover:underline">عرض الكل</Link>
                <h2 className="text-base font-bold text-[#001c56] flex items-center gap-2">
                  الواجبات <FileSignature size={18} className="text-[#001c56]" />
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 flex-row-reverse">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <FileText size={18} className="text-gray-400" />
                  </div>
                  <div className="text-right w-full mr-4 pr-4 border-r-2 border-red-500">
                    <h4 className="text-[11px] font-extrabold text-[#001c56] mb-1">تطبيقات على الباب الأول</h4>
                    <p className="text-[9px] font-bold text-red-500">متأخر - الكيمياء</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 flex-row-reverse">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <FileText size={18} className="text-gray-400" />
                  </div>
                  <div className="text-right w-full mr-4 pr-4 border-r-2 border-[#001c56]">
                    <h4 className="text-[11px] font-extrabold text-[#001c56] mb-1">مسائل الاستاتيكا</h4>
                    <p className="text-[9px] font-bold text-gray-500">الرياضيات - غداً 12 م</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exams */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <Link href="/e-learning/exams" className="text-xs font-bold text-[#001c56] hover:underline">عرض الكل</Link>
                <h2 className="text-base font-bold text-[#001c56] flex items-center gap-2">
                  الامتحانات <FileKey size={18} className="text-[#001c56]" />
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 flex-row-reverse">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <FileKey size={18} className="text-gray-400" />
                  </div>
                  <div className="text-right w-full mr-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-[11px] font-extrabold text-[#001c56] mb-1">اختبار شهر أكتوبر</h4>
                      <p className="text-[9px] font-bold text-gray-500">الفيزياء - تم التقييم</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-[#001c56]">18/20</div>
                      <div className="text-[9px] font-bold text-green-500">ممتاز</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-100 flex-row-reverse">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <PlayCircle size={18} className="text-blue-500" />
                  </div>
                  <div className="text-right w-full mr-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-[11px] font-extrabold text-[#001c56] mb-1">امتحان نصف التيرم</h4>
                      <p className="text-[9px] font-bold text-blue-600">اللغة العربية - متاح الآن</p>
                    </div>
                    <button className="px-3 py-1 bg-[#001c56] text-white rounded-full text-[9px] font-bold">ابدأ</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Left Column (Narrower) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 xl:gap-8 order-1 lg:order-2">
          
          {/* Files & Resources */}
          <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <Link href="/e-learning/files" className="text-xs font-bold text-[#001c56] hover:underline">عرض الكل</Link>
              <h2 className="text-base font-bold text-[#001c56] flex items-center gap-2">
                الملفات والمصادر <Folder size={18} className="text-[#001c56]" />
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {files.map((file, i) => (
                <div key={i} className="bg-gray-50 rounded-3xl p-4 flex flex-col items-center text-center justify-center border border-gray-100 hover:shadow-md transition-shadow cursor-pointer min-h-[110px]">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${file.color}`}>
                    {file.icon}
                  </div>
                  <h4 className="text-[9px] font-bold text-gray-700 leading-tight px-2">{file.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Study Progress */}
          <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsProgressModalOpen(true)} className="text-xs font-bold text-[#001c56] hover:underline">تفاصيل</button>
              <h2 className="text-base font-bold text-[#001c56] flex items-center gap-2">
                التقدم الدراسي <CheckCircle2 size={18} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 w-8">%92</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 flex justify-end">
                  <div className="bg-[#001c56] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-xs font-bold text-gray-700 w-12 text-right">الحضور</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 w-8">%85</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 flex justify-end">
                  <div className="bg-[#475569] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-xs font-bold text-gray-700 w-12 text-right">الواجبات</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 w-8">%60</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 flex justify-end">
                  <div className="bg-amber-900 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-xs font-bold text-gray-700 w-12 text-right">التفاعل</span>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-[32px] p-6 xl:p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsAnnouncementsModalOpen(true)} className="text-xs font-bold text-[#001c56] hover:underline">سجل الإعلانات</button>
              <h2 className="text-base font-bold text-[#001c56] flex items-center gap-2">
                التعليمات <AlertCircle size={18} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="space-y-4">
              {announcements.map((ann, i) => (
                <div key={i} className={`rounded-2xl p-4 border text-right flex flex-col items-end ${ann.type === 'alert' ? 'bg-red-50/50 border-red-100' : 'bg-blue-50/50 border-blue-100'}`}>
                  <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                    {ann.icon}
                    <h4 className={`text-xs font-bold ${ann.type === 'alert' ? 'text-red-600' : 'text-[#001c56]'}`}>{ann.title}</h4>
                  </div>
                  <p className="text-[10px] text-gray-600 font-medium leading-relaxed">
                    {ann.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Study Progress Modal / Slide-over */}
      {isProgressModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#f8fafc] w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[32px] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
              <button onClick={() => setIsProgressModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                سجل التقدم الدراسي التفصيلي
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#001c56] flex items-center justify-center shadow-sm">
                  <BookMarked size={14} />
                </div>
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Chart Area */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
                <h3 className="text-sm font-bold text-[#001c56] text-right mb-4">المنحنى التحليلي للأداء</h3>
                <div className="h-48 w-full bg-gray-50/80 rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex justify-evenly">
                    <div className="w-px h-full bg-gray-200/60"></div>
                    <div className="w-px h-full bg-gray-200/60"></div>
                    <div className="w-px h-full bg-gray-200/60"></div>
                    <div className="w-px h-full bg-gray-200/60"></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-evenly">
                    <div className="h-px w-full bg-gray-200/60"></div>
                    <div className="h-px w-full bg-gray-200/60"></div>
                  </div>
                  {/* SVG Line */}
                  <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#001c56" floodOpacity="0.3" />
                      </filter>
                    </defs>
                    <path 
                      d="M 5,80 C 20,60 25,30 40,50 C 50,70 55,90 65,40 C 70,10 75,20 85,90 C 90,95 95,50 95,30" 
                      fill="none" 
                      stroke="#2e4272" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#shadow)"
                    />
                  </svg>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                
                {/* Item 1 */}
                <div className="bg-white rounded-full p-4 flex flex-col gap-2 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-extrabold text-[#001c56]">92%</span>
                    <span className="text-[11px] font-bold text-gray-500">معدل الحضور والانتظام</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-[#001c56] h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-white rounded-full p-4 flex flex-col gap-2 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-extrabold text-[#001c56]">85%</span>
                    <span className="text-[11px] font-bold text-gray-500">إنجاز الواجبات المنزلية</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-[#001c56] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-white rounded-full p-4 flex flex-col gap-2 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-extrabold text-[#001c56]">60%</span>
                    <span className="text-[11px] font-bold text-gray-500">التفاعل الصفي والمشاركة</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-[#8b9bc3] h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="bg-white rounded-full p-4 flex flex-col gap-2 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-extrabold text-[#001c56]">88%</span>
                    <span className="text-[11px] font-bold text-gray-500">متوسط درجات الاختبارات الشهرية</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-[#001c56] h-1.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Announcements Modal / Slide-over */}
      {isAnnouncementsModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#f8fafc] w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[32px] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-white">
              <button onClick={() => setIsAnnouncementsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-1">
                <X size={20} className="text-gray-500" />
              </button>
              <div className="text-right">
                <h2 className="text-lg font-extrabold text-[#001c56] flex items-center justify-end gap-3 mb-1">
                  سجل التعليمات والإرشادات الأكاديمية الشامل
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#001c56] flex items-center justify-center shadow-sm shrink-0">
                    <Megaphone size={14} />
                  </div>
                </h2>
                <p className="text-[9px] font-bold text-gray-400 pr-11">آخر تحديث: اليوم، 09:30 صباحاً</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {detailedAnnouncements.map((ann) => (
                <div key={ann.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 text-right">
                  <div className="flex items-start justify-end gap-3 mb-4">
                    <div className="text-right">
                      <h3 className={`text-[13px] font-extrabold mb-1 ${ann.type === 'alert' ? 'text-red-600' : 'text-[#001c56]'}`}>{ann.title}</h3>
                      <p className="text-[9px] font-bold text-gray-400">{ann.subtitle}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${ann.type === 'alert' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#001c56]'}`}>
                      {ann.icon}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {ann.content}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
