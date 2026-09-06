"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle2, Star, Users, BookOpen, CheckSquare, Clock, 
  Calendar, UserCheck, MessageSquareQuote, BadgeCheck,
  ChevronLeft, ChevronRight, X, Search
} from "lucide-react";
import Link from "next/link";

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [attendanceFilter, setAttendanceFilter] = useState("اليوم");
  const [reviewsFilter, setReviewsFilter] = useState("الأحدث");
  
  // Mock data for the profile
  const teacher = {
    name: "أ. أحمد منصور",
    subject: "الفيزياء",
    status: "نشط",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    rank: 1,
    performance: 94,
    activity: 90,
    studentsCount: 120,
    groupsCount: 8,
    tasksCompleted: 1450,
    weeklyHours: 32
  };

  const schedule: { day: string, sessions: { time: string, subject: string, highlight?: boolean }[] }[] = [
    { day: "الأحد", sessions: [{ time: "08:00 - 09:30", subject: "الفيزياء - م1" }, { time: "10:00 - 11:30", subject: "الفيزياء - م2" }] },
    { day: "الإثنين", sessions: [{ time: "08:00 - 09:30", subject: "مراجعة عامة", highlight: true }] },
    { day: "الثلاثاء", sessions: [{ time: "08:00 - 09:30", subject: "الفيزياء - م3" }, { time: "12:00 - 01:30", subject: "الفيزياء - م4" }] },
    { day: "الأربعاء", sessions: [{ time: "10:00 - 11:30", subject: "الفيزياء - م5" }] },
    { day: "الخميس", sessions: [{ time: "08:00 - 12:00", subject: "اختبارات دورية", highlight: true }] }
  ];

  const recentAttendance = [
    { date: "12 أكتوبر 2024", group: "مجموعة A - متقدم", time: "07:15 ص", status: "حاضر", statusColor: "text-green-600 bg-green-50" },
    { date: "11 أكتوبر 2024", group: "مجموعة B - أساسيات", time: "08:05 ص", status: "متأخر", statusColor: "text-orange-600 bg-orange-50" },
    { date: "10 أكتوبر 2024", group: "مجموعة C - مراجعة", time: "09:30 ص", status: "حاضر", statusColor: "text-green-600 bg-green-50" },
  ];

  const reviews = [
    { name: "محمد علي", timeAgo: "قبل يومين", rating: 5, comment: "شرح ممتاز جداً ومبسط.. أستاذ أحمد يعطيك قدرة عجيبة على توصيل المعلومة.", avatar: "" },
    { name: "أحمد خالد", timeAgo: "قبل أسبوع", rating: 4, comment: "الملخصات والمراجعات التي يقدمها الأستاذ مفيدة جداً قبل الامتحانات.. شكراً لجهودك.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" },
  ];

  const allReviews = [
    { name: "محمد علي", timeAgo: "قبل يومين", rating: 5, comment: "شرح ممتاز جداً ومبسط، المنصة ساعدتني كثيراً في فهم المواد المعقدة بسهولة بفضل الأساتذة المتميزين وتصميم الموقع الواضح.", avatar: "", initials: "م ع", bg: "bg-blue-100 text-blue-700" },
    { name: "سارة أحمد", timeAgo: "قبل 3 أيام", rating: 4, comment: "تجربة رائعة وتواصل مستمر مع المعلمين. أتمنى إضافة المزيد من الاختبارات التجريبية للمواد العلمية.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
    { name: "خالد سعيد", timeAgo: "قبل أسبوع", rating: 5, comment: "أفضل منصة تعليمية استخدمتها على الإطلاق، واجهة المستخدم نظيفة وسريعة والمحتوى ذو جودة عالية جداً.", avatar: "", initials: "خ س", bg: "bg-[#451a03] text-white" },
    { name: "عمر محمود", timeAgo: "قبل أسبوعين", rating: 4, comment: "الدورات مفيدة جداً. يوجد تأخير بسيط في الرد على الاستفسارات أحياناً ولكن بشكل عام التجربة ممتازة.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" }
  ];

  const recentAttendanceData = [
    { date: "26 أكتوبر 2024", group: "مجموعة 3 - متقدم", time: "07:55 ص", status: "حاضر", statusColor: "text-green-600 bg-green-50" },
    { date: "26 أكتوبر 2024", group: "مجموعة 1 - أساسيات", time: "07:55 ص", status: "متأخر", statusColor: "text-orange-600 bg-orange-50" },
    { date: "26 أكتوبر 2024", group: "مجموعة 5 - مراجعة", time: "07:55 ص", status: "حاضر", statusColor: "text-green-600 bg-green-50" },
    { date: "26 أكتوبر 2024", group: "مجموعة 2 - متقدم", time: "07:55 ص", status: "غائب", statusColor: "text-red-600 bg-red-50" },
    { date: "25 أكتوبر 2024", group: "مجموعة 3 - متقدم", time: "08:00 ص", status: "حاضر", statusColor: "text-green-600 bg-green-50" },
  ];

  const filteredAttendance = recentAttendanceData.filter(record => {
    if (attendanceFilter === "الكل") return true;
    if (attendanceFilter === "اليوم") return record.date.includes("26 أكتوبر");
    if (attendanceFilter === "أمس") return record.date.includes("25 أكتوبر");
    return true; 
  });

  const sortedReviews = [...allReviews].sort((a, b) => {
    if (reviewsFilter === "الأعلى تقييماً") return b.rating - a.rating;
    if (reviewsFilter === "الأقل تقييماً") return a.rating - b.rating;
    return 0; // "الأحدث" is default as array order
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-20">
      
      {/* Top Banner and Profile Info */}
      <div className="relative mb-24">
        <div className="h-48 md:h-64 w-full rounded-[32px] overflow-hidden relative shadow-sm">
          <Image 
            src={teacher.cover}
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Avatar */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#f8fafc] overflow-hidden bg-white shadow-md">
              <Image 
                src={teacher.avatar}
                alt={teacher.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-[#001c56] flex items-center justify-center gap-2 mb-3">
          {teacher.name}
          {teacher.isVerified && <BadgeCheck size={20} className="text-blue-500 fill-blue-50" />}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold border border-gray-200 shadow-sm">
            #{teacher.subject}
          </span>
          <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold border border-gray-200 shadow-sm">
            {teacher.status}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Right Column (Stats) */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2 flex flex-col gap-6">
          
          {/* Performance & Rating Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-amber-900 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={10} className="fill-white" /> المرتبة #{teacher.rank}
              </div>
              <h2 className="text-base font-bold text-[#001c56]">الأداء والتقييم</h2>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1">
                {renderStars(teacher.rating)}
              </div>
              <div className="text-xl font-extrabold text-[#001c56]">{teacher.rating}/5</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-[#001c56]">
                  <span>{teacher.performance}%</span>
                  <span className="text-gray-500">كفاءة الأداء</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 flex justify-end">
                  <div className="bg-[#001c56] h-2 rounded-full" style={{ width: `${teacher.performance}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-[#001c56]">
                  <span>{teacher.activity}%</span>
                  <span className="text-gray-500">نسبة النشاط</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 flex justify-end">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${teacher.activity}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <Users size={18} />
              </div>
              <div className="text-xl font-extrabold text-[#001c56] mb-1">{teacher.studentsCount}</div>
              <div className="text-[10px] text-gray-500 font-bold">إجمالي الطلاب</div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <BookOpen size={18} />
              </div>
              <div className="text-xl font-extrabold text-[#001c56] mb-1">{teacher.groupsCount}</div>
              <div className="text-[10px] text-gray-500 font-bold">عدد المجموعات</div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                <CheckSquare size={18} />
              </div>
              <div className="text-xl font-extrabold text-[#001c56] mb-1">{teacher.tasksCompleted.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 font-bold">مهام مكتملة</div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-2">
                <Clock size={18} />
              </div>
              <div className="text-xl font-extrabold text-[#001c56] mb-1">{teacher.weeklyHours}</div>
              <div className="text-[10px] text-gray-500 font-bold">ساعة أسبوعياً</div>
            </div>
          </div>

        </div>

        {/* Left Column (Details) */}
        <div className="w-full lg:w-2/3 order-2 lg:order-1 flex flex-col gap-6">
          
          {/* Weekly Schedule Card */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#001c56] flex items-center justify-end gap-2 mb-6">
              جدول الحصص الأسبوعي
              <Calendar size={20} className="text-[#001c56]" />
            </h2>
            
            <div className="flex flex-row-reverse justify-between gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {schedule.map((dayPlan, index) => (
                <div key={index} className="flex flex-col items-center min-w-[90px]">
                  <div className="text-xs font-bold text-gray-500 mb-4">{dayPlan.day}</div>
                  <div className="flex flex-col gap-3 w-full">
                    {dayPlan.sessions.map((session, sIndex) => (
                      <div 
                        key={sIndex} 
                        className={`text-center py-3 px-2 rounded-2xl border ${session.highlight ? 'bg-[#E4ECF7] border-blue-100' : 'bg-gray-50/50 border-gray-100'} w-full flex flex-col items-center justify-center min-h-[70px] shadow-sm`}
                      >
                        <span className="text-[10px] font-extrabold text-[#001c56] block mb-1">{session.time}</span>
                        <span className="text-[9px] font-bold text-gray-500">{session.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsAttendanceModalOpen(true)} className="text-xs font-bold text-[#001c56] hover:underline">عرض الكل</button>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                سجل الحضور الأخير
                <UserCheck size={20} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-50 text-[11px] font-bold text-gray-400">
                    <th className="pb-4 px-2 font-bold w-1/4 text-center">الحالة</th>
                    <th className="pb-4 px-2 font-bold w-1/4 text-center">وقت الدخول</th>
                    <th className="pb-4 px-2 font-bold w-1/4 text-center">المجموعة</th>
                    <th className="pb-4 px-2 font-bold w-1/4 text-right">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentAttendance.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border border-current border-opacity-10 ${record.statusColor}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[11px] font-bold text-gray-700 text-center">{record.time}</td>
                      <td className="py-4 px-2 text-[11px] font-bold text-gray-600 text-center">{record.group}</td>
                      <td className="py-4 px-2 text-[11px] font-bold text-gray-900">{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Reviews */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsReviewsModalOpen(true)} className="text-xs font-bold text-[#001c56] hover:underline">عرض المزيد</button>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                آراء وتقييمات الطلاب
                <MessageSquareQuote size={20} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="space-y-4 border-t border-gray-50 pt-4">
              {reviews.map((review, index) => (
                <div key={index} className="flex gap-4 p-2">
                  <div className="flex-1 text-right">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-gray-400 font-bold">{review.timeAgo}</span>
                      <div className="flex items-center gap-2 flex-row-reverse">
                        <h4 className="text-xs font-bold text-[#001c56]">{review.name}</h4>
                        <div className="flex gap-0.5 flex-row-reverse">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] leading-loose text-gray-500 font-medium">
                      {review.comment}
                    </p>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs overflow-hidden">
                    {review.avatar ? (
                      <Image src={review.avatar} alt={review.name} width={32} height={32} className="object-cover" />
                    ) : (
                      review.name.charAt(0)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Attendance Modal / Slide-over */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[32px] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button onClick={() => setIsAttendanceModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <h2 className="text-lg font-bold text-[#001c56]">سجل الحضور الكامل</h2>
            </div>
            
            {/* Search & Filters */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/30">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="بحث في السجلات..." 
                  className="w-full bg-gray-100/80 border-none rounded-full h-11 pr-4 pl-10 text-xs font-medium text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20"
                />
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex flex-row-reverse justify-center gap-2">
                {["الكل", "اليوم", "أمس", "آخر 7 أيام"].map((filter) => (
                  <button 
                    key={filter}
                    onClick={() => setAttendanceFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      attendanceFilter === filter 
                        ? 'bg-[#001c56] text-white shadow-sm' 
                        : 'bg-[#E4ECF7] text-[#001c56] hover:bg-blue-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10">
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-500">
                    <th className="py-3 px-4 text-center">الحالة</th>
                    <th className="py-3 px-4 text-center">المجموعة</th>
                    <th className="py-3 px-4 text-right">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAttendance.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border border-current border-opacity-10 ${record.statusColor}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-[11px] font-bold text-gray-700">{record.group}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-[11px] font-bold text-gray-900 mb-0.5">{record.date}</div>
                        <div className="text-[9px] font-bold text-gray-400">{record.time}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="p-4 border-t border-gray-100 flex flex-row-reverse justify-between items-center bg-white mt-auto">
              <div className="text-[10px] font-bold text-gray-500">إجمالي السجلات: 150</div>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50">
                  <ChevronLeft size={12} />
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50">
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reviews Modal / Slide-over */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#f8fafc] w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[32px] overflow-hidden">
            
            {/* Header */}
            <div className="bg-white p-6 border-b border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setIsReviewsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
                <h2 className="text-lg font-bold text-[#001c56]">جميع آراء وتقييمات الطلاب</h2>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-gray-600">متوسط التقييم 4.8 من 5</span>
                  <Star size={14} className="fill-[#001c56] text-[#001c56]" />
                </div>
                
                <div className="flex gap-2 flex-row-reverse">
                  {["الأحدث", "الأعلى تقييماً", "الأقل تقييماً"].map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setReviewsFilter(filter)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${
                        reviewsFilter === filter 
                          ? 'bg-[#001c56] text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {sortedReviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-0.5 flex-row-reverse">
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <h4 className="text-sm font-bold text-[#001c56] mb-1">{review.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold">{review.timeAgo}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm overflow-hidden border-2 border-white ring-1 ring-gray-50 ${review.bg || 'bg-gray-100 text-gray-500'}`}>
                        {review.avatar ? (
                          <Image src={review.avatar} alt={review.name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                          review.initials || review.name.charAt(0)
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-600 font-medium text-right" dir="rtl">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
