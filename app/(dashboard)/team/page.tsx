"use client";

import React from "react";
import Image from "next/image";
import { Plus, Mail, Phone, BookOpen, Star, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TeamPage() {
  const teachers = [
    { 
      id: 1, 
      name: "أ. محمد عبد الله", 
      subject: "الفيزياء", 
      email: "mohamed@academei.com",
      phone: "0501112223",
      rating: 4.9,
      studentsCount: 320,
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop"
    },
    { 
      id: 2, 
      name: "د. سارة أحمد", 
      subject: "الكيمياء", 
      email: "sara@academei.com",
      phone: "0502223334",
      rating: 4.8,
      studentsCount: 280,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    { 
      id: 3, 
      name: "أ. خالد حسن", 
      subject: "الرياضيات", 
      email: "khaled@academei.com",
      phone: "0503334445",
      rating: 4.7,
      studentsCount: 450,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    { 
      id: 4, 
      name: "أ. منى السيد", 
      subject: "الجيولوجيا وعلوم البيئة", 
      email: "mona@academei.com",
      phone: "0504445556",
      rating: 4.9,
      studentsCount: 210,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    { 
      id: 5, 
      name: "أ. أحمد علي", 
      subject: "اللغة العربية", 
      email: "ahmed.a@academei.com",
      phone: "0505556667",
      rating: 4.6,
      studentsCount: 520,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    { 
      id: 6, 
      name: "د. هدى محمود", 
      subject: "اللغة الإنجليزية", 
      email: "hoda@academei.com",
      phone: "0506667778",
      rating: 4.8,
      studentsCount: 390,
      avatar: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=200&auto=format&fit=crop"
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#001c56] mb-2 tracking-tight">فريق التدريس</h1>
          <p className="text-gray-500 font-medium">إدارة ملفات المعلمين والمشرفين الأكاديميين</p>
        </div>
        
        <Button className="bg-[#001c56] hover:bg-[#001033] text-white gap-2 h-11 px-6 rounded-xl shadow-md font-bold w-full md:w-auto">
          <Plus size={18} />
          إضافة عضو جديد
        </Button>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group relative flex flex-col">
            
            {/* Top Colored Banner */}
            <div className="h-20 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
              <button className="absolute top-3 left-3 p-1.5 bg-white/50 hover:bg-white rounded-lg text-[#001c56] transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
            
            {/* Avatar */}
            <div className="flex justify-center -mt-10 relative z-10">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
                <Image 
                  src={teacher.avatar} 
                  alt={teacher.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 pt-3 text-center flex-1 flex flex-col">
              <h3 className="text-lg font-black text-[#001c56] mb-1 group-hover:text-blue-700 transition-colors">{teacher.name}</h3>
              <p className="text-sm font-bold text-blue-600 bg-blue-50 inline-block mx-auto px-3 py-1 rounded-full mb-4">
                {teacher.subject}
              </p>
              
              <div className="flex justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    {teacher.rating}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium mt-1">التقييم</span>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                    <BookOpen size={14} className="text-gray-400" />
                    {teacher.studentsCount}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium mt-1">طالب</span>
                </div>
              </div>
              
              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-xl">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate font-medium text-left w-full" dir="ltr">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-xl">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate font-medium text-left w-full" dir="ltr">{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
