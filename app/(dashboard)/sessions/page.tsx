"use client";

import React, { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  FileText, 
  Video, 
  Clock, 
  TrendingUp,
  MonitorPlay,
  CalendarPlus
} from "lucide-react";

const mockSessions = [
  { id: 1, title: 'الفيزياء المتقدمة', teacher: 'أ. محمد علي', time: '10:00 ص', status: 'جارية', attendance: 85, icon: <Video size={24} />, iconColor: 'text-[#001c56]', iconBg: 'bg-blue-100', tagColor: 'bg-green-100 text-green-600', group: 'مجموعه الفيزياء A', subject: 'الفيزياء', dateFilter: 'اليوم' },
  { id: 2, title: 'الرياضيات التطبيقية', teacher: 'أ. محمد يوسف', time: '08:00 ص', status: 'مكتملة', attendance: 95, icon: <FileText size={24} />, iconColor: 'text-gray-600', iconBg: 'bg-white border-2 border-gray-200', tagColor: 'bg-gray-100 text-gray-600', group: 'مجموعه الرياضيات D', subject: 'الرياضيات', dateFilter: 'اليوم' },
  { id: 3, title: 'الكيمياء العضوية', teacher: 'د. سارة أحمد', time: '12:30 م', status: 'قادمة', registered: '45/50', progress: 90, icon: <Clock size={24} />, iconColor: 'text-[#001c56]', iconBg: 'bg-blue-50', tagColor: 'bg-blue-100 text-blue-500', group: 'مجموعه الكيمياء C', subject: 'الكيمياء', dateFilter: 'غدا' },
  { id: 4, title: 'الأحياء العامة', teacher: 'د. ليلى حسن', time: '02:00 م', status: 'ملغاة', reason: 'عذر طبي', tagColor: 'bg-red-50 text-red-500', group: 'مجموعه الأحياء A', subject: 'الأحياء', dateFilter: 'الأسبوع القادم' },
];

export default function SessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateSearchQuery, setDateSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const statuses = ["الكل", "جارية", "مكتملة", "قادمة", "ملغاة"];
  const groupsList = ["مجموعه الفيزياء A", "مجموعه الكيمياء C", "مجموعه الرياضيات D", "مجموعه الأحياء A"];
  const subjectsList = ["الفيزياء", "الكيمياء", "الرياضيات", "الأحياء"];
  const teachersList = ["أ. عمر طارق", "أ. نوره صالح", "أ. محمود غازي", "أ. أحمد حسن", "أ. محمد علي", "أ. محمد يوسف", "د. سارة أحمد", "د. ليلى حسن"];
  const datesList = ["اليوم", "غدا", "الأسبوع القادم", "هذا الشهر"];

  const filteredGroupsList = groupsList.filter(g => g.includes(groupSearchQuery));
  const filteredSubjectsList = subjectsList.filter(s => s.includes(subjectSearchQuery));
  const filteredTeachersList = teachersList.filter(t => t.includes(teacherSearchQuery));
  const filteredDatesList = datesList.filter(d => d.includes(dateSearchQuery));

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.includes(searchQuery) || session.teacher.includes(searchQuery);
    const matchesStatus = statusFilter === "الكل" || session.status === statusFilter;
    const matchesGroup = selectedGroups.length === 0 || selectedGroups.includes(session.group);
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(session.subject);
    const matchesTeacher = selectedTeachers.length === 0 || selectedTeachers.includes(session.teacher);
    const matchesDate = selectedDates.length === 0 || selectedDates.includes(session.dateFilter);
    return matchesSearch && matchesStatus && matchesGroup && matchesSubject && matchesTeacher && matchesDate;
  });

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col items-end">
        <h1 className="text-4xl font-extrabold text-[#001c56] mb-2 tracking-tight flex items-center gap-2">
          إدارة الجلسات
        </h1>
        <p className="text-gray-500 font-medium">
          متابعة وتنظيم الجلسات التعليمية اليومية والمستقبلية
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Completed Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex-1 ml-4">
            <p className="text-gray-500 font-medium mb-4 text-left">الجلسات المكتملة</p>
            <div className="flex items-center gap-4 justify-end">
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex-1 max-w-[200px]">
                <div className="w-[89%] h-full bg-[#001c56] rounded-full"></div>
              </div>
              <span className="text-4xl font-black text-[#001c56]">89%</span>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-medium mb-2 text-center">الجلسات القادمة</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
              هذا الأسبوع
            </span>
            <span className="text-4xl font-black text-[#001c56]">156</span>
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-gray-500 font-medium mb-2 text-center">جلسات اليوم</p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full flex items-center gap-1">
              12% <TrendingUp size={12} />
            </span>
            <span className="text-4xl font-black text-[#001c56]">24</span>
          </div>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-start gap-3 bg-white p-3 rounded-[32px] shadow-sm border border-gray-100">
        <div className="relative">
          <button onClick={() => toggleDropdown('status')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
            {statusFilter !== "الكل" ? statusFilter : "حالة الجلسة"} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'status' && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-10 overflow-hidden">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => { setStatusFilter(status); setActiveDropdown(null); }}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => toggleDropdown('group')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
            المجموعة {selectedGroups.length > 0 && `(${selectedGroups.length})`} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'group' && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-20 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-50">
                <div className="relative">
                  <input 
                    type="text" 
                    value={groupSearchQuery}
                    onChange={(e) => setGroupSearchQuery(e.target.value)}
                    placeholder="أكتب اسم المادة"
                    className="w-full h-9 bg-white border border-gray-200 rounded-lg pr-9 pl-3 text-xs focus:outline-none focus:border-[var(--primary)] text-right"
                  />
                  <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {filteredGroupsList.map(group => (
                  <label key={group} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedGroups.includes(group)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGroups([...selectedGroups, group]);
                        } else {
                          setSelectedGroups(selectedGroups.filter(g => g !== group));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d] accent-[#1a365d]"
                    />
                    <span className="text-sm text-gray-700">{group}</span>
                  </label>
                ))}
                {filteredGroupsList.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">لا توجد مجموعات</p>
                )}
              </div>
              <div className="p-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
                <button 
                  onClick={() => setSelectedGroups(groupsList)}
                  className="text-sm font-extrabold text-[#001c56] hover:underline"
                >
                  تحديد الكل
                </button>
                <button 
                  onClick={() => setSelectedGroups([])}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  مسح
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggleDropdown('subject')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
            المادة {selectedSubjects.length > 0 && `(${selectedSubjects.length})`} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'subject' && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-20 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-50">
                <div className="relative">
                  <input 
                    type="text" 
                    value={subjectSearchQuery}
                    onChange={(e) => setSubjectSearchQuery(e.target.value)}
                    placeholder="أكتب اسم المادة"
                    className="w-full h-9 bg-white border border-gray-200 rounded-lg pr-9 pl-3 text-xs focus:outline-none focus:border-[var(--primary)] text-right"
                  />
                  <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {filteredSubjectsList.map(subject => (
                  <label key={subject} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedSubjects.includes(subject)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSubjects([...selectedSubjects, subject]);
                        } else {
                          setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d] accent-[#1a365d]"
                    />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </label>
                ))}
                {filteredSubjectsList.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">لا توجد مواد</p>
                )}
              </div>
              <div className="p-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
                <button 
                  onClick={() => setSelectedSubjects(subjectsList)}
                  className="text-sm font-extrabold text-[#001c56] hover:underline"
                >
                  تحديد الكل
                </button>
                <button 
                  onClick={() => setSelectedSubjects([])}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  مسح
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button onClick={() => toggleDropdown('teacher')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
            المدرس {selectedTeachers.length > 0 && `(${selectedTeachers.length})`} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'teacher' && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-20 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-50">
                <div className="relative">
                  <input 
                    type="text" 
                    value={teacherSearchQuery}
                    onChange={(e) => setTeacherSearchQuery(e.target.value)}
                    placeholder="أكتب اسم المدرس"
                    className="w-full h-9 bg-white border border-gray-200 rounded-lg pr-9 pl-3 text-xs focus:outline-none focus:border-[var(--primary)] text-right"
                  />
                  <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {filteredTeachersList.map(teacher => (
                  <label key={teacher} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTeachers([...selectedTeachers, teacher]);
                        } else {
                          setSelectedTeachers(selectedTeachers.filter(t => t !== teacher));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d] accent-[#1a365d]"
                    />
                    <span className="text-sm text-gray-700">{teacher}</span>
                  </label>
                ))}
                {filteredTeachersList.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">لا يوجد مدرسين</p>
                )}
              </div>
              <div className="p-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
                <button 
                  onClick={() => setSelectedTeachers(teachersList)}
                  className="text-sm font-extrabold text-[#001c56] hover:underline"
                >
                  تحديد الكل
                </button>
                <button 
                  onClick={() => setSelectedTeachers([])}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  مسح
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button onClick={() => toggleDropdown('date')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
            التاريخ {selectedDates.length > 0 && `(${selectedDates.length})`} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {activeDropdown === 'date' && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-20 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-50">
                <div className="relative">
                  <input 
                    type="text" 
                    value={dateSearchQuery}
                    onChange={(e) => setDateSearchQuery(e.target.value)}
                    placeholder="أكتب التاريخ"
                    className="w-full h-9 bg-white border border-gray-200 rounded-lg pr-9 pl-3 text-xs focus:outline-none focus:border-[var(--primary)] text-right"
                  />
                  <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {filteredDatesList.map(date => (
                  <label key={date} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedDates.includes(date)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDates([...selectedDates, date]);
                        } else {
                          setSelectedDates(selectedDates.filter(d => d !== date));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d] accent-[#1a365d]"
                    />
                    <span className="text-sm text-gray-700">{date}</span>
                  </label>
                ))}
                
                <div className="my-2 border-t border-gray-100 pt-2 px-3 relative">
                  <input 
                    type="date" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      if (e.target.value) {
                        const newDate = e.target.value;
                        if (!selectedDates.includes(newDate)) {
                           setSelectedDates([...selectedDates, newDate]);
                        }
                      }
                    }}
                  />
                  <button className="flex items-center justify-between w-full text-sm font-medium text-gray-600 hover:text-gray-900 group">
                    <span className="flex-1 text-right">تاريخ مخصص</span>
                    <CalendarPlus size={16} className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
                <button 
                  onClick={() => setSelectedDates(datesList)}
                  className="text-sm font-extrabold text-[#001c56] hover:underline"
                >
                  تحديد الكل
                </button>
                <button 
                  onClick={() => setSelectedDates([])}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  مسح
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full max-w-[300px] shrink-0">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو الرقم..." 
            className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-right"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[220px]">
            <div className="flex justify-between items-start">
              <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${session.tagColor}`}>
                {session.status}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm">
                <MonitorPlay size={16} /> قسم الجلسات
              </div>
            </div>
            
            {session.status === 'ملغاة' ? (
              <>
                <div className="flex flex-col items-center justify-center flex-1 my-4">
                  <h3 className="text-3xl font-extrabold text-gray-300">{session.reason}</h3>
                </div>
                <div className="flex justify-end items-center mt-2">
                  <div className="text-left">
                    <h3 className="text-2xl font-extrabold text-[#001c56] mb-1">{session.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{session.teacher} • {session.time}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mt-2">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${session.iconBg} ${session.iconColor}`}>
                    {session.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-extrabold text-[#001c56] mb-1">{session.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{session.teacher} • {session.time}</p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between mt-4">
                  <div className="flex-1 ml-6 relative">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                      <span>{session.attendance ? `${session.attendance}%` : session.registered}</span>
                      <span>{session.attendance ? 'الحضور' : 'المسجلين'}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${session.attendance ? 'bg-[#001c56]' : 'bg-gray-500'}`} style={{ width: `${session.attendance || session.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-gray-600 hover:text-[#001c56] whitespace-nowrap">
                    {session.status === 'مكتملة' ? 'عرض التقرير' : 'عرض المزيد'}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {filteredSessions.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center p-10 bg-white rounded-[32px] border border-gray-100">
            <p className="text-gray-500 font-bold">لم يتم العثور على جلسات تطابق بحثك.</p>
          </div>
        )}
      </div>

    </div>
  );
}
