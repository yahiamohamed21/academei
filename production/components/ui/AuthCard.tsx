import * as React from "react"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthCard({ children, title, description, className, ...props }: AuthCardProps) {
  return (
    <div 
      className={cn(
        "glass-card w-full max-w-[480px] rounded-3xl p-8 sm:p-10 flex flex-col items-center transition-all",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 bg-blue-50 text-[var(--primary)] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
        <GraduationCap size={32} strokeWidth={1.5} />
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm text-gray-500 text-center mb-8 font-medium">{description}</p>
      )}
      
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
