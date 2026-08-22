"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. جمع المعلومات",
      content: "نقوم بجمع المعلومات الشخصية التي تقدمها لنا طواعية عند التسجيل في منصة أكاديميا، مثل الاسم، البريد الإلكتروني، ورقم الهاتف. كما نقوم بجمع معلومات حول استخدامك للمنصة لتحسين تجربة المستخدم."
    },
    {
      title: "2. استخدام المعلومات",
      content: "نستخدم معلوماتك لتقديم خدماتنا وتحسينها، وتخصيص تجربتك، والتواصل معك بخصوص حسابك، وإرسال التحديثات الهامة حول النظام والتغييرات في سياساتنا."
    },
    {
      title: "3. حماية البيانات",
      content: "نحن نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. نستخدم تقنيات التشفير المتقدمة لحماية بياناتك الحساسة."
    },
    {
      title: "4. مشاركة المعلومات",
      content: "لا نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط مع مزودي الخدمات الموثوقين الذين يساعدوننا في تشغيل المنصة، وذلك بموجب اتفاقيات سرية صارمة."
    },
    {
      title: "5. حقوق المستخدم",
      content: "لك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك أيضاً سحب موافقتك على معالجة البيانات من خلال إعدادات حسابك أو بالتواصل مع فريق الدعم."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-[#001c56] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-500/20 text-white rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">سياسة الخصوصية</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto font-medium">
            نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك.
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
            <h3 className="font-bold text-[#001c56] mb-2">هل لديك أسئلة حول سياسة الخصوصية؟</h3>
            <p className="text-sm text-gray-600 mb-4">فريق الدعم الفني لدينا متاح دائماً للإجابة على استفساراتك.</p>
            <Link href="/help">
              <Button className="bg-[#001c56] hover:bg-[#001033] text-white font-bold px-8 rounded-xl">
                تواصل معنا
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
