"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Phone, BookOpen, CreditCard, ChevronDown, Check, GraduationCap, ArrowRight, ShieldCheck, Zap, BarChart3, X, Landmark, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SubscribePage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math', 'english']);
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const subjects = [
    { id: 'math', name: 'الرياضيات المتقدمة', desc: 'الفصل الدراسي الأول', price: '150 ج.م' },
    { id: 'physics', name: 'الفيزياء', desc: 'الفصل الدراسي الأول', price: '120 ج.م' },
    { id: 'english', name: 'اللغة الإنجليزية', desc: 'الفصل الدراسي الأول', price: '100 ج.م' },
    { id: 'chemistry', name: 'الكيمياء', desc: 'الفصل الدراسي الأول', price: '130 ج.م' },
  ];

  const paymentMethods = [
    { id: 'cash', name: 'دفع كاش', icon: <CreditCard size={18} /> },
    { id: 'bank', name: 'تحويل بنكي', icon: <BookOpen size={18} /> },
    { id: 'card', name: 'بطاقة ائتمان', icon: <CreditCard size={18} /> },
  ];

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectedSubjectsData = subjects.filter(s => selectedSubjects.includes(s.id));
  const subtotal = selectedSubjectsData.reduce((acc, curr) => {
    const price = parseInt(curr.price.replace(/\D/g, ''));
    return acc + (isNaN(price) ? 0 : price);
  }, 0);
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-blue-100 selection:text-[#001c56]">

      {/* Right Side: Brand Panel */}
      <div className="hidden md:flex md:w-5/12 lg:w-4/12 relative bg-[#001c56] overflow-hidden flex-col justify-between p-12 text-white">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-[#001c56] to-gray-900 z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 mix-blend-overlay"></div>

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#001c56] shadow-xl">
              <GraduationCap size={28} />
            </div>
            <span className="font-black text-3xl tracking-tight">أكاديميا</span>
          </Link>
        </div>

        {/* Value Proposition */}
        <div className="relative z-10 space-y-8 mt-12 mb-auto pt-12">
          <h2 className="text-4xl font-black leading-tight">ابدأ رحلة النجاح <br /><span className="text-blue-400">لأكاديميتك اليوم</span></h2>
          <p className="text-blue-100/80 text-lg leading-relaxed font-medium max-w-sm">
            انضم إلى المنصة الأقوى لإدارة المراكز التعليمية في الوطن العربي. تحكم في كل شيء من مكان واحد.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20">
                <ShieldCheck size={20} />
              </div>
              <p className="font-bold">حماية تامة لبيانات طلابك</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20">
                <Zap size={20} />
              </div>
              <p className="font-bold">إدارة سريعة وبسيطة للمجموعات</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20">
                <BarChart3 size={20} />
              </div>
              <p className="font-bold">تقارير وإحصائيات دقيقة</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-4 text-sm text-blue-200/60 font-medium">
          <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
        </div>
      </div>

      {/* Left Side: Form Panel */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50/30">
        <div className="min-h-full flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24">

          <div className="w-full max-w-2xl mx-auto">
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden flex items-center gap-3 mb-10 justify-center">
              <div className="w-10 h-10 bg-[#001c56] rounded-xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={24} />
              </div>
              <span className="font-black text-2xl text-[#001c56] tracking-tight">أكاديميا</span>
            </div>

            {/* Back Button */}
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#001c56] font-bold text-sm mb-8 transition-colors">
              <ArrowRight size={16} /> العودة للصفحة الرئيسية
            </Link>

            <div className="mb-10">
              <h1 className="text-3xl font-black text-[#001c56] mb-3">إعداد حساب الأكاديمية</h1>
              <p className="text-gray-500 font-medium text-lg">أدخل بيانات مركزك التعليمي للبدء في استخدام النظام.</p>
            </div>

            <form className="space-y-8 bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100" onSubmit={(e) => e.preventDefault()}>

              {/* Basic Info Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-black text-[#001c56] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <User className="text-[var(--primary)]" size={20} /> البيانات الأساسية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block text-right">اسم السنتر أو الأكاديمية</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="أكاديمية المعرفة"
                        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block text-right">اسم المدير / المسؤول</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="أحمد محمد"
                        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block text-right">رقم الهاتف الأساسي</label>
                    <div className="flex gap-2" dir="ltr">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="100 123 4567"
                          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400 placeholder:font-medium text-left"
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                      <div className="relative w-28">
                        <select className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-3 pr-8 text-sm font-bold text-gray-900 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all cursor-pointer">
                          <option>+20 (مصر)</option>
                          <option>+966 (SA)</option>
                          <option>+971 (UAE)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block text-right">خطة الاشتراك (الباقة)</label>
                    <div className="relative">
                      <select className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm font-bold text-gray-900 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all cursor-pointer">
                        <option value="" disabled selected>اختر الباقة المناسبة</option>
                        <option value="basic">الباقة الأساسية (مجاناً)</option>
                        <option value="pro">الباقة الاحترافية (299 ج.م)</option>
                      </select>
                      <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects Section */}
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-black text-[#001c56] flex items-center gap-2">
                    <BookOpen className="text-[var(--primary)]" size={20} /> المواد والمناهج
                  </h3>
                  <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-bold">يمكنك اختيار أكثر من مادة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subjects.map(subject => (
                    <div
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedSubjects.includes(subject.id)
                          ? 'border-[#001c56] bg-blue-50/40 shadow-sm'
                          : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors ${selectedSubjects.includes(subject.id) ? 'bg-[#001c56] border-[#001c56]' : 'border-gray-300 bg-white'
                        }`}>
                        {selectedSubjects.includes(subject.id) && <Check size={14} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm mb-1 transition-colors ${selectedSubjects.includes(subject.id) ? 'text-[#001c56]' : 'text-gray-700'}`}>
                          {subject.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">{subject.desc}</p>
                      </div>
                      <div className="shrink-0 text-left">
                        <p className={`text-sm font-black ${selectedSubjects.includes(subject.id) ? 'text-[var(--primary)]' : 'text-gray-600'}`}>
                          {subject.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6 pt-4">
                <h3 className="text-lg font-black text-[#001c56] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <CreditCard className="text-[var(--primary)]" size={20} /> طريقة الدفع المفضلة
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${paymentMethod === method.id
                          ? 'border-[#001c56] bg-blue-50/40 shadow-sm text-[#001c56]'
                          : 'border-gray-100 bg-white hover:border-blue-200 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`${paymentMethod === method.id ? 'text-[#001c56]' : 'text-gray-400'}`}>
                        {method.icon}
                      </div>
                      <p className="font-bold text-sm">{method.name}</p>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#001c56]' : 'border-gray-300'}`}>
                        {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-[#001c56]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <p className="text-xs text-gray-400 font-medium text-center sm:text-right w-full sm:w-auto">
                  بالضغط على إتمام التسجيل، أنت توافق على <Link href="/terms" className="text-blue-500 hover:underline">شروط الاستخدام</Link>.
                </p>
                <Button onClick={() => setShowModal(true)} className="w-full sm:w-auto h-14 px-10 rounded-xl bg-[#001c56] hover:bg-[#001033] text-white font-black text-lg shadow-xl shadow-blue-900/20">
                  إتمام التسجيل الآن
                </Button>
              </div>

            </form>

            <p className="text-center text-gray-500 font-medium mt-8 mb-12">
              لديك حساب بالفعل؟ <Link href="/login" className="text-[#001c56] font-bold hover:underline">تسجيل الدخول</Link>
            </p>
          </div>

        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir="rtl">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="bg-blue-50/50 p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#001c56] mx-auto">تأكيد الدفع النهائي</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">

              {/* Fee Summary */}
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="font-bold text-[#001c56] mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" /> ملخص الرسوم
                </h3>

                <div className="space-y-4 mb-4">
                  {selectedSubjectsData.map(sub => (
                    <div key={sub.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">{sub.name}</span>
                      <span className="font-bold text-gray-900">{sub.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-4">
                    <span className="text-gray-600 font-medium">الضريبة (14%)</span>
                    <span className="font-bold text-gray-900">{tax} ج.م</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 -mx-6 -mb-6 p-6 flex justify-between items-center border-t border-blue-100 mt-6 rounded-b-2xl">
                  <div>
                    <span className="block text-xs text-gray-500 font-bold mb-1">طريقة الدفع المختارة</span>
                    <span className="font-bold text-[#001c56] flex items-center gap-2">
                      <CreditCard size={16} /> {paymentMethods.find(m => m.id === paymentMethod)?.name}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-gray-500 font-bold mb-1">الإجمالي النهائي</span>
                    <span className="text-2xl font-black text-[#001c56]">{total} ج.م</span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center mb-6">
                <div className="w-16 h-16 bg-[#001c56] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Landmark size={32} />
                </div>
                <h4 className="text-lg font-black text-[#001c56] mb-2">تعليمات الدفع النقدي</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                  يرجى توجه ولي الأمر أو الطالب لخزينة السنتر لسداد المبلغ الإجمالي ودفع الإيصال مؤقتاً
                </p>
              </div>

              {/* Receipt Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block text-right">رقم إيصال الخزينة (اختياري)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="أدخل رقم الإيصال إن وجد"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-white pr-4 pl-10 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400"
                  />
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">يساعد هذا الرقم في تتبع الدفعة بشكل أسرع في الاستقبال.</p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-3">
              <Button onClick={() => setShowModal(false)} variant="outline" className="w-full sm:w-1/3 h-12 rounded-xl font-bold text-gray-600 border-gray-200 hover:bg-gray-50">
                السابق
              </Button>
              <Button onClick={() => setIsSuccess(true)} className="w-full sm:w-2/3 h-12 rounded-xl bg-[#001c56] hover:bg-[#001033] text-white font-bold gap-2 shadow-md">
                <CheckCircle2 size={18} /> تأكيد وإرسال طلب الاشتراك النهائي
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir="rtl">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-10 text-center animate-in fade-in zoom-in duration-300">

            <div className="w-24 h-24 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-[6px] border-blue-100/50">
              <Check size={40} className="stroke-[3]" />
            </div>

            <h2 className="text-3xl font-black text-[#001c56] mb-4">تم استلام طلبك بنجاح</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">
              شكراً لثقتك بنا. قام فريقنا باستلام بيانات السنتر الخاص بك، وسنقوم بالتواصل معك عبر الواتساب لتفعيل حسابك خلال ساعات العمل الرسمية.
            </p>

            <Link href="/">
              <Button variant="outline" className="h-14 px-10 rounded-xl font-bold text-lg text-[#001c56] border-gray-200 hover:bg-gray-50 shadow-sm w-full max-w-[200px] mx-auto">
                العودة للرئيسية
              </Button>
            </Link>

          </div>
        </div>
      )}

    </div>
  );
}
