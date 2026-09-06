"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

const loadingMessages = [
  "جاري تهيئة مساحة العمل...",
  "تحميل بيانات الطلاب والمجموعات...",
  "تجهيز لوحة التحكم الخاصة بك...",
  "مرحباً بك في أكاديميا"
];

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Progress counter animation
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds total loading time
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Add slight easing (ease-out cubic)
      const easeOutProgress = 1 - Math.pow(1 - currentProgress / 100, 3);
      setProgress(Math.floor(easeOutProgress * 100));

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 30);

    // Dynamic text rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 600);

    // End splash screen
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 800);
    }, duration + 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 w-screen h-[100dvh] z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden transition-all duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'
      }`}
      dir="rtl"
    >
      {/* Animated Background Mesh/Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-[spin_10s_linear_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[150px] animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwdi0yMHptLTIwIDBoMjB2MjBIMHYtMjB6bTIwLTIwaDIwdjIwSDIwdjIweiIgZmlsbD0iIzBmMTcyYSIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-20" />

      {/* Main Glassmorphism Card */}
      <div className={`relative z-10 w-full max-w-sm px-6 py-10 flex flex-col items-center transition-all duration-1000 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        
        {/* Central Logo with Circular Progress */}
        <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-[spin_4s_linear_infinite]" />
          
          {/* Progress SVG Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="48" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2"
            />
            <circle 
              cx="50" cy="50" r="48" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 - (progress / 100) * 301.59}
              className="transition-all duration-100 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icon Container */}
          <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center text-white shadow-2xl relative z-10">
            <GraduationCap size={48} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-indigo-100 tracking-tight mb-2 drop-shadow-sm">
          أكاديميا
        </h1>
        
        {/* Dynamic Loading Text */}
        <div className="h-6 mt-4 relative w-full flex justify-center items-center overflow-hidden">
          {loadingMessages.map((msg, idx) => (
            <p 
              key={idx}
              className={`absolute text-sm font-medium text-blue-200/60 transition-all duration-500 w-full text-center ${
                idx === messageIndex 
                  ? 'opacity-100 translate-y-0' 
                  : idx < messageIndex 
                    ? 'opacity-0 -translate-y-4' 
                    : 'opacity-0 translate-y-4'
              }`}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Percentage */}
        <div className="mt-8 font-mono text-2xl font-bold text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {progress}%
        </div>
      </div>
    </div>
  );
}
