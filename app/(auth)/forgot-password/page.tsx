import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthCard 
      title="إعادة تعيين كلمة المرور" 
      description="يرجى إدخال البريد الإلكتروني الخاص بك المسجل لدينا"
    >
      <form className="space-y-6" action="/verify-code">
        <Input 
          type="email"
          label="البريد الإلكتروني"
          placeholder="example@academei.com"
          icon={<Mail size={20} />}
          required
        />
        
        <Button type="submit" className="w-full">
          إرسال الرمز
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <Link 
          href="/login" 
          className="text-sm text-gray-500 font-bold hover:text-gray-900 transition-colors"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    </AuthCard>
  );
}
