"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, LockKeyhole, Building, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthActions, useSession } from "@/lib/hooks/use-auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, login } = useAuthActions();
  const { refetch: refetchSession } = useSession();
  const router = useRouter();

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedEmail = email.trim();
    const trimmedTenant = tenantName.trim();

    if (!trimmedEmail || !password || !trimmedTenant) {
      setErrorMsg("جميع الحقول (البريد الإلكتروني، كلمة المرور، واسم المؤسسة) إجبارية.");
      return;
    }

    if (trimmedTenant.length > 200) {
      setErrorMsg("اسم الأكاديمية يجب ألا يتجاوز 200 حرف.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("كلمة المرور يجب أن تتكون من 8 أحرف على الأقل.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Submit Registration
      await register({
        email: trimmedEmail,
        password,
        tenantName: trimmedTenant,
      });

      setSuccessMsg("تم إنشاء الحساب والمؤسسة بنجاح! جاري تسجيل الدخول تلقائياً...");

      // 2. Perform Auto Login
      try {
        await login({ email: trimmedEmail, password });
        await refetchSession();
        router.push("/dashboard");
      } catch (loginErr) {
        setIsLoading(false);
        setSuccessMsg("تم إنشاء الحساب بنجاح! يرجى التوجه لصفحة تسجيل الدخول.");
      }
    } catch (err: any) {
      setIsLoading(false);
      const status = err?.status;
      const code = err?.problemDetails?.code || err?.problemDetails?.title;
      const detail = err?.problemDetails?.detail || err?.message;

      if (status === 409 || code === "Authentication.DuplicateEmail") {
        setErrorMsg("هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد آخر أو تسجيل الدخول.");
      } else if (code === "Authentication.TenantNameRequired") {
        setErrorMsg("اسم الأكاديمية / المركز التعليمي مطلوب.");
      } else if (status === 429) {
        setErrorMsg("تجاوزت الحد المسموح من محاولات التسجيل. يرجى الانتظار قليلاً ثم المحاولة.");
      } else if (detail) {
        setErrorMsg(detail);
      } else {
        setErrorMsg("حدث خطأ أثناء التسجيل. يرجى التأكد من البيانات والمحاولة مجدداً.");
      }
    }
  }

  return (
    <AuthCard 
      title="إنشاء حساب مؤسسة جديد" 
      description="قم بإدخال بياناتك لإنشاء حسابك وتأمين مؤسستك التعليمية"
    >
      <form className="space-y-5" onSubmit={handleRegisterSubmit}>
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-xs font-bold flex items-start gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

        <Input 
          type="text"
          name="tenantName"
          label="اسم السنتر / الأكاديمية التعليمية *"
          placeholder="مثال: أكاديمية النخبة التعليمية"
          icon={<Building size={18} />}
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          required
        />

        <Input 
          type="email"
          name="email"
          label="البريد الإلكتروني للمسؤول *"
          placeholder="admin@example.com"
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
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-[#001c56] hover:bg-[#001033] text-white font-bold rounded-xl text-sm gap-2 shadow-md mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> جاري إنشاء الحساب والمؤسسة...
            </>
          ) : (
            "إنشاء الحساب والبدء الآن"
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-xs text-gray-600 font-bold border-t border-gray-100 pt-6">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-[var(--primary)] hover:underline font-extrabold">
          تسجيل الدخول
        </Link>
      </div>
    </AuthCard>
  );
}
