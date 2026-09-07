"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LockKeyhole, Mail, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions, useSession } from "@/lib/hooks/use-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthActions();
  const { refetch: refetchSession } = useSession();
  const router = useRouter();

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setIsLoading(true);

    try {
      await login({ email: email.trim(), password });
      await refetchSession();
      router.push("/dashboard");
    } catch (err: any) {
      setIsLoading(false);
      const status = err?.status;
      const code = err?.problemDetails?.code || err?.problemDetails?.title;
      const detail = err?.problemDetails?.detail || err?.message;

      if (status === 401 || code === "Authentication.InvalidCredentials") {
        setErrorMsg("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد من البيانات والمحاولة مجدداً.");
      } else if (status === 429) {
        setErrorMsg("تجاوزت الحد المسموح من محاولات تسجيل الدخول. يرجى الانتظار دقيقة ثم المحاولة مجدداً.");
      } else if (detail) {
        setErrorMsg(detail);
      } else {
        setErrorMsg("حدث خطأ أثناء تسجيل الدخول. يرجى إعادة المحاولة.");
      }
    }
  }

  return (
    <AuthCard 
      title="تسجيل الدخول" 
      description="أدخل بيانات حساب الأكاديمية أو المركز التعليمي للاستمرار"
    >
      <form className="space-y-5" onSubmit={handleLoginSubmit}>
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        <Input 
          type="email"
          name="email"
          label="البريد الإلكتروني *"
          placeholder="user@example.com"
          icon={<Mail size={18} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input 
          type="password"
          name="password"
          label="كلمة المرور *"
          placeholder="••••••••"
          icon={<LockKeyhole size={18} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="flex items-center justify-between text-xs font-bold pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">تذكرني على هذا الجهاز</span>
          </label>
          
          <Link 
            href="/forgot-password" 
            className="text-[var(--primary)] hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-[#001c56] hover:bg-[#001033] text-white font-bold rounded-xl text-sm gap-2 shadow-md mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> جاري تسجيل الدخول...
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-xs text-gray-600 font-bold border-t border-gray-100 pt-6">
        ليس لديك حساب أكاديمية بعد؟{" "}
        <Link href="/register" className="text-[var(--primary)] hover:underline font-extrabold">
          إنشاء حساب مؤسسة جديد
        </Link>
      </div>
    </AuthCard>
  );
}

