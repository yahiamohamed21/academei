import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop")' }}
    >
      {/* Overlay to match the dark dramatic feel in the design */}
      <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Main Content */}
      <div className="relative z-10 w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        {children}
      </div>
    </div>
  );
}
