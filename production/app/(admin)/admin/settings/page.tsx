"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Globe, 
  Shield, 
  BellRing,
  CreditCard,
  Save,
  CheckCircle2,
  Lock,
  Smartphone,
  Mail
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    // General
    platformName: "أكاديميا برو",
    supportEmail: "support@academei.com",
    allowAutoRegistration: true,
    inviteOnly: false,
    
    // Security
    require2FA: false,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    
    // Billing
    stripeEnabled: true,
    stripeKey: "pk_test_12345...",
    paymobEnabled: false,
    paymobKey: "",
    vodafoneEnabled: true,
    vodafoneNumber: "01000000000",
    
    // Notifications
    emailAlerts: true,
    smsAlerts: false,
    notifyNewRegistration: true,
    notifyFailedPayments: true,
    notifySystemUpdates: false
  });

  const tabs = [
    { id: "general", label: "إعدادات عامة", icon: Globe },
    { id: "security", label: "الأمان والصلاحيات", icon: Shield },
    { id: "billing", label: "بوابات الدفع", icon: CreditCard },
    { id: "notifications", label: "إعدادات الإشعارات", icon: BellRing },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl relative">
      
      {showSuccess && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 size={20} />
          تم حفظ الإعدادات بنجاح
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">إعدادات النظام</h1>
        <p className="text-slate-500">إدارة الإعدادات العامة للمنصة، وبوابات الدفع، والإشعارات.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-100 p-2 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <>
              <div className="space-y-4 border-b border-slate-100 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  معلومات المنصة
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">اسم المنصة</label>
                    <input 
                      type="text" 
                      value={settings.platformName}
                      onChange={(e) => handleChange("platformName", e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">البريد الإلكتروني للدعم الفني</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      onChange={(e) => handleChange("supportEmail", e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b border-slate-100 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  إعدادات التسجيل
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.allowAutoRegistration} onChange={() => handleToggle("allowAutoRegistration")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">السماح بتسجيل المدرسين الجدد تلقائياً</p>
                      <p className="text-xs text-slate-500 font-medium">سيتمكن أي شخص من إنشاء حساب مدرس وتجربة النظام.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.inviteOnly} onChange={() => handleToggle("inviteOnly")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">تفعيل نظام دعوات الانضمام (Invite-only)</p>
                      <p className="text-xs text-slate-500 font-medium">لا يمكن لأي مدرس التسجيل إلا بدعوة من الإدارة.</p>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <>
              <div className="space-y-4 border-b border-slate-100 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  إعدادات الأمان
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.require2FA} onChange={() => handleToggle("require2FA")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><Lock size={14} className="text-slate-400" /> فرض المصادقة الثنائية (2FA)</p>
                      <p className="text-xs text-slate-500 font-medium">إجبار جميع المديرين على استخدام المصادقة الثنائية عند تسجيل الدخول.</p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">إنهاء الجلسة تلقائياً (بالدقائق)</label>
                    <select 
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="15">15 دقيقة</option>
                      <option value="30">30 دقيقة</option>
                      <option value="60">ساعة واحدة</option>
                      <option value="never">أبداً</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">سياسة كلمات المرور</label>
                    <select 
                      value={settings.passwordPolicy}
                      onChange={(e) => handleChange("passwordPolicy", e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="standard">قياسية (8 أحرف وأرقام)</option>
                      <option value="strong">قوية (أحرف، أرقام، ورموز)</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* BILLING TAB */}
          {activeTab === "billing" && (
            <>
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                  بوابات الدفع الإلكتروني
                </h3>
                
                {/* Stripe */}
                <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">ST</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Stripe</h4>
                        <p className="text-xs text-slate-500">للمدفوعات الدولية والبطاقات</p>
                      </div>
                    </div>
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.stripeEnabled} onChange={() => handleToggle("stripeEnabled")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {settings.stripeEnabled && (
                    <div className="pt-3 border-t border-slate-100">
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">مفتاح الربط (API Key)</label>
                      <input 
                        type="text" 
                        value={settings.stripeKey}
                        onChange={(e) => handleChange("stripeKey", e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Paymob */}
                <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">PM</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Paymob</h4>
                        <p className="text-xs text-slate-500">للمدفوعات المحلية والمحافظ الإلكترونية</p>
                      </div>
                    </div>
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.paymobEnabled} onChange={() => handleToggle("paymobEnabled")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {settings.paymobEnabled && (
                    <div className="pt-3 border-t border-slate-100">
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">مفتاح الربط (API Key)</label>
                      <input 
                        type="text" 
                        value={settings.paymobKey}
                        onChange={(e) => handleChange("paymobKey", e.target.value)}
                        placeholder="أدخل مفتاح Paymob..."
                        className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Vodafone Cash */}
                <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-bold">VF</div>
                      <div>
                        <h4 className="font-bold text-slate-900">فودافون كاش (يدوي)</h4>
                        <p className="text-xs text-slate-500">تلقي التحويلات يدوياً وتأكيدها</p>
                      </div>
                    </div>
                    <label className="relative cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.vodafoneEnabled} onChange={() => handleToggle("vodafoneEnabled")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {settings.vodafoneEnabled && (
                    <div className="pt-3 border-t border-slate-100">
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">رقم المحفظة</label>
                      <input 
                        type="text" 
                        value={settings.vodafoneNumber}
                        onChange={(e) => handleChange("vodafoneNumber", e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  )}
                </div>

              </div>
            </>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <>
              <div className="space-y-4 border-b border-slate-100 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  قنوات الإشعار
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${settings.emailAlerts ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className={settings.emailAlerts ? 'text-blue-600' : 'text-slate-400'} />
                      <span className="font-bold text-sm text-slate-700">البريد الإلكتروني</span>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.emailAlerts} onChange={() => handleToggle("emailAlerts")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${settings.smsAlerts ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className={settings.smsAlerts ? 'text-blue-600' : 'text-slate-400'} />
                      <span className="font-bold text-sm text-slate-700">رسائل نصية (SMS)</span>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.smsAlerts} onChange={() => handleToggle("smsAlerts")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  الأحداث
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">تسجيل مركز جديد</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">إرسال إشعار عند اشتراك مدرس أو مركز جديد في المنصة.</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifyNewRegistration} onChange={() => handleToggle("notifyNewRegistration")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">فشل عمليات الدفع</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">تنبيه فوري عند فشل عملية تجديد أي باقة.</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifyFailedPayments} onChange={() => handleToggle("notifyFailedPayments")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer group p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">تحديثات النظام</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">تلقي إشعارات دورية بحالة الخوادم والتحديثات الجديدة.</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifySystemUpdates} onChange={() => handleToggle("notifySystemUpdates")} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
              إلغاء
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {isSaving ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
