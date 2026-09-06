"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Users, BookOpen, MonitorPlay, Wallet, CheckCircle2, ChevronLeft, ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#001c56] rounded-xl flex items-center justify-center shadow-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-black text-2xl text-[#001c56] tracking-tight">أكاديميا</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-gray-500">
            <Link href="#features" className="hover:text-[#001c56] transition-colors">المميزات</Link>
            <Link href="#how-it-works" className="hover:text-[#001c56] transition-colors">كيف نعمل</Link>
            <Link href="#pricing" className="hover:text-[#001c56] transition-colors">الأسعار</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="font-bold text-gray-600 hover:text-[#001c56] transition-colors text-sm">
              دخول
            </Link>
            <Link href="/subscribe">
              <Button className="bg-[#001c56] hover:bg-[#001033] text-white font-bold h-10 px-5 rounded-xl text-sm">
                ابدأ مجاناً
              </Button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4 font-bold text-gray-600 text-center">
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>المميزات</Link>
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>كيف نعمل</Link>
              <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>الأسعار</Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold">دخول</Button>
              </Link>
              <Link href="/subscribe" className="w-full">
                <Button className="w-full bg-[#001c56] text-white h-12 rounded-xl font-bold">ابدأ مجاناً</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#001c56] font-bold text-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              المنصة رقم #1 لإدارة المراكز التعليمية
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#001c56] leading-tight tracking-tight">
              أدر مركزك التعليمي <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">باحترافية وسهولة</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              أكاديميا هي المنصة المتكاملة لإدارة الأكاديميات ومراكز الدروس الخصوصية. تحكم في الحضور، الحسابات، والجلسات الحية من مكان واحد بكل سهولة وأمان.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/subscribe" className="w-full sm:w-auto">
                <Button className="w-full bg-[#001c56] hover:bg-[#001033] text-white h-14 px-8 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-blue-900/20">
                  اشترك الآن مجاناً
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-8 rounded-2xl font-bold text-lg text-gray-700 border-gray-200 hover:bg-gray-50">
                  تصفح لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard Preview"
                width={800}
                height={600}
                className="object-cover w-full h-[400px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001c56]/80 to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#001c56]">
                      <MonitorPlay size={24} />
                    </div>
                    <div>
                      <p className="font-bold">جلسة الكيمياء بدأت الآن</p>
                      <p className="text-sm text-blue-200">الاستاذ محمد عبد الله • 120 طالب</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -left-10 top-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce delay-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">إجمالي الإيرادات</p>
                  <p className="font-black text-[#001c56]">+45,000 ج.م</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 bg-[#001c56] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-blue-200 text-sm font-bold mb-8 uppercase tracking-wider">موثوق من قبل المئات من المراكز التعليمية</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <h2 className="text-2xl font-black">أكاديمية المعرفة</h2>
            <h2 className="text-2xl font-black">سنتر النور</h2>
            <h2 className="text-2xl font-black">مدارس القمة</h2>
            <h2 className="text-2xl font-black">الرواد للتعليم</h2>
            <h2 className="text-2xl font-black">نظام المستقبل</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-blue-600 bg-blue-50 inline-block px-4 py-1.5 rounded-full mb-4">كل ما تحتاجه في مكان واحد</h2>
          <h3 className="text-4xl font-black text-[#001c56] mb-16">أقوى المميزات لإدارة مركزك</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                <Users size={28} />
              </div>
              <h4 className="text-xl font-extrabold text-[#001c56] mb-3">إدارة الطلاب والمجموعات</h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                سجل الطلاب، وزعهم على المجموعات، وتابع حضورهم وغيابهم بكل دقة وسهولة عبر النظام.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                <Wallet size={28} />
              </div>
              <h4 className="text-xl font-extrabold text-[#001c56] mb-3">النظام المالي المتقدم</h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                تتبع الاشتراكات، المدفوعات، والإيرادات بشكل آلي، مع إصدار تقارير مالية دقيقة لكل طالب ومعلم.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                <MonitorPlay size={28} />
              </div>
              <h4 className="text-xl font-extrabold text-[#001c56] mb-3">البث المباشر والتسجيلات</h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                قم بجدولة وإدارة الجلسات الحية عن بعد، مع إمكانية رفع التسجيلات ليراجعها الطلاب في أي وقت.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-blue-600 bg-blue-50 inline-block px-4 py-1.5 rounded-full mb-4">بكل بساطة وسلاسة</h2>
          <h3 className="text-4xl font-black text-[#001c56] mb-16">كيف تبدأ مع أكاديميا؟</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-100 -z-10" />

            <div className="space-y-4">
              <div className="w-24 h-24 bg-white border-4 border-blue-50 text-[#001c56] rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-sm">1</div>
              <h4 className="text-xl font-extrabold text-[#001c56]">أنشئ حسابك</h4>
              <p className="text-gray-500 font-medium">سجل بيانات مركزك التعليمي في أقل من دقيقة لتجهيز بيئة العمل الخاصة بك.</p>
            </div>

            <div className="space-y-4">
              <div className="w-24 h-24 bg-white border-4 border-blue-50 text-[#001c56] rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-sm">2</div>
              <h4 className="text-xl font-extrabold text-[#001c56]">أضف فريقك وطلابك</h4>
              <p className="text-gray-500 font-medium">قم بإضافة المعلمين، دعوة الطلاب، وتنظيم المجموعات الدراسية بسهولة.</p>
            </div>

            <div className="space-y-4">
              <div className="w-24 h-24 bg-[#001c56] text-white border-4 border-blue-100 rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-lg shadow-blue-900/20">3</div>
              <h4 className="text-xl font-extrabold text-[#001c56]">ابدأ الإدارة باحترافية</h4>
              <p className="text-gray-500 font-medium">استمتع بتجربة إدارة سلسة ومتابعة دقيقة لكل تفاصيل الأكاديمية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-blue-600 bg-blue-50 inline-block px-4 py-1.5 rounded-full mb-4">أسعار تناسب الجميع</h2>
          <h3 className="text-4xl font-black text-[#001c56] mb-16">باقات مرنة لنمو أعمالك</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 text-right">
              <h4 className="text-2xl font-black text-[#001c56] mb-2">الباقة الأساسية</h4>
              <p className="text-gray-500 font-medium mb-6">مثالية للمراكز التعليمية الناشئة والمدرسين المستقلين.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-[#001c56]">مجاناً</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600 font-medium"><CheckCircle2 className="text-green-500" size={20} /> إدارة حتى 100 طالب</li>
                <li className="flex items-center gap-3 text-gray-600 font-medium"><CheckCircle2 className="text-green-500" size={20} /> تقارير حضور وانصراف أساسية</li>
                <li className="flex items-center gap-3 text-gray-600 font-medium"><CheckCircle2 className="text-green-500" size={20} /> إدارة الحسابات المالية البسيطة</li>
              </ul>
              <Link href="/subscribe">
                <Button variant="outline" className="w-full h-14 rounded-xl font-bold text-lg text-[#001c56] border-[#001c56] hover:bg-blue-50">
                  ابدأ الآن
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#001c56] rounded-[2rem] p-8 shadow-2xl border border-blue-800 text-right text-white relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold text-xs px-4 py-1 rounded-br-xl">الأكثر شيوعاً</div>
              <h4 className="text-2xl font-black mb-2">الباقة الاحترافية</h4>
              <p className="text-blue-200 font-medium mb-6">للمراكز الكبيرة والأكاديميات التي تبحث عن أقصى إنتاجية.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">299</span>
                <span className="text-xl text-blue-200 ml-1">ج.م / شهرياً</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-blue-100 font-medium"><CheckCircle2 className="text-blue-400" size={20} /> عدد لا محدود من الطلاب</li>
                <li className="flex items-center gap-3 text-blue-100 font-medium"><CheckCircle2 className="text-blue-400" size={20} /> تقارير وإحصائيات متقدمة</li>
                <li className="flex items-center gap-3 text-blue-100 font-medium"><CheckCircle2 className="text-blue-400" size={20} /> تكامل كامل مع البث المباشر</li>
                <li className="flex items-center gap-3 text-blue-100 font-medium"><CheckCircle2 className="text-blue-400" size={20} /> دعم فني على مدار الساعة</li>
              </ul>
              <Link href="/subscribe">
                <Button className="w-full h-14 rounded-xl font-black text-lg bg-white text-[#001c56] hover:bg-gray-100 shadow-lg">
                  اشترك في الباقة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden z-0 mt-10">
        <div className="absolute inset-0 bg-[#001c56] skew-y-3 origin-bottom-right -z-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10 py-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">هل أنت مستعد لنقل أكاديميتك إلى المستوى التالي؟</h2>
          <p className="text-xl text-blue-200 mb-10 font-medium">
            انضم إلى المئات من المديرين الذين يثقون في أكاديميا لإدارة أعمالهم اليومية بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/subscribe">
              <Button className="w-full sm:w-auto bg-white text-[#001c56] hover:bg-gray-100 h-14 px-10 rounded-xl font-black text-lg">
                أنشئ حسابك الآن مجاناً
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" className="w-full sm:w-auto border-blue-400 text-white hover:bg-blue-800/50 h-14 px-10 rounded-xl font-bold text-lg">
                تواصل مع المبيعات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 text-center md:text-right border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <GraduationCap size={28} />
              <span className="font-black text-2xl">أكاديميا</span>
            </div>
            <p className="text-gray-400 font-medium max-w-sm mx-auto md:mx-0">
              المنصة الأفضل والأسهل لإدارة المراكز التعليمية والأكاديميات في الوطن العربي. بنيت بكل حب لخدمة التعليم.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 font-medium text-gray-400">
              <li><Link href="#features" className="hover:text-white transition-colors">المميزات</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">الأسعار</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">مركز المساعدة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">قانوني</h4>
            <ul className="space-y-2 font-medium text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">من نحن</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm font-medium">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} أكاديميا.
        </div>
      </footer>

    </div>
  );
}
