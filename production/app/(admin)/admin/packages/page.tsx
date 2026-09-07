"use client";

import React, { useState } from "react";
import {
  PackagePlus,
  Check,
  Edit2,
  Trash2,
  X,
  Plus
} from "lucide-react";

type PackageType = {
  id: number;
  name: string;
  price: string;
  cycle: string;
  description: string;
  features: string[];
  color: string;
  textColor: string;
  popular?: boolean;
  active: number;
};

const initialPackages: PackageType[] = [
  {
    id: 1,
    name: "الباقة الأساسية",
    price: "500",
    cycle: "شهرياً",
    description: "مثالية للمدرسين المستقلين الذين يبدأون رحلتهم",
    features: ["حتى 100 طالب", "3 مجموعات دراسية", "تخزين 5 جيجابايت", "دعم فني عبر البريد"],
    color: "bg-slate-100",
    textColor: "text-slate-900",
    active: 45
  },
  {
    id: 2,
    name: "الباقة المتقدمة",
    price: "1,000",
    cycle: "شهرياً",
    description: "الخيار الأفضل للمراكز المتوسطة والمدرسين المحترفين",
    features: ["حتى 500 طالب", "مجموعات دراسية غير محدودة", "تخزين 50 جيجابايت", "دعم فني على مدار الساعة", "تقارير متقدمة", "بوابة دفع خاصة"],
    color: "bg-blue-600",
    textColor: "text-white",
    popular: true,
    active: 82
  },
  {
    id: 3,
    name: "الباقة الاحترافية",
    price: "1,500",
    cycle: "شهرياً",
    description: "مصممة للمراكز التعليمية الكبيرة والمدارس",
    features: ["طلاب غير محدودين", "مجموعات دراسية غير محدودة", "تخزين 200 جيجابايت", "مدير حساب مخصص", "نظام اختبارات متقدم", "علامة تجارية مخصصة"],
    color: "bg-slate-900",
    textColor: "text-white",
    active: 15
  }
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageType[]>(initialPackages);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cycle: "شهرياً",
    description: "",
    features: [] as string[],
    color: "bg-slate-100",
    textColor: "text-slate-900",
    popular: false
  });

  const [newFeature, setNewFeature] = useState("");

  const handleDelete = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const handleOpenEdit = (pkg: PackageType) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      cycle: pkg.cycle,
      description: pkg.description,
      features: [...pkg.features],
      color: pkg.color,
      textColor: pkg.textColor,
      popular: pkg.popular || false
    });
    setNewFeature("");
    setIsEditModalOpen(true);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      price: "",
      cycle: "شهرياً",
      description: "",
      features: [],
      color: "bg-slate-100",
      textColor: "text-slate-900",
      popular: false
    });
    setNewFeature("");
    setIsAddModalOpen(true);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...packages.map(p => p.id), 0) + 1;

    const newPkg: PackageType = {
      id: newId,
      name: formData.name,
      price: formData.price,
      cycle: formData.cycle,
      description: formData.description,
      features: formData.features,
      color: formData.color,
      textColor: formData.textColor,
      popular: formData.popular,
      active: 0
    };

    setPackages([...packages, newPkg]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    setPackages(packages.map(p => {
      if (p.id === editingPackage.id) {
        return {
          ...p,
          name: formData.name,
          price: formData.price,
          cycle: formData.cycle,
          description: formData.description,
          features: formData.features,
          color: formData.color,
          textColor: formData.textColor,
          popular: formData.popular,
        };
      }
      return p;
    }));
    setIsEditModalOpen(false);
    setEditingPackage(null);
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">إدارة الباقات والاشتراكات</h1>
          <p className="text-slate-500">تحكم في خطط الأسعار والميزات المتاحة للمدرسين والمراكز.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <PackagePlus size={18} />
          إضافة باقة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`relative rounded-3xl p-8 shadow-lg transition-transform hover:-translate-y-1 ${pkg.color} ${pkg.textColor}`}>

            {pkg.popular && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-4 py-1 rounded-full text-xs font-black shadow-md">
                الأكثر طلباً
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black mb-2">{pkg.name}</h3>
                <p className={`text-sm ${pkg.textColor === 'text-white' ? 'text-white/70' : 'text-slate-500'} font-medium`}>{pkg.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className={`p-2 rounded-lg transition-colors ${pkg.textColor === 'text-white' ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'}`}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className={`p-2 rounded-lg transition-colors ${pkg.textColor === 'text-white' ? 'hover:bg-rose-500/20 text-rose-300 hover:text-rose-200' : 'hover:bg-rose-100 text-rose-500 hover:text-rose-600'}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="my-6 py-6 border-y border-current border-opacity-10">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">{pkg.price}</span>
                <span className={`text-sm font-bold pb-1 ${pkg.textColor === 'text-white' ? 'text-white/70' : 'text-slate-500'}`}>ج.م / {pkg.cycle}</span>
              </div>
              <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${pkg.textColor === 'text-white' ? 'bg-white/10' : 'bg-blue-50 text-blue-600'}`}>
                {pkg.active} اشتراك نشط
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.textColor === 'text-white' ? 'bg-white/20' : 'bg-slate-200 text-slate-700'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className={`text-sm font-semibold ${pkg.textColor === 'text-white' ? 'text-white/90' : 'text-slate-700'}`}>{feature}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {isEditModalOpen ? "تعديل الباقة" : "إضافة باقة جديدة"}
              </h2>
              <button
                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={isEditModalOpen ? handleSaveEdit : handleSaveAdd} className="space-y-4">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">اسم الباقة</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  placeholder="مثال: الباقة الأساسية"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">السعر (ج.م)</label>
                  <input
                    required
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    placeholder="500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">دورة الدفع</label>
                  <select
                    value={formData.cycle}
                    onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option>شهرياً</option>
                    <option>سنوياً</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">وصف قصير</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                  <span>المميزات المتاحة ({formData.features.length})</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                    placeholder="مثال: حتى 100 طالب"
                    className="flex-1 h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="w-11 h-11 flex items-center justify-center shrink-0 bg-slate-100 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {formData.features.length > 0 && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2 max-h-[160px] overflow-y-auto">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-white px-3 py-2 border border-slate-200 rounded-lg">
                        <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Check size={14} className="text-emerald-500" />
                          {feature}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">لون الخلفية (Tailwind Class)</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value, textColor: e.target.value === 'bg-slate-100' ? 'text-slate-900' : 'text-white' })}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option value="bg-slate-100">فضي (فاتح)</option>
                    <option value="bg-blue-600">أزرق</option>
                    <option value="bg-slate-900">أسود (داكن)</option>
                    <option value="bg-emerald-600">أخضر</option>
                    <option value="bg-rose-600">أحمر</option>
                  </select>
                </div>
                <div className="space-y-2 pt-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.popular}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="font-bold text-slate-800 text-sm">شريط "الأكثر طلباً"</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  {isEditModalOpen ? "حفظ التعديلات" : "إضافة الباقة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
