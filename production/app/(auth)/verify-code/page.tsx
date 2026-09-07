"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function VerifyCodePage() {
  const [otp, setOtp] = useState(["1", "1", "4", "1"]);
  // Mocking the error state from the screenshot
  const isError = true;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="relative z-10 bg-white w-full max-w-[440px] rounded-3xl p-8 sm:p-10 shadow-2xl" dir="rtl">
      
      {/* Icon */}
      <div className="w-16 h-16 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Shield size={28} className="stroke-[2.5]" />
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-2xl font-black text-[#001c56]">رمز التحقق</h1>
        <p className="text-sm font-medium text-gray-500 max-w-xs mx-auto" dir="rtl">
          تم إرسال رمز التحقق إلى الرقم <span className="font-bold text-gray-700 dir-ltr inline-block">********010</span>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-3 md:gap-4" dir="ltr">
          {otp.map((digit, index) => (
            <input 
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 bg-white
                ${isError 
                  ? 'border-red-300 text-red-500 focus:border-red-400 focus:ring-red-100' 
                  : 'border-gray-200 text-gray-900 focus:border-[#001c56]'
                }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {isError && (
          <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-bold">
            <AlertCircle size={16} />
            <span>رمز التحقق غير صحيح، حاول مرة أخرى</span>
          </div>
        )}

        {/* Resend Timer */}
        <div className="flex items-center justify-center gap-2 text-[#001c56] text-sm font-bold pt-2">
          <Clock size={16} className="text-gray-400" />
          <span>إعادة إرسال الرمز بعد <span className="text-blue-600">59 ثانية</span></span>
        </div>

        <div className="pt-4 space-y-6">
          <Button className="w-full h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#001c56] font-bold text-base transition-colors flex items-center justify-center">
            تأكيد الرمز
          </Button>
          
          <div className="text-center">
            <Link href="/forgot-password" className="text-sm font-bold text-gray-500 hover:text-[#001c56] transition-colors">
              الرجوع لتعديل رقم الهاتف
            </Link>
          </div>
        </div>

      </form>

    </div>
  );
}
