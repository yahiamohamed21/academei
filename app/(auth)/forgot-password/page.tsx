"use client";

import React from "react";
import Link from "next/link";
import { Phone, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  return (
    <div className="relative z-10 bg-white w-full max-w-[440px] rounded-3xl p-8 sm:p-10 shadow-2xl" dir="rtl">
        
        {/* Icon */}
        <div className="w-16 h-16 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <RotateCcw size={28} className="stroke-[2.5]" />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-2xl font-black text-[#001c56]">استعادة كلمة المرور</h1>
          <p className="text-sm font-medium text-gray-500 max-w-xs mx-auto">
            أدخل رقم هاتفك المسجل لإرسال رمز التحقق (OTP)
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 block text-right">رقم الهاتف</label>
            <div className="relative flex items-center" dir="ltr">
              <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-4 border-r border-gray-200 bg-gray-50 rounded-l-xl text-gray-500 font-bold text-sm gap-2 w-24">
                <Phone size={16} className="text-gray-400" />
                <span>+966</span>
              </div>
              <input 
                type="text" 
                placeholder="5X XXX XXXX" 
                className="w-full h-14 rounded-xl border border-gray-200 bg-white pl-28 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 focus:border-[#001c56] transition-all placeholder:text-gray-400 tracking-wider text-left"
              />
            </div>
          </div>

          <div className="pt-2 space-y-6">
            <Link href="/verify-code" className="w-full block">
              <Button className="w-full h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#001c56] font-bold text-base transition-colors flex items-center justify-center gap-2">
                إرسال رمز التحقق
                <ArrowLeft size={18} />
              </Button>
            </Link>
            
            <div className="text-center">
              <Link href="/login" className="text-sm font-bold text-[#001c56] hover:underline">
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>

        </form>

    </div>
  );
}
