"use client";

import React, { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Users2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teachersData = [
  {
    id: 1,
    name: "أ. أحمد منصور",
    subject: "الفيزياء",
    groupsCount: 5,
    studentsCount: 20,
    activityRate: 94,
    rank: 1,
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "أ. سارة خالد",
    subject: "الرياضيات",
    groupsCount: 20,
    studentsCount: 95,
    activityRate: 88,
    rank: 4,
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  }
];

const filterOptions = {
  subject: ["الأحياء", "اللغة الانجليزية", "اللغة الفرنسية", "الكيمياء"],
  status: ["نشط ومستمر", "موقوف مؤقتاً (إدارياً)", "موقوف لعدم سداد المصروفات", "متخرج / أكمل الكورسات"],
  group: ["مجموعة الفيزياء A", "مجموعة الكيمياء C", "مجموعة الرياضيات D", "مجموعة الأحياء A"]
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Subject filter
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  
  // Status filter
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [statusSearchQuery, setStatusSearchQuery] = useState("");

  // Group filter
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? "fill-amber-900 text-amber-900" : "fill-gray-200 text-gray-200"} 
      />
    ));
  };

  const MultiSelectDropdown = ({ 
    name, label, options, selectedList, setSelectedList, searchQuery, setSearchQuery, placeholder
  }: any) => {
    const isOpen = activeDropdown === name;
    const filteredOptions = options.filter((opt: string) => opt.includes(searchQuery));

    return (
      <div className="relative">
        <button 
          onClick={() => toggleDropdown(name)}
          className={`flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 transition-colors rounded-full text-sm font-bold whitespace-nowrap border border-gray-100/50 ${isOpen || selectedList.length > 0 ? 'bg-blue-50 text-[#001c56]' : 'bg-gray-50 text-gray-600'}`}
        >
          {label} {selectedList.length > 0 && `(${selectedList.length})`}
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 text-right">
            <div className="p-3 border-b border-gray-50">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-9 bg-white border border-gray-200 rounded-lg pr-9 pl-3 text-xs focus:outline-none focus:border-[#001c56] text-right"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto p-2">
              {filteredOptions.map((option: string) => (
                <label key={option} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer flex-row-reverse">
                  <input 
                    type="checkbox"
                    checked={selectedList.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedList([...selectedList, option]);
                      } else {
                        setSelectedList(selectedList.filter((item: string) => item !== option));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56] accent-[#001c56] shrink-0"
                  />
                  <span className="text-sm text-gray-700 w-full text-right">{option}</span>
                </label>
              ))}
              {filteredOptions.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">لا توجد نتائج</p>
              )}
            </div>
            <div className="p-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
              <button 
                onClick={() => setSelectedList(options)}
                className="text-sm font-extrabold text-[#001c56] hover:underline"
              >
                تحديد الكل
              </button>
              <button 
                onClick={() => setSelectedList([])}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                مسح
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredTeachers = teachersData.filter(teacher => {
    const matchesSearch = teacher.name.includes(searchQuery) || teacher.subject.includes(searchQuery);
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(teacher.subject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#001c56] mb-2 text-center md:text-right">إدارة فريق التدريس</h1>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Teachers */}
        <div className="bg-[#f8fafc] rounded-[32px] p-6 text-center shadow-sm border border-gray-50 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 font-bold text-sm mb-2">إجمالي المدرسين</h3>
          <div className="flex items-end gap-2 mb-1 justify-center">
            <div className="text-3xl font-extrabold text-[#001c56]">24</div>
          </div>
          <div className="text-[10px] text-gray-400 font-bold">96% تفاعل</div>
        </div>

        {/* Active Teachers */}
        <div className="bg-[#f8fafc] rounded-[32px] p-6 text-center shadow-sm border border-gray-50 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 font-bold text-sm mb-2">المدرسون النشطون</h3>
          <div className="flex items-center gap-2 mb-1 justify-center">
            <div className="text-3xl font-extrabold text-[#001c56]">22</div>
          </div>
          <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ArrowUpRight size={12} />
            12%
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-[#f8fafc] rounded-[32px] p-6 text-center shadow-sm border border-gray-50 flex flex-col justify-center items-center">
          <h3 className="text-[#001c56] font-bold text-sm mb-2">متوسط الحضور</h3>
          <div className="flex items-center gap-2 mb-1 justify-center">
            <div className="text-3xl font-extrabold text-[#001c56]">96%</div>
          </div>
          <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ArrowUpRight size={12} />
            5%
          </div>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-[32px] p-2 mb-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-2 border border-gray-100">
        
        {/* Search */}
        <div className="flex items-center flex-1 bg-gray-50/50 rounded-full px-4 py-2.5 w-full lg:max-w-md">
          <Search size={18} className="text-gray-400 ml-2 shrink-0" />
          <input 
            type="text" 
            placeholder="ابحث باسم المدرس.." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 text-right"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-2 w-full lg:w-auto flex-wrap justify-end">
          <MultiSelectDropdown 
            name="subject" 
            label="المادة (الكل)" 
            options={filterOptions.subject} 
            selectedList={selectedSubjects} 
            setSelectedList={setSelectedSubjects} 
            searchQuery={subjectSearchQuery} 
            setSearchQuery={setSubjectSearchQuery}
            placeholder="اكتب اسم المادة"
          />
          <MultiSelectDropdown 
            name="status" 
            label="الحالة (نشط)" 
            options={filterOptions.status} 
            selectedList={selectedStatuses} 
            setSelectedList={setSelectedStatuses} 
            searchQuery={statusSearchQuery} 
            setSearchQuery={setStatusSearchQuery}
            placeholder="اكتب اسم الحالة"
          />
          <MultiSelectDropdown 
            name="group" 
            label="المجموعة (الكل)" 
            options={filterOptions.group} 
            selectedList={selectedGroups} 
            setSelectedList={setSelectedGroups} 
            searchQuery={groupSearchQuery} 
            setSearchQuery={setGroupSearchQuery}
            placeholder="اكتب اسم المجموعة"
          />
        </div>

      </div>

      {/* Teachers List */}
      <div className="space-y-4 mb-8">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col xl:flex-row items-center gap-6 xl:gap-4 transition-all hover:shadow-md">
            
            {/* Teacher Info */}
            <div className="flex items-center gap-4 w-full xl:w-auto xl:min-w-[220px] justify-end xl:justify-start">
              <div className="text-right flex-1 xl:flex-none">
                <h3 className="text-base font-bold text-[#001c56] mb-0.5">{teacher.name}</h3>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full inline-block">
                  {teacher.subject}
                </span>
              </div>
              <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                <Image 
                  src={teacher.avatar}
                  alt={teacher.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats - Grid on smaller screens, row on large */}
            <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4 xl:flex xl:items-center xl:justify-end xl:gap-8">
              
              <div className="text-center bg-[#f8fafc] px-4 py-3 rounded-[20px] border border-gray-50 col-span-1">
                <p className="text-[10px] text-gray-500 font-bold mb-1 flex items-center justify-center gap-1">
                  عدد المجموعات
                </p>
                <p className="text-xl font-extrabold text-[#001c56]">{teacher.groupsCount}</p>
              </div>

              <div className="text-center bg-[#f8fafc] px-4 py-3 rounded-[20px] border border-gray-50 col-span-1">
                <p className="text-[10px] text-gray-500 font-bold mb-1 flex items-center justify-center gap-1">
                  <Users2 size={12} className="text-gray-400" /> عدد الطلاب
                </p>
                <p className="text-xl font-extrabold text-[#001c56]">{teacher.studentsCount}</p>
              </div>

              <div className="text-right bg-[#f8fafc] px-6 py-3 rounded-[20px] border border-gray-50 col-span-2 xl:flex-1 xl:max-w-[280px]">
                <div className="flex justify-between items-center mb-2 text-[10px] font-bold text-[#001c56]">
                  <span>{teacher.activityRate}%</span>
                  <span className="text-gray-500">نسبة النشاط</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 flex justify-end">
                  <div className="bg-[#001c56] h-2 rounded-full" style={{ width: `${teacher.activityRate}%` }}></div>
                </div>
              </div>

              <div className="text-center flex flex-col items-center justify-center col-span-2 md:col-span-4 xl:col-span-1 xl:min-w-[100px] mt-2 xl:mt-0">
                <div className="flex items-center gap-1 mb-1.5 flex-row-reverse">
                  {renderStars(teacher.rating)}
                </div>
                <p className="text-[10px] text-gray-500 font-bold bg-gray-50 px-3 py-1 rounded-full">المرتبة #{teacher.rank}</p>
              </div>

            </div>

            {/* Action */}
            <div className="shrink-0 w-full xl:w-auto mt-2 xl:mt-0 border-t border-gray-50 xl:border-none pt-4 xl:pt-0 text-center xl:text-left">
              <Link href={`/team/${teacher.id}`} className="inline-block text-center px-6 py-2.5 bg-[#f8fafc] hover:bg-gray-100 text-gray-700 rounded-full text-xs font-bold transition-colors border border-gray-100 shadow-sm w-full xl:w-auto">
                عرض الملف
              </Link>
            </div>

          </div>
        ))
        ) : (
          <div className="text-center py-12 bg-white rounded-[32px] border border-gray-100 shadow-sm text-gray-500 font-medium">
            لا يوجد مدرسين يطابقون بحثك
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-6 gap-4">
        <p className="text-[11px] text-gray-400 font-bold order-2 sm:order-1">عرض 1-4 من 42 مدرس</p>
        
        <div className="flex items-center gap-1 flex-row-reverse order-1 sm:order-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 bg-white transition-colors">
            <ChevronRight size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#001c56] text-white font-extrabold text-xs shadow-sm">
            1
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 bg-white font-extrabold text-xs transition-colors">
            2
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 bg-white font-extrabold text-xs transition-colors">
            3
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 bg-white transition-colors">
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
