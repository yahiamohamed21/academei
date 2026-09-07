import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          {
            "bg-[var(--primary)] text-white hover:opacity-90 shadow-md hover:shadow-lg": variant === "primary",
            "bg-blue-100 text-[var(--primary)] hover:bg-blue-200": variant === "secondary",
            "border-2 border-gray-200 bg-transparent hover:border-[var(--primary)] hover:text-[var(--primary)] text-gray-600": variant === "outline",
            "bg-transparent hover:bg-gray-100 text-gray-700": variant === "ghost",
            "bg-transparent underline-offset-4 hover:underline text-[var(--primary)] p-0 h-auto": variant === "link",
            "h-12 px-8": size === "default" && variant !== "link",
            "h-9 px-4 text-xs": size === "sm" && variant !== "link",
            "h-14 px-10 text-base": size === "lg" && variant !== "link",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
