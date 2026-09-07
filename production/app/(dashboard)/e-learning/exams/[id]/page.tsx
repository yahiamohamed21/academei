"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Check, AlertTriangle, XCircle, RefreshCw } from "lucide-react";

export default function ExamSessionPage() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden && !isSuccessModalOpen) {
        setIsViolationModalOpen(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSuccessModalOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const questions = [
    {
      id: 1,
      text: "إذا زادت المسافة بين شحنتين نقطيتين إلى الضعف، فإن القوة الكهربائية بينهما:",
      options: ["أ) تزداد للضعف", "ب) تقل للنصف", "ج) تقل للربع", "د) تظل ثابتة"],
    },
    {
      id: 2,
      text: "وحدة قياس شدة المجال الكهربائي هي:",
      options: ["أ) نيوتن/كولوم", "ب) كولوم/نيوتن", "ج) فولت/ثانية", "د) جول/كولوم"],
    },
    {
      id: 3,
      text: "مكثف سعته C، إذا زادت المسافة بين لوحيه للضعف، فإن سعته:",
      options: ["أ) تزداد للضعف", "ب) تقل للنصف", "ج) لا تتغير", "د) تنعدم"],
    },
    {
      id: 4,
      text: "اتجاه خطوط المجال الكهربائي يكون دائماً:",
      options: ["أ) من الشحنة السالبة للموجبة", "ب) من الشحنة الموجبة للسالبة", "ج) عمودي على السطح دائماً", "د) متوازي في جميع الحالات"],
    },
    {
      id: 5,
      text: "سؤال تجريبي رقم 5 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
    {
      id: 6,
      text: "سؤال تجريبي رقم 6 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
    {
      id: 7,
      text: "سؤال تجريبي رقم 7 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
    {
      id: 8,
      text: "سؤال تجريبي رقم 8 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
    {
      id: 9,
      text: "سؤال تجريبي رقم 9 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
    {
      id: 10,
      text: "سؤال تجريبي رقم 10 لقياس الفهم والاستيعاب في مادة الفيزياء؟",
      options: ["أ) الخيار الأول", "ب) الخيار الثاني", "ج) الخيار الثالث", "د) الخيار الرابع"],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-24 relative min-h-screen">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-10 pb-6 border-b border-gray-100 gap-4">
        
        <div className="flex items-center gap-4 flex-row-reverse">
          <h1 className="text-2xl font-black text-[#001c56]">اختبار الفيزياء</h1>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold flex-row-reverse">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            عدد الطلاب المشاركين حالياً: 120 طالباً
          </div>
        </div>

        <div className="flex items-center gap-2 text-red-600 bg-red-50/50 px-6 py-2 rounded-full font-bold flex-row-reverse">
          <Clock size={18} />
          <span className="text-lg tabular-nums tracking-wider" dir="ltr">{formatTime(timeLeft)}</span>
        </div>

      </div>

      {/* Main Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-[#001c56] mb-3">امتحان الفيزياء الشامل - الباب الثالث</h2>
        <p className="text-sm font-bold text-gray-500">يرجى قراءة الأسئلة بعناية قبل الإجابة. جميع الأسئلة إجبارية.</p>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {questions.map((q) => (
          <div key={q.id} className="bg-[#f8fafc] rounded-[32px] p-8 shadow-sm border border-gray-50 flex flex-col items-end text-right">
            
            <div className="flex items-start gap-4 mb-8 flex-row-reverse w-full">
              <div className="w-8 h-8 rounded-full bg-[#001c56] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                {q.id}
              </div>
              <h3 className="text-base font-extrabold text-[#001c56] flex-1 pt-1 leading-relaxed">
                {q.text}
              </h3>
            </div>

            <div className="w-full space-y-3">
              {q.options.map((opt, index) => (
                <label 
                  key={index} 
                  className={`flex items-center justify-end gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex-row-reverse group ${
                    answers[q.id] === index 
                      ? "bg-white border-[#001c56] shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-gray-100"
                  }`}
                >
                  <span className={`text-sm font-bold ${answers[q.id] === index ? "text-[#001c56]" : "text-gray-600 group-hover:text-gray-800"}`}>
                    {opt}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                    answers[q.id] === index 
                      ? "border-[#001c56]" 
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}>
                    {answers[q.id] === index && <div className="w-2.5 h-2.5 rounded-full bg-[#001c56]"></div>}
                  </div>
                  <input 
                    type="radio" 
                    name={`q-${q.id}`} 
                    className="hidden"
                    onChange={() => setAnswers(prev => ({ ...prev, [q.id]: index }))}
                    checked={answers[q.id] === index}
                  />
                </label>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => setIsSuccessModalOpen(true)}
          className="px-16 py-4 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-black text-lg transition-colors shadow-xl shadow-blue-900/20"
        >
          تسليم الامتحان
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-[500px] p-10 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-blue-50/50 rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-[#001c56] rounded-full flex items-center justify-center shadow-md">
                <Check size={24} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-[#001c56] mb-4">تم تسليم الامتحان بنجاح</h2>
            <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed max-w-[300px]">
              شكراً لك! لقد تم رصد وتخزين إجاباتك بنجاح في قاعدة البيانات. سيتم مراجعة الدرجات وإعلان النتيجة قريباً.
            </p>

            <Link href="/e-learning/exams" className="w-full py-4 bg-[#001c56] hover:bg-blue-900 text-white rounded-full font-bold text-sm transition-colors shadow-lg">
              العودة إلى لوحة الامتحانات
            </Link>
          </div>
        </div>
      )}

      {/* Violation Modal */}
      {isViolationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-[500px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            
            <div className="bg-red-50 p-6 flex items-center justify-center gap-2 flex-row-reverse border-b border-red-100">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-lg font-black text-red-600">تنبيه إداري: تم رصد محاولة مخالفة</h2>
            </div>
            
            <div className="p-8 flex flex-col items-center text-center">
              <div className="bg-gray-50 border-r-4 border-r-red-500 p-4 rounded-l-2xl mb-8 w-full">
                <p className="text-xs font-bold text-gray-600 leading-relaxed text-right">
                  تم رصد محاولة مغادرة صفحة الاختبار أو فتح مصادر خارجية. بناءً على لوائح المنصة، تم تعليق محاولتك الحالية.
                </p>
              </div>

              <p className="text-[11px] font-bold text-gray-400 mb-4">
                يرجى اختيار الإجراء المناسب للمتابعة:
              </p>

              <div className="w-full space-y-3">
                <Link href="/e-learning/exams" className="w-full py-4 bg-[#b91c1c] hover:bg-red-800 text-white rounded-full font-bold text-xs transition-colors flex items-center justify-center gap-2 flex-row-reverse shadow-md shadow-red-900/20">
                  تأكيد إنهاء وإلغاء المحاولة
                  <XCircle size={16} />
                </Link>
                <button 
                  onClick={() => setIsViolationModalOpen(false)}
                  className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-[#001c56] rounded-full font-bold text-xs transition-colors flex items-center justify-center gap-2 flex-row-reverse"
                >
                  إعادة محاولة الامتحان
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
