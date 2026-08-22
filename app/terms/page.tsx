"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "1. القبول بالشروط",
      content: "باستخدامك لمنصة أكاديميا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا."
    },
    {
      title: "2. وصف الخدمة",
      content: "توفر أكاديميا منصة إلكترونية متكاملة لإدارة المراكز التعليمية (السناتر) وتسهيل التواصل بين الإدارة والمدرسين والطلاب. نحتفظ بالحق في تعديل أو إيقاف أي جزء من الخدمة في أي وقت."
    },
    {
      title: "3. التزامات المستخدم",
      content: "يجب على المستخدم تقديم معلومات دقيقة وصحيحة عند التسجيل. أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور، وعن جميع الأنشطة التي تحدث تحت حسابك."
    },
    {
      title: "4. حقوق الملكية الفكرية",
      content: "جميع المحتويات الموجودة على المنصة، بما في ذلك النصوص والرسومات والشعارات والأكواد، هي ملكية حصرية لأكاديميا ومحمية بقوانين حقوق النشر والملكية الفكرية."
    },
    {
      title: "5. سياسة الدفع والاسترداد",
      content: "تخضع جميع المدفوعات والاشتراكات للشروط المحددة في خطة الاشتراك. المبالغ المدفوعة غير قابلة للاسترداد إلا في الحالات المنصوص عليها صراحة في سياسة الاسترداد الخاصة بنا."
    },
    {
      title: "6. التعديلات على الشروط",
      content: "نحتفظ بالحق في تحديث أو تعديل هذه الشروط في أي وقت. سنقوم بإبلاغ المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار على المنصة."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-[#001c56] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-500/20 text-white rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">الشروط والأحكام</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto font-medium">
            يرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام منصة أكاديميا.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto">
          
          <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
            <p className="text-sm font-bold text-gray-500">آخر تحديث: 20 أغسطس 2026</p>
            <Link href="/">
              <Button variant="outline" className="gap-2 font-bold text-[#001c56] border-gray-200 hover:bg-gray-50 rounded-xl">
                العودة للرئيسية <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-black text-[#001c56] mb-4">{section.title}</h2>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 bg-blue-50/50 p-6 rounded-2xl text-center">
            <h3 className="font-bold text-[#001c56] mb-2">للاستفسارات والملاحظات</h3>
            <p className="text-sm text-gray-600 mb-4">إذا كان لديك أي سؤال حول الشروط والأحكام، يسعدنا تواصلك معنا.</p>
            <Link href="/help">
              <Button className="bg-[#001c56] hover:bg-[#001033] text-white font-bold px-8 rounded-xl">
                مركز المساعدة
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
