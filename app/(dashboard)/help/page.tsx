"use client";

import React, { useState } from "react";
import { Search, HelpCircle, Mail, MessageCircle, Phone, ChevronDown, BookOpen, Video, FileText } from "lucide-react";

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "كيف يمكنني إضافة طالب جديد للنظام؟",
      answer: "يمكنك إضافة طالب جديد بالذهاب إلى صفحة 'الطلاب' من القائمة الجانبية، ثم النقر على زر 'إضافة طالب جديد' أعلى يسار الصفحة وتعبئة البيانات المطلوبة."
    },
    {
      question: "هل يمكنني تصدير التقارير المالية بصيغة Excel؟",
      answer: "نعم، يمكنك التوجه إلى صفحة 'التقارير'، وستجد ضمن قسم 'تقارير جاهزة للتصدير' خيارات متعددة لتحميل التقارير بصيغ PDF و Excel."
    },
    {
      question: "كيف أقوم بجدولة حصة مباشرة جديدة (Live)؟",
      answer: "من صفحة 'الجلسات'، اضغط على زر 'جدولة جلسة جديدة'. قم باختيار المجموعة المستهدفة، تحديد الموعد، وسيقوم النظام بإنشاء رابط البث تلقائياً."
    },
    {
      question: "نسيت كلمة المرور الخاصة بحسابي، ماذا أفعل؟",
      answer: "يمكنك النقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، وسيتم إرسال رابط لإعادة تعيين كلمة المرور إلى بريدك الإلكتروني المسجل لدينا."
    },
    {
      question: "كيف يمكنني تجميد أو إيقاف اشتراك طالب مؤقتاً؟",
      answer: "من خلال الدخول إلى الملف الشخصي للطالب (عبر صفحة الطلاب)، يمكنك النقر على أيقونة الإيقاف المؤقت (Pause) وتأكيد الإجراء."
    }
  ];

  const categories = [
    { icon: BookOpen, title: "أدلة الاستخدام", desc: "شروحات خطوة بخطوة للمنصة", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Video, title: "شروحات فيديو", desc: "فيديوهات تعليمية قصيرة", color: "text-red-600", bg: "bg-red-50" },
    { icon: FileText, title: "السياسات والشروط", desc: "سياسة الخصوصية والاستخدام", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#001c56] to-blue-900 rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 opacity-10 rotate-12 scale-150 transform translate-x-10 -translate-y-10">
          <HelpCircle size={300} />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-black mb-4">كيف يمكننا مساعدتك؟</h1>
          <p className="text-blue-200 text-lg md:text-xl font-medium mb-8">
            ابحث في قاعدة المعرفة الخاصة بنا أو تصفح الأسئلة الشائعة للوصول السريع للإجابات.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="ابحث عن سؤالك هنا..." 
              className="w-full h-16 rounded-2xl border-none bg-white text-gray-900 pr-14 pl-6 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-shadow shadow-xl placeholder:font-medium placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
              <cat.icon size={28} />
            </div>
            <div>
              <h3 className="font-extrabold text-[#001c56] text-lg mb-1">{cat.title}</h3>
              <p className="text-gray-500 text-sm font-medium">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: FAQs and Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-[#001c56] flex items-center gap-2">
            الأسئلة الشائعة
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 transition-colors hover:bg-gray-50/50">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-right outline-none"
                >
                  <span className={`font-extrabold text-lg ${activeFaq === idx ? 'text-[var(--primary)]' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-[#001c56] shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 bg-[#001c56] text-white' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 font-medium leading-relaxed pr-2 border-r-4 border-[var(--primary)]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#001c56]">
            لم تجد إجابتك؟
          </h2>
          <div className="space-y-4">
            
            <a href="mailto:support@academei.com" className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#001c56] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-extrabold text-[#001c56] text-lg mb-1">راسلنا عبر البريد</h3>
              <p className="text-gray-500 text-sm font-medium mb-3">نرد عادة خلال 24 ساعة عمل.</p>
              <p className="font-bold text-[var(--primary)]" dir="ltr">support@academei.com</p>
            </a>
            
            <a href="#" className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-extrabold text-[#001c56] text-lg mb-1">الدعم عبر الواتساب</h3>
              <p className="text-gray-500 text-sm font-medium mb-3">متاح من 9 ص إلى 5 م يومياً.</p>
              <p className="font-bold text-green-600" dir="ltr">+966 50 123 4567</p>
            </a>

          </div>
        </div>

      </div>

    </div>
  );
}
