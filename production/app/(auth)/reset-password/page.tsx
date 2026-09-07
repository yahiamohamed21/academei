import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LockKeyhole } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <AuthCard 
      title="إعادة تعيين كلمة المرور" 
      description="يرجى إدخال كلمة المرور الجديدة وتأكيدها"
    >
      <form className="space-y-5" action="/reset-success">
        <Input 
          type="password"
          label="كلمة المرور الجديدة"
          placeholder="••••••••"
          icon={<LockKeyhole size={20} />}
          required
        />
        
        <Input 
          type="password"
          label="تأكيد كلمة المرور"
          placeholder="••••••••"
          icon={<LockKeyhole size={20} />}
          required
        />
        
        <Button type="submit" className="w-full mt-2">
          تأكيد وحفظ
        </Button>
      </form>
    </AuthCard>
  );
}
