import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VerifyCodePage() {
  return (
    <AuthCard 
      title="رمز التحقق" 
      description="يرجى إدخال رمز التحقق المكون من 4 أرقام المرسل إلى بريدك الإلكتروني"
    >
      <form className="space-y-6" action="/reset-password">
        
        <div className="flex items-center justify-center gap-4 dir-ltr" dir="ltr">
          {[1, 2, 3, 4].map((i) => (
            <input 
              key={i}
              type="text"
              maxLength={1}
              className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold rounded-2xl border-2 border-gray-200 bg-gray-50/50 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20 focus-visible:border-[var(--primary)] transition-all"
              placeholder="-"
              required
            />
          ))}
        </div>
        
        <Button type="submit" className="w-full">
          تأكيد
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600 font-medium">
        لم تستلم الرمز؟{" "}
        <button className="text-[var(--primary)] font-bold hover:underline">
          إعادة إرسال
        </button>
      </div>
    </AuthCard>
  );
}
