import React from "react";

interface EmptySearchProps {
  title?: string;
  message?: string;
}

export default function EmptySearch({
  title = "لا توجد نتائج مطابقة لبحثك",
  message = "لم نتمكن من العثور على نتائج مطابقة لخيارات الفلترة الحالية. جرب تغيير الفلاتر أو إعادة ضبطها.",
}: EmptySearchProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300 w-full">
      <img src="/search_result.jpeg" alt="لا توجد نتائج" className="w-64 h-64 object-contain mb-8" />
      <h2 className="text-2xl font-extrabold text-[#001c56] mb-3">{title}</h2>
      <p className="text-sm font-bold text-gray-500 max-w-md leading-relaxed">
        {message}
      </p>
    </div>
  );
}
