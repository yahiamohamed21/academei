import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <AuthCard 
      title="تمت إعادة تعيين كلمة المرور بنجاح" 
      description="يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة الخاصة بك."
    >
      <div className="flex flex-col items-center justify-center space-y-8 py-4">
        
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center border-4 border-green-100 shadow-sm animate-in zoom-in duration-500 delay-150">
          <CheckCircle2 size={48} strokeWidth={2} />
        </div>
        
        <Link href="/login" className="w-full block">
          <Button type="button" className="w-full">
            العودة لتسجيل الدخول
          </Button>
        </Link>
      </div>
    </AuthCard>
  );
}
