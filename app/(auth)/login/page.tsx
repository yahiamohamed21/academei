"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LockKeyhole, User } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { login } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await login(formData);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <AuthCard 
      title="تسجيل الدخول" 
      description="من فضلك قم بإدخال بياناتك للاستمرار"
    >
      <form className="space-y-5" action={handleLogin}>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold text-center">
            {error}
          </div>
        )}
        <Input 
          type="text"
          name="emailOrId"
          label="رقم الهوية / البريد الإلكتروني"
          placeholder="أدخل رقم الهوية أو البريد الإلكتروني"
          icon={<User size={20} />}
          required
        />
        
        <Input 
          type="password"
          name="password"
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
        
        <Button type="submit" className="w-full mt-2" disabled={isPending}>
          {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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
