"use client";

import React, { useState } from "react";
import { 
  Search, Calendar, Users, BookOpen, Clock, 
  ChevronDown, ArrowLeft, ArrowUpRight, ArrowDownRight, CheckCircle2,
  MoreHorizontal, Wallet, Check, X, Download, AlertTriangle, TrendingUp, BarChart3,
  Star, Share2, Receipt, Users2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import Link from "next/link";
import Image from "next/image";

const attendanceData = [
  { name: 'الأحد', uv: 400 },
  { name: 'الإثنين', uv: 550 },
  { name: 'الثلاثاء', uv: 300 },
  { name: 'الأربعاء', uv: 800 },
  { name: 'الخميس', uv: 900 },
  { name: 'الجمعة', uv: 400 },
  { name: 'السبت', uv: 500 },
];

const detailedAttendanceData = [
  { name: 'الأحد', currentWeek: 85, lastWeek: 75 },
  { name: 'الإثنين', currentWeek: 92, lastWeek: 88 },
  { name: 'الثلاثاء', currentWeek: 78, lastWeek: 82 },
  { name: 'الأربعاء', currentWeek: 95, lastWeek: 90 },
  { name: 'الخميس', currentWeek: 88, lastWeek: 85 },
  { name: 'الجمعة', currentWeek: 45, lastWeek: 50 },
  { name: 'السبت', currentWeek: 60, lastWeek: 55 },
];

const studentData = [
  { name: 'نشط', value: 75 },
  { name: 'غير نشط', value: 25 },
];
const COLORS = ['#7896C7', '#f3f4f6'];

const academicDistributionData = [
  { name: 'ممتاز', value: 40, fill: '#001c56' },
  { name: 'جيد جداً', value: 30, fill: '#3b82f6' },
  { name: 'جيد', value: 20, fill: '#64748b' },
  { name: 'ضعيف', value: 10, fill: '#ef4444' },
];

const radarData = [
  { subject: 'الحضور', A: 90, fullMark: 100 },
  { subject: 'متوسط الدرجات', A: 95, fullMark: 100 },
  { subject: 'أداء أفضل 5 مجموعات', A: 85, fullMark: 100 },
  { subject: 'الالتزام', A: 99, fullMark: 100 },
  { subject: 'التفاعل', A: 88, fullMark: 100 },
];

const yearlyFinanceData = [
  { name: 'نوفمبر', income: 4000, expenses: 2400 },
  { name: 'ديسمبر', income: 4500, expenses: 2800 },
  { name: 'سبتمبر', income: 3000, expenses: 2000 },
  { name: 'أكتوبر', income: 2000, expenses: 1800 },
  { name: 'يوليو', income: 6000, expenses: 1900 },
  { name: 'أغسطس', income: 8000, expenses: 4000 },
  { name: 'مايو', income: 3000, expenses: 4500 },
  { name: 'يونيو', income: 2500, expenses: 3800 },
  { name: 'مارس', income: 9000, expenses: 2000 },
  { name: 'ابريل', income: 15000, expenses: 1500 },
  { name: 'يناير', income: 10000, expenses: 3000 },
];

const financeData = [
  { name: '1', value: 10 },
  { name: '2', value: 15 },
  { name: '3', value: 12 },
  { name: '4', value: 25 },
  { name: '5', value: 18 },
  { name: '6', value: 35 },
  { name: '7', value: 28 },
  { name: '8', value: 45 },
];

const filterOptions = {
  date: ["اليوم", "غدا", "الأسبوع القادم", "هذا الشهر", "تاريخ مخصص"],
  grade: ["الأول الثانوي", "الصف الثالث الاعدادي", "الصف الأول الاعدادي", "الصف الثالث الثانوي"],
  subject: ["الأحياء", "اللغة الإنجليزية", "اللغة الفرنسية", "الكيمياء"],
  group: ["مجموعة الفيزياء A", "مجموعة الكيمياء C", "مجموعة الرياضيات D", "مجموعة الأحياء A"],
  teacher: ["أ. عمر طارق", "أ. نوره صالح", "أ. محمود غازي", "أ. أحمد حسن"]
};

export default function ReportsPage() {
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Modal states
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
  const [isClassesModalOpen, setIsClassesModalOpen] = useState(false);
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  
  // Filters...
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateSearchQuery, setDateSearchQuery] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [gradeSearchQuery, setGradeSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getSimulatedMultiplier = () => {
    let multiplier = 1;
    if (selectedGrades.length > 0) multiplier *= 0.5;
    if (selectedSubjects.length > 0) multiplier *= 0.8;
    if (selectedGroups.length > 0) multiplier *= 0.6;
    if (selectedTeachers.length > 0) multiplier *= 0.9;
    return multiplier;
  };

  const mult = getSimulatedMultiplier();

  const MultiSelectDropdown = ({ 
    name, label, options, selectedList, setSelectedList, searchQuery, setSearchQuery, placeholder
  }: any) => {
    const isOpen = activeDropdown === name;
    const filteredOptions = options.filter((opt: string) => opt.includes(searchQuery));

    return (
      <div className="relative">
        <button 
          onClick={() => toggleDropdown(name)}
          className={`flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 transition-colors rounded-full text-sm font-medium whitespace-nowrap min-w-max ${isOpen || selectedList.length > 0 ? 'bg-blue-50 text-[#001c56]' : 'bg-gray-50 text-gray-600'}`}
        >
          {label} {selectedList.length > 0 && `(${selectedList.length})`}
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2">
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
                <label key={option} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
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
                    className="w-4 h-4 rounded border-gray-300 text-[#001c56] focus:ring-[#001c56] accent-[#001c56]"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
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

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001c56] mb-2">التقارير</h1>
          <p className="text-gray-500">نظرة عامة شاملة على أداء المؤسسة، حضور الطلاب، البيانات المالية، وتحليلات المناهج التعليمية.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-[32px] p-2 mb-8 shadow-sm flex flex-col lg:flex-row items-center gap-2 border border-gray-100 w-full">
          
          {/* Right side filters */}
          <div className="flex gap-2 w-full flex-wrap order-2 lg:order-1 flex-1">
            <MultiSelectDropdown 
              name="date" label="التاريخ" options={filterOptions.date} 
              selectedList={selectedDates} setSelectedList={setSelectedDates} 
              searchQuery={dateSearchQuery} setSearchQuery={setDateSearchQuery}
              placeholder="اكتب التاريخ"
            />
            <MultiSelectDropdown 
              name="grade" label="الصف" options={filterOptions.grade} 
              selectedList={selectedGrades} setSelectedList={setSelectedGrades} 
              searchQuery={gradeSearchQuery} setSearchQuery={setGradeSearchQuery}
              placeholder="اكتب الصف"
            />
            <MultiSelectDropdown 
              name="subject" label="المادة" options={filterOptions.subject} 
              selectedList={selectedSubjects} setSelectedList={setSelectedSubjects} 
              searchQuery={subjectSearchQuery} setSearchQuery={setSubjectSearchQuery}
              placeholder="اكتب اسم المادة"
            />
            <MultiSelectDropdown 
              name="group" label="المجموعة" options={filterOptions.group} 
              selectedList={selectedGroups} setSelectedList={setSelectedGroups} 
              searchQuery={groupSearchQuery} setSearchQuery={setGroupSearchQuery}
              placeholder="اكتب اسم المجموعة"
            />
            <MultiSelectDropdown 
              name="teacher" label="المدرس" options={filterOptions.teacher} 
              selectedList={selectedTeachers} setSelectedList={setSelectedTeachers} 
              searchQuery={teacherSearchQuery} setSearchQuery={setTeacherSearchQuery}
              placeholder="اكتب اسم المدرس"
            />
          </div>

          {/* Left side Search */}
          <div className="flex items-center flex-1 bg-white border border-gray-100 rounded-full px-4 py-2.5 w-full lg:max-w-xs order-1 lg:order-2">
            <Search size={20} className="text-gray-400 ml-2" />
            <input 
              type="text" 
              placeholder="ابحث عن اسم، دورة، أو معاملة" 
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Attendance */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-[#001c56] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={14} className="text-green-500" />
                2.4%
              </div>
              <div className="w-12 h-12 bg-[#001c56] text-white rounded-full flex items-center justify-center">
                <Calendar size={24} />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-gray-500 font-bold text-[11px] mb-1 text-right">متوسط الحضور الأسبوعي</h3>
              <div className="text-3xl font-extrabold text-[#001c56] text-right">{Math.round(92 * mult)}%</div>
            </div>
          </div>

          {/* Card 2: Active Students */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={14} />
                +12
              </div>
              <div className="w-12 h-12 bg-[#E4ECF7] text-[#001c56] rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-gray-500 font-bold text-[11px] mb-1 text-right">إجمالي الطلاب النشطين</h3>
              <div className="text-3xl font-extrabold text-[#001c56] text-right">{Math.round(1458 * mult).toLocaleString()}</div>
            </div>
          </div>

          {/* Card 3: Curriculum Completion */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowDownRight size={14} />
                0.5%
              </div>
              <div className="w-12 h-12 bg-amber-900 text-white rounded-full flex items-center justify-center">
                <BookOpen size={24} />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-gray-500 font-bold text-[11px] mb-1 text-right">نسبة إكمال المناهج</h3>
              <div className="text-3xl font-extrabold text-[#001c56] text-right">{Math.round(68 * (mult > 0.5 ? 1 : 0.8))}%</div>
            </div>
          </div>

          {/* Card 4: Teaching Hours */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={14} />
                8.1%
              </div>
              <div className="w-12 h-12 bg-[#E4ECF7] text-[#001c56] rounded-full flex items-center justify-center">
                <Clock size={24} />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-gray-500 font-bold text-[11px] mb-1 text-right">إجمالي ساعات التدريس</h3>
              <div className="text-3xl font-extrabold text-[#001c56] text-right">{Math.round(3240 * mult).toLocaleString()}</div>
            </div>
          </div>

        </div>

        {/* Middle Section (Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Attendance Bar Chart (Right) */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
                تقرير الحضور
              </h2>
              <button 
                onClick={() => setIsAttendanceModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-[#001c56] bg-[#E4ECF7] px-4 py-2 rounded-full hover:bg-[#d0dbe9] transition-colors"
              >
                عرض التفاصيل
                <ArrowLeft size={14} />
              </button>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData.map(d => ({...d, uv: Math.round(d.uv * mult)}))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar 
                    dataKey="uv" 
                    radius={[8, 8, 0, 0]} 
                    barSize={45}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={(entry.uv * mult) > 600 * mult ? '#001c56' : '#E4ECF7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Donut Chart (Left) */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between items-center h-full">
            <div className="w-full flex justify-between items-center mb-4">
               <div className="w-8 h-8 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center">
                 <Users size={16} />
               </div>
               <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
                 تقرير الطلاب
               </h2>
            </div>
            
            <div className="relative w-48 h-48 flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'نشط', value: Math.round(75 * mult) },
                      { name: 'غير نشط', value: Math.round(25 * (2-mult)) }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {studentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-extrabold text-[#001c56]">{Math.round(75 * mult)}%</div>
                <div className="text-[11px] font-bold text-gray-400">نشط</div>
              </div>
            </div>

            <div className="w-full flex justify-between items-end mt-4">
              <button 
                onClick={() => setIsStudentsModalOpen(true)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full text-xs font-bold transition-colors"
              >
                فتح
              </button>
              <div className="text-[11px] font-bold text-gray-500">
                إجمالي المسجلين: <span className="text-[#001c56]">{Math.round(1944 * mult).toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Classes Report (Right) */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                 <div className="w-10 h-10 bg-[#001c56] text-white rounded-full flex items-center justify-center">
                   <BookOpen size={20} />
                 </div>
                 <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
                   تقرير الحصص
                 </h2>
              </div>
              <p className="text-[11px] text-gray-400 mb-8 leading-relaxed text-right font-medium">
                تحليل أداء الحصص الدراسية ومعدلات الإنجاز حسب كل مادة.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 w-8">{Math.round(85 * mult)}%</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-amber-900 h-1.5 rounded-full" style={{ width: `${Math.round(85 * mult)}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-16 text-right">الرياضيات</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 w-8">{Math.round(70 * mult)}%</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-amber-900 h-1.5 rounded-full" style={{ width: `${Math.round(70 * mult)}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-16 text-right">العلوم</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 w-8">{Math.round(92 * mult)}%</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5 flex justify-end">
                    <div className="bg-amber-900 h-1.5 rounded-full" style={{ width: `${Math.round(92 * mult)}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-16 text-right">اللغات</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setIsClassesModalOpen(true)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-[11px] font-bold transition-colors"
              >
                عرض المزيد
              </button>
            </div>
          </div>

          {/* Groups Report (Middle) */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
               <div className="flex justify-between items-center mb-8">
                 <button 
                  onClick={() => setIsGroupsModalOpen(true)}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full text-xs font-bold transition-colors"
                 >
                   فتح
                 </button>
                 <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
                   تقرير المجموعات
                   <div className="w-8 h-8 bg-blue-50 text-[#001c56] rounded-full flex items-center justify-center mr-2">
                     <Users size={16} />
                   </div>
                 </h2>
              </div>
              
              <div className="flex justify-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-50 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-[#001c56] mb-1">{Math.max(5, Math.round(15 * mult))}</span>
                  <span className="text-[10px] text-gray-400 font-bold">متوسط الطلاب</span>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-gray-50 bg-white flex flex-col items-center justify-center shadow-sm">
                  <span className="text-2xl font-extrabold text-[#001c56] mb-1">{Math.max(1, Math.round(42 * mult))}</span>
                  <span className="text-[10px] text-gray-400 font-bold">مجموعة نشطة</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 text-green-600 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold mt-4">
              <CheckCircle2 size={16} />
              {Math.round(95 * (mult > 0.5 ? 1 : 0.8))}% التزام بالجدول
            </div>
          </div>

          {/* Financial Report (Left) */}
          <div className="bg-[#1A2E5E] rounded-[32px] p-8 shadow-sm relative overflow-hidden text-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center">
                <Wallet size={20} className="text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold flex items-center gap-2 justify-end">
                  التقرير المالي
                </h2>
                <p className="text-[11px] text-white/70 mt-1">إجمالي الإيرادات (الشهر الحالي)</p>
              </div>
            </div>

            <div className="text-4xl font-extrabold text-left mb-6 relative z-10" dir="ltr">
              {(45200 * mult).toLocaleString()} <span className="text-xl font-medium">ر.س</span>
            </div>
            
            {/* Sparkline Area */}
            <div className="absolute bottom-12 left-0 right-0 h-24 opacity-80 pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financeData.map(d => ({...d, value: d.value * mult}))}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <button 
              onClick={() => setIsFinanceModalOpen(true)}
              className="relative z-10 flex items-center justify-between bg-white text-[#001c56] px-5 py-2.5 rounded-full text-[11px] font-bold hover:bg-gray-50 transition-colors w-max self-start mt-auto"
            >
              عرض التقرير المالي
              <ArrowLeft size={14} className="ml-2" />
            </button>
          </div>

        </div>

      </div>

      {/* Detailed Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[900px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button onClick={() => setIsAttendanceModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <h2 className="text-xl font-bold text-[#001c56]">تحليل الحضور التفصيلي</h2>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden p-6 gap-6">
              <div className="flex-1 flex flex-col gap-6 order-2 md:order-1 overflow-y-auto pr-2 scrollbar-hide">
                <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                      <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E4ECF7]"></span>الأسبوع الماضي</div>
                      <div className="flex items-center gap-1 text-[#001c56]"><span className="w-2 h-2 rounded-full bg-[#001c56]"></span>الأسبوع الحالي</div>
                    </div>
                    <h3 className="text-sm font-bold text-gray-700">مقارنة الحضور الأسبوعية (%)</h3>
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={detailedAttendanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="lastWeek" fill="#E4ECF7" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="currentWeek" fill="#001c56" radius={[4, 4, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] rounded-3xl p-5 border border-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <Clock size={18} className="text-orange-500" />
                      <h4 className="text-sm font-bold text-gray-700">الطلاب المتأخرين</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-xl p-3 flex justify-between items-center border border-gray-100 shadow-sm"><span className="text-xs font-bold text-orange-500">3 مرات</span><span className="text-sm font-medium text-gray-700">يوسف حسن</span></div>
                      <div className="bg-white rounded-xl p-3 flex justify-between items-center border border-gray-100 shadow-sm"><span className="text-xs font-bold text-orange-500">مرتين</span><span className="text-sm font-medium text-gray-700">ليلى خالد</span></div>
                    </div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-3xl p-5 border border-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <AlertTriangle size={18} className="text-red-500" />
                      <h4 className="text-sm font-bold text-gray-700">الطلاب الأكثر غياباً</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-xl p-3 flex justify-between items-center border border-gray-100 shadow-sm"><span className="text-xs font-bold text-red-500">5 أيام</span><span className="text-sm font-medium text-gray-700">أحمد محمود</span></div>
                      <div className="bg-white rounded-xl p-3 flex justify-between items-center border border-gray-100 shadow-sm"><span className="text-xs font-bold text-red-500">4 أيام</span><span className="text-sm font-medium text-gray-700">سارة علي</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[220px] order-1 md:order-2 flex flex-col gap-4 border-l-0 md:border-l border-gray-100 md:pl-6 pb-6 md:pb-0 shrink-0">
                <div className="bg-[#f8fafc] rounded-3xl p-6 text-center border border-gray-50 flex flex-col justify-center items-center h-[120px]"><p className="text-[10px] text-gray-500 font-bold mb-2">متوسط نسبة الحضور</p><p className="text-3xl font-extrabold text-[#001c56]">92%</p></div>
                <div className="bg-[#f8fafc] rounded-3xl p-6 text-center border border-gray-50 flex flex-col justify-center items-center h-[120px]"><p className="text-[10px] text-gray-500 font-bold mb-2">إجمالي أيام الدراسة هذا الشهر</p><p className="text-3xl font-extrabold text-[#001c56]">22 <span className="text-sm">يوم</span></p></div>
                <div className="mt-auto pt-4 flex justify-end">
                  <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-full text-xs font-bold transition-colors w-full justify-center shadow-sm">تصدير التقرير <Download size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Students Modal */}
      {isStudentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[900px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-start p-6 border-b border-gray-100">
              <button onClick={() => setIsStudentsModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><X size={16} className="text-gray-500" /></button>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-[#001c56]">سجل أداء الطلاب الشامل</h2>
                  <div className="w-10 h-10 bg-[#001c56] text-white rounded-xl flex items-center justify-center"><BarChart3 size={20} /></div>
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-1">تحديث: اليوم، 09:30 صباحاً</p>
              </div>
            </div>
            <div className="p-6 overflow-y-auto scrollbar-hide flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#fdf2f2] rounded-2xl p-6 border border-red-50 flex justify-between items-center h-28">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><AlertTriangle size={20} className="text-red-600" /></div>
                  <div className="text-right"><p className="text-[11px] text-gray-700 font-bold mb-1">عدد الطلاب المتعثرين</p><p className="text-3xl font-extrabold text-red-600">42 <span className="text-sm font-bold text-gray-500">طالب</span></p></div>
                </div>
                <div className="bg-[#f5f7ff] rounded-2xl p-6 border border-blue-50 flex justify-between items-center h-28">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><TrendingUp size={20} className="text-[#001c56]" /></div>
                  <div className="text-right"><p className="text-[11px] text-gray-700 font-bold mb-1">معدل النجاح العام</p><div className="flex items-center gap-2 justify-end"><span className="text-3xl font-extrabold text-[#001c56]">88%</span><span className="text-[10px] text-green-600 font-bold flex items-center"><ArrowUpRight size={12} /> 2.4%</span></div></div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center border-b md:border-b-0 md:border-l border-gray-200 pb-6 md:pb-0 md:pl-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-6 w-full text-right">التوزيع الأكاديمي الشامل</h3>
                  <div className="relative w-64 h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Pie data={academicDistributionData} cx="50%" cy="50%" innerRadius={85} outerRadius={110} startAngle={90} endAngle={-270} paddingAngle={2} dataKey="value" stroke="none">{academicDistributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie></PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"><div className="text-3xl font-extrabold text-[#001c56]">1,200</div><div className="text-[11px] font-bold text-gray-500">إجمالي الطلاب</div></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-gray-600 w-full">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#001c56]"></span> ممتاز (40%)</div><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></span> جيد جداً (30%)</div><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#64748b]"></span> جيد (20%)</div><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span> ضعيف (10%)</div>
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 w-full text-right">توزيع الطلاب حسب المراحل الدراسية</h3>
                  <div className="flex-1">
                    <div className="grid grid-cols-4 text-left text-[11px] text-gray-400 font-bold mb-4 pb-2 border-b border-gray-100"><div className="col-span-1 text-center">الحالة</div><div className="col-span-1 text-center">معدل النجاح</div><div className="col-span-1 text-center">عدد الطلاب</div><div className="col-span-1 text-right">المرحلة الدراسية</div></div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 items-center"><div className="col-span-1 flex justify-center"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">مستقر</span></div><div className="col-span-1 flex items-center justify-center gap-1 text-[11px] font-bold text-gray-700">92% <span className="w-3 h-1 bg-[#001c56] rounded-full inline-block"></span></div><div className="col-span-1 text-center text-xs font-bold text-gray-700">450</div><div className="col-span-1 text-right text-xs font-bold text-[#001c56]">الصف الأول الثانوي</div></div>
                      <div className="grid grid-cols-4 items-center"><div className="col-span-1 flex justify-center"><span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold">مقبول</span></div><div className="col-span-1 flex items-center justify-center gap-1 text-[11px] font-bold text-gray-700">85% <span className="w-3 h-1 bg-gray-400 rounded-full inline-block"></span></div><div className="col-span-1 text-center text-xs font-bold text-gray-700">380</div><div className="col-span-1 text-right text-xs font-bold text-[#001c56]">الصف الثاني الثانوي</div></div>
                      <div className="grid grid-cols-4 items-center"><div className="col-span-1 flex justify-center"><span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-bold">يحتاج متابعة</span></div><div className="col-span-1 flex items-center justify-center gap-1 text-[11px] font-bold text-gray-700">78% <span className="w-3 h-1 bg-red-500 rounded-full inline-block"></span></div><div className="col-span-1 text-center text-xs font-bold text-gray-700">370</div><div className="col-span-1 text-right text-xs font-bold text-[#001c56]">الصف الثالث الثانوي</div></div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center border-t border-gray-100 pt-4"><button className="text-xs font-extrabold text-[#001c56] hover:underline">عرض التفاصيل الكاملة</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Classes Modal */}
      {isClassesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[600px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-start p-6">
              <button onClick={() => setIsClassesModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={16} className="text-gray-500" /></button>
              <div className="text-right">
                <h2 className="text-xl font-bold text-[#001c56]">تحليل الحصص والمقررات الدراسية</h2>
                <p className="text-[11px] text-gray-500 font-medium mt-1">نظرة عامة على الأداء والتفاعل للفصل الدراسي الحالي</p>
              </div>
            </div>
            
            <div className="px-6 pb-6 overflow-y-auto scrollbar-hide flex flex-col gap-6">
              <div className="flex justify-center gap-4">
                <div className="bg-[#f8fafc] rounded-2xl py-4 flex flex-col items-center justify-center flex-1 border border-gray-50">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 text-[10px] font-bold">
                    <Calendar size={12} /> إجمالي الحصص المجدولة
                  </div>
                  <div className="text-3xl font-extrabold text-[#001c56]">145</div>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl py-4 flex flex-col items-center justify-center flex-1 border border-gray-50">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 text-[10px] font-bold">
                    <CheckCircle2 size={12} /> الحصص المنفذة
                  </div>
                  <div className="text-3xl font-extrabold text-[#001c56]">132</div>
                </div>
                <div className="bg-[#fdf2f2] rounded-2xl py-4 flex flex-col items-center justify-center flex-1 border border-red-50">
                  <div className="flex items-center gap-2 mb-2 text-red-500 text-[10px] font-bold">
                    <AlertTriangle size={12} /> الحصص الملغاة
                  </div>
                  <div className="text-3xl font-extrabold text-red-600">13</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <button className="text-xs font-bold text-[#001c56] hover:underline">عرض المزيد</button>
                  <h3 className="text-sm font-bold text-[#001c56]">تقدم المقررات الدراسية</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Subject 1 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                        <span>الإنجاز: 85%</span>
                        <span>التفاعل: 92%</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">الرياضيات</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 flex justify-end">
                      <div className="bg-[#001c56] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  {/* Subject 2 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                        <span>الإنجاز: 78%</span>
                        <span>التفاعل: 88%</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">العلوم</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 flex justify-end">
                      <div className="bg-[#001c56] h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  {/* Subject 3 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                        <span>الإنجاز: 95%</span>
                        <span>التفاعل: 90%</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">اللغة العربية</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 flex justify-end">
                      <div className="bg-[#001c56] h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  {/* Subject 4 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                        <span>الإنجاز: 60%</span>
                        <span>التفاعل: 75%</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">التاريخ</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 flex justify-end">
                      <div className="bg-[#001c56] h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center border border-gray-100 shadow-sm">
                    <span className="text-[9px] text-gray-400 font-bold mb-0.5">نقاط الأداء</span>
                    <span className="text-xs font-extrabold text-[#001c56]">9.8<span className="text-[9px] text-gray-400">/10</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">المعلم الأكثر كفاءة</p>
                    <p className="text-sm font-bold text-[#001c56] mb-1">أ. أحمد منصور</p>
                    <div className="flex items-center gap-0.5 justify-end text-amber-900">
                      <Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full bg-[#001c56]/10 flex items-center justify-center text-[#001c56]"><Users2 size={20} /></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button className="flex-1 px-4 py-3 bg-[#001c56] hover:bg-[#001440] text-white rounded-full text-xs font-bold transition-colors shadow-md text-center">
                  مشاركة التحليل
                </button>
                <button className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-[#001c56] rounded-full text-xs font-bold transition-colors text-center">
                  تحميل التقرير المكتمل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Groups Modal */}
      {isGroupsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[800px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-start p-6 border-b border-gray-100">
              <button onClick={() => setIsGroupsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>
              <h2 className="text-lg font-bold text-[#001c56]">تقرير تفصيلي للمجموعات الدراسية</h2>
            </div>
            
            <div className="p-6 overflow-y-auto scrollbar-hide flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Right: Radar Chart */}
                <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50 flex flex-col items-center justify-center order-1 md:order-2">
                  <h3 className="text-[11px] font-bold text-gray-500 mb-2">أداء أفضل 5 مجموعات</h3>
                  <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                        <Radar name="الأداء" dataKey="A" stroke="#001c56" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Left: Stats */}
                <div className="flex flex-col gap-4 order-2 md:order-1">
                  <div className="bg-[#f8fafc] rounded-[24px] p-5 flex items-center justify-between border border-gray-50">
                    <div className="w-10 h-10 bg-[#001c56] text-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Users2 size={18} /></div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold mb-1">أكبر مجموعة</p>
                      <p className="text-sm font-extrabold text-[#001c56]">مجموعة الكيمياء <span className="text-[10px] text-gray-400 font-bold">(45 طالب)</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8fafc] rounded-[24px] p-5 flex items-center justify-between border border-gray-50">
                    <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0 shadow-sm"><Users size={18} /></div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold mb-1">أصغر مجموعة</p>
                      <p className="text-sm font-extrabold text-[#001c56]">الفيزياء المتقدمة <span className="text-[10px] text-gray-400 font-bold">(12 طالب)</span></p>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] rounded-[24px] p-5 flex items-center justify-between border border-gray-50">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={18} /></div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold mb-1">معدل التزام المجموعات</p>
                      <p className="text-2xl font-extrabold text-[#001c56]">94%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Distribution Tags */}
              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50 text-right mt-2">
                <h3 className="text-sm font-bold text-[#001c56] mb-4">توزيع المجموعات حسب المادة</h3>
                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">لغة عربية: 10 مجموعات</span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">لغة إنجليزية: 15 مجموعة</span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">تاريخ: 5 مجموعات</span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">علوم: 8 مجموعات</span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">رياضيات: 12 مجموعة</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Financial Modal */}
      {isFinanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[700px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button onClick={() => setIsFinanceModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>
              <h2 className="text-lg font-bold text-[#001c56] flex items-center gap-2">
                كشف الحساب المالي الشامل
                <Receipt size={18} className="text-[#001c56]" />
              </h2>
            </div>
            
            <div className="p-6 overflow-y-auto scrollbar-hide flex flex-col gap-6">
              
              {/* Dual Area Chart */}
              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-50 h-[300px] flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-4 text-[10px] font-bold">
                    <div className="flex items-center gap-1 text-[#001c56]"><span className="w-2 h-2 rounded-full bg-[#001c56]"></span> الإيرادات</div>
                    <div className="flex items-center gap-1 text-orange-500"><span className="w-2 h-2 rounded-full bg-orange-500"></span> المصروفات</div>
                  </div>
                  <h3 className="text-xs font-bold text-gray-500">مقارنة الإيرادات والمصروفات (السنوية)</h3>
                </div>
                
                <div className="flex-1 mt-4 relative z-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyFinanceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#001c56" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#001c56" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <RechartsTooltip cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="income" stroke="#001c56" strokeWidth={4} fillOpacity={1} fill="url(#incomeColor)" />
                      <Area type="monotone" dataKey="expenses" stroke="#f97316" strokeWidth={4} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#f8fafc] rounded-2xl p-4 text-center border border-gray-50 flex flex-col justify-center">
                  <p className="text-[10px] text-gray-500 font-bold mb-1">المبالغ المعلقة</p>
                  <p className="text-sm font-extrabold text-gray-700">12,800 <span className="text-[9px]">ر.س</span></p>
                </div>
                <div className="bg-[#001c56] rounded-2xl p-4 text-center text-white flex flex-col justify-center shadow-md shadow-[#001c56]/20">
                  <p className="text-[10px] text-white/80 font-bold mb-1">صافي الربح</p>
                  <p className="text-sm font-extrabold">79,300 <span className="text-[9px]">ر.س</span></p>
                </div>
                <div className="bg-[#fdf8f4] rounded-2xl p-4 text-center border border-orange-50 flex flex-col justify-center">
                  <p className="text-[10px] text-gray-500 font-bold mb-1">المصروفات التشغيلية</p>
                  <p className="text-sm font-extrabold text-orange-500">45,200 <span className="text-[9px]">ر.س</span></p>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4 text-center border border-gray-50 flex flex-col justify-center">
                  <p className="text-[10px] text-gray-500 font-bold mb-1">إجمالي الإيرادات</p>
                  <p className="text-sm font-extrabold text-[#001c56]">124,500 <span className="text-[9px]">ر.س</span></p>
                </div>
              </div>

              {/* Recent Transactions Table */}
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 mt-2">
                <div className="grid grid-cols-4 bg-[#f8fafc] p-4 text-right text-[11px] font-bold text-gray-500 border-b border-gray-100">
                  <div className="col-span-1 text-center">المبلغ</div>
                  <div className="col-span-1 text-center">الحالة</div>
                  <div className="col-span-1 text-center">التاريخ</div>
                  <div className="col-span-1 text-right">البند</div>
                </div>
                <div className="divide-y divide-gray-50">
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-1 text-center text-xs font-bold text-gray-800">85,000 <span className="text-[9px] text-gray-400">ر.س</span></div>
                    <div className="col-span-1 text-center text-[10px] font-bold text-[#001c56]">محصل</div>
                    <div className="col-span-1 text-center text-[10px] font-bold text-gray-500">2023/10/15</div>
                    <div className="col-span-1 text-right text-[11px] font-bold text-gray-700">رسوم دراسية - الفصل الأول</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 items-center">
                    <div className="col-span-1 text-center text-xs font-bold text-gray-800">12,400 <span className="text-[9px] text-gray-400">ر.س</span></div>
                    <div className="col-span-1 text-center text-[10px] font-bold text-orange-500">مصروف</div>
                    <div className="col-span-1 text-center text-[10px] font-bold text-gray-500">2023/10/12</div>
                    <div className="col-span-1 text-right text-[11px] font-bold text-gray-700">عقود صيانة تقنية</div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                <button className="flex items-center gap-2 px-8 py-3.5 bg-[#001c56] hover:bg-[#001440] text-white rounded-full text-xs font-bold transition-colors shadow-md w-full md:w-auto justify-center">
                  <Download size={16} />
                  تحميل الكشف المالي (PDF)
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </>
  );
}
