import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LockKeyhole, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthCard 
      title="تسجيل الدخول" 
      description="من فضلك قم بإدخال بياناتك للاستمرار"
    >
      <form className="space-y-5" action="/apply">
        <Input 
          type="text"
          label="رقم الهوية / البريد الإلكتروني"
          placeholder="أدخل رقم الهوية أو البريد الإلكتروني"
          icon={<User size={20} />}
          required
        />
        
        <Input 
          type="password"
          label="كلمة المرور"
          placeholder="••••••••"
          icon={<LockKeyhole size={20} />}
          required
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">تذكرني</span>
          </label>
          
          <Link 
            href="/forgot-password" 
            className="text-[var(--primary)] font-bold hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
        
        <Button type="submit" className="w-full mt-2">
          تسجيل الدخول
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600 font-medium">
        ليس لديك حساب؟{" "}
        <Link href="/subscribe" className="text-[var(--primary)] font-bold hover:underline">
          إنشاء حساب
        </Link>
      </div>
    </AuthCard>
  );
}
