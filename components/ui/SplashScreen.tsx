"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start progress immediately
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Keep the splash screen for 1.5 seconds, then start fading out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Remove from DOM after fade out transition (500ms)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#001c56] transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      dir="rtl"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Logo */}
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#001c56] shadow-2xl mb-6 relative animate-bounce">
          <GraduationCap size={50} />
          
          {/* Ripple effects */}
          <div className="absolute inset-0 rounded-3xl border-4 border-white opacity-50 animate-ping"></div>
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">أكاديميا</h1>
        <p className="text-blue-200 font-medium text-lg tracking-wide opacity-80">نظام الإدارة الذكي</p>
        
        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-blue-900/50 rounded-full mt-8 overflow-hidden relative">
          <div 
            className="h-full bg-blue-400 rounded-full absolute right-0 top-0 bottom-0 transition-all duration-[1500ms] ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
