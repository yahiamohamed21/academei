"use client";

import React, { useState, useRef } from "react";
import { Search, ChevronDown, FileText, Video, Table, Presentation, MoreVertical, Plus, Pencil, Download, Share2, Trash2, X, FileUp, CloudUpload, File, Copy, CheckCircle2 } from "lucide-react";
import EmptySearch from "@/components/ui/EmptySearch";

export default function SubjectFilesPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"upload" | "edit">("upload");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [fileToShare, setFileToShare] = useState<any>(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = ["الكل", "الكيمياء", "الفيزياء", "الاحياء", "اللغة الأنجليزية", "الرياضيات"];

  const [filesList, setFilesList] = useState([
    {
      id: 1,
      subject: "مادة الكيمياء",
      title: "شرح الحسابات الكيميائية والمول",
      size: "8.5 MB",
      type: "PowerPoint",
      icon: <Presentation size={18} className="text-red-500" />,
      iconBg: "bg-red-50",
    },
    {
      id: 2,
      subject: "مادة الكيمياء",
      title: "تدريبات المعادلات الكيميائية الشاملة",
      size: "1.1 MB",
      type: "Word",
      icon: <FileText size={18} className="text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      id: 3,
      subject: "مادة الكيمياء",
      title: "ملخص الباب الأول والثاني - الكيمياء العضوية",
      size: "2.4 MB",
      type: "PDF",
      icon: <FileText size={18} className="text-red-500" />,
      iconBg: "bg-red-50",
    },
    {
      id: 4,
      subject: "مادة الكيمياء",
      title: "تسجيل شرح تجارب المعمل الافتراضي",
      size: "45:20",
      type: "Video",
      icon: <Video size={18} className="text-white" />,
      iconBg: "bg-gray-800",
    },
    {
      id: 5,
      subject: "مادة الكيمياء",
      title: "جدول درجات وتفاعلات العناصر",
      size: "540 KB",
      type: "Excel",
      icon: <Table size={18} className="text-blue-500" />,
      iconBg: "bg-blue-50",
    }
  ]);

  const handleDownload = (fileName: string) => {
    const element = document.createElement("a");
    const blob = new Blob(["هذا محتوى تجريبي للملف المحمل للاختبار."], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://academei.com/files/${fileToShare?.id || '123'}`);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const filteredFiles = filesList.filter(file => {
    const matchesSearch = file.title.includes(searchQuery) || file.subject.includes(searchQuery);
    const matchesFilter = activeFilter === "الكل" || file.subject.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-24 relative min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="text-right mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-[#001c56]">ملفات المواد</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col xl:flex-row-reverse justify-between items-center gap-4 mb-10 bg-white p-2.5 rounded-[40px] border border-gray-100 shadow-sm w-full">
        
        {/* Filter Pills */}
        <div className="flex flex-row flex-wrap items-center justify-center xl:justify-start flex-1 gap-1 px-2 w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold transition-all duration-200 shrink-0 ${
                activeFilter === filter
                  ? "bg-[#001c56] text-white shadow-md shadow-blue-900/20"
                  : "bg-transparent text-gray-500 hover:text-[#001c56]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="hidden xl:block w-px h-8 bg-gray-100 shrink-0"></div>

        {/* Search */}
        <div className="relative w-full xl:w-[350px] shrink-0">
          <input 
            type="text" 
            placeholder="ابحث باسم الملف أو المادة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-50 rounded-full h-11 pr-12 pl-4 text-xs font-bold text-right focus:outline-none focus:ring-2 focus:ring-[#001c56]/20 transition-all placeholder:text-gray-400"
            dir="rtl"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

      </div>

      {/* Grid */}
      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-[32px] p-6 border border-gray-50 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[160px]">
            
            {/* Top Row: Icon & Subject & More */}
            <div className="flex justify-between items-start mb-4 flex-row-reverse">
              
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${file.iconBg}`}>
                  {file.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-400 block text-right">{file.subject}</span>
              </div>

              {/* Actions Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === file.id ? null : file.id)}
                  className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
                
                {/* Dropdown Menu */}
                {activeDropdown === file.id && (
                  <div className="absolute top-8 left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-2 animate-in fade-in zoom-in-95 duration-100 text-right">
                    <button 
                      onClick={() => { 
                        setModalMode("edit");
                        setIsUploadModalOpen(true); 
                        setActiveDropdown(null); 
                      }}
                      className="w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-end gap-3 transition-colors"
                    >
                      تعديل الملف
                      <Pencil size={14} className="text-[#001c56]" />
                    </button>
                    <button 
                      onClick={() => { 
                        handleDownload(file.title); 
                        setActiveDropdown(null); 
                      }}
                      className="w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-end gap-3 transition-colors"
                    >
                      تحميل الملف
                      <Download size={14} className="text-[#001c56]" />
                    </button>
                    <button 
                      onClick={() => { 
                        setFileToShare(file);
                        setIsShareModalOpen(true); 
                        setActiveDropdown(null); 
                      }}
                      className="w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-end gap-3 transition-colors"
                    >
                      نقل/ مشاركة الملف
                      <Share2 size={14} className="text-[#001c56]" />
                    </button>
                    <button 
                      onClick={() => {
                        setFileToDelete(file.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 flex items-center justify-end gap-3 transition-colors border-t border-gray-50 mt-1 pt-3"
                    >
                      حذف الملف
                      <Trash2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Title */}
            <div className="text-right mb-6">
              <h3 className="text-[13px] font-extrabold text-[#001c56] leading-relaxed line-clamp-2">
                {file.title}
              </h3>
            </div>
            
            {/* Bottom Info */}
            <div className="flex justify-end">
              <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 flex-row-reverse">
                {file.size} &bull; {file.type}
              </span>
            </div>
            
          </div>
        ))}
        </div>
      ) : (
        <EmptySearch message="لم نتمكن من العثور على ملفات مطابقة لخيارات الفلترة الحالية (الاسم، أو المادة). جرب تغيير الفلاتر أو إعادة ضبطها." />
      )}

      {/* Floating Action Button */}
      <div className="fixed md:absolute bottom-8 left-8 z-40">
        <button 
          onClick={() => {
            setModalMode("upload");
            setIsUploadModalOpen(true);
          }}
          className="px-6 py-3.5 bg-[#001c56] hover:bg-blue-900 text-white rounded-full text-xs font-bold transition-colors shadow-lg shadow-blue-900/30 flex items-center gap-2 flex-row-reverse"
        >
          <Plus size={16} />
          رفع ملف جديد للمادة
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {fileToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[400px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center p-8 text-center">
            
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Trash2 size={24} className="text-gray-600" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-[#001c56] mb-3">حذف الملف</h2>
            <p className="text-sm font-bold text-gray-500 mb-8">هل أنت متأكد من رغبتك في حذف هذا الملف بشكل نهائي؟</p>
            
            <div className="flex gap-4 w-full flex-row-reverse">
              <button 
                onClick={() => setFileToDelete(null)}
                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button 
                onClick={() => {
                  setFilesList(filesList.filter(f => f.id !== fileToDelete));
                  setFileToDelete(null);
                }}
                className="flex-1 py-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 flex-row-reverse"
              >
                <Trash2 size={16} />
                تأكيد الحذف
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload File Slide-over */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 rounded-r-[32px] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-50 shrink-0">
              <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <h2 className="text-lg font-extrabold text-[#001c56] flex items-center gap-3">
                {modalMode === "upload" ? "رفع ملف تعليمي جديد" : "تعديل الملف"}
                <div className="w-8 h-8 rounded-full bg-[#001c56] text-white flex items-center justify-center shadow-sm">
                  {modalMode === "upload" ? <FileUp size={14} /> : <Pencil size={14} />}
                </div>
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div className="space-y-1.5 text-right">
                <label className="text-[10px] font-bold text-gray-500 mr-2">اسم المادة</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-full h-11 px-4 text-xs font-bold text-gray-700 appearance-none text-right outline-none focus:ring-2 focus:ring-[#001c56]/20" dir="rtl">
                    <option value="" disabled selected>اختر المادة الدراسية</option>
                    <option>الكيمياء</option>
                    <option>الفيزياء</option>
                  </select>
                  <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-[10px] font-bold text-gray-500 mr-2">عنوان الملف</label>
                <input type="text" placeholder="مثلاً: ملخص الباب الأول" className="w-full bg-gray-50 border border-gray-100 rounded-full h-11 px-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right placeholder:text-gray-400" dir="rtl" />
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-[10px] font-bold text-gray-500 mr-2">نوع الملف</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-full h-11 px-4 text-xs font-bold text-gray-700 appearance-none text-right outline-none focus:ring-2 focus:ring-[#001c56]/20" dir="rtl">
                    <option value="" disabled selected>ملف PDF</option>
                    <option>Word</option>
                    <option>PowerPoint</option>
                    <option>Video</option>
                  </select>
                  <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-[10px] font-bold text-gray-500 mr-2">القسم أو الباب الدراسي</label>
                <input type="text" placeholder="مثلاً: الفصل الدراسي الأول" className="w-full bg-gray-50 border border-gray-100 rounded-full h-11 px-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right placeholder:text-gray-400" dir="rtl" />
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-[10px] font-bold text-gray-500 mr-2">رفع الملف</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <File size={20} className="text-[#001c56]" />
                      </div>
                      <p className="text-xs font-bold text-[#001c56] mb-1">{selectedFile.name}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        className="text-[10px] text-red-500 hover:underline mt-1"
                      >
                        إزالة الملف
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <CloudUpload size={20} className="text-[#001c56]" />
                      </div>
                      <p className="text-xs font-bold text-[#001c56] mb-1">اسحب الملف هنا أو انقر <span className="underline">للاختيار</span> من الجهاز</p>
                      <p className="text-[10px] text-gray-400 font-bold">الحد الأقصى للحجم: 50MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-right pb-4">
                <label className="text-[10px] font-bold text-gray-500 mr-2">وصف مختصر (اختياري)</label>
                <textarea placeholder="أضف وصفاً لمحتويات الملف.." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#001c56]/20 text-right placeholder:text-gray-400 min-h-[100px] resize-none" dir="rtl"></textarea>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-50 flex gap-3 shrink-0 flex-row-reverse">
              <button 
                onClick={() => {
                  if (selectedFile) alert(`جاري رفع الملف: ${selectedFile.name}`);
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                }}
                className="flex-[2] py-3.5 bg-[#001c56] text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md"
              >
                {modalMode === "upload" ? "تأكيد ورفع الملف" : "حفظ التعديلات"}
              </button>
              <button 
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                }}
                className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && fileToShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[450px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center p-8 text-center relative overflow-hidden">
            
            <button 
              onClick={() => setIsShareModalOpen(false)} 
              className="absolute top-4 left-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Share2 size={24} className="text-[#001c56]" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-[#001c56] mb-2">مشاركة الملف</h2>
            <p className="text-sm font-bold text-gray-500 mb-6">انسخ الرابط أدناه لمشاركة الملف "{fileToShare.title}"</p>
            
            <div className="w-full flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-full mb-6">
              <button 
                onClick={handleCopyLink}
                className="w-10 h-10 flex items-center justify-center bg-[#001c56] hover:bg-blue-900 text-white rounded-full transition-colors shrink-0"
              >
                {isLinkCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
              <input 
                type="text" 
                readOnly 
                value={`https://academei.com/files/${fileToShare.id}`} 
                className="flex-1 bg-transparent border-none text-xs text-gray-500 outline-none text-right px-2"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
