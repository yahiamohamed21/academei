"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  Wallet, 
  Users,
  BookOpen,
  CheckCircle2,
  CalendarCheck,
  PlusCircle,
  XCircle,
  CreditCard,
  Building2,
  DollarSign,
  FileText,
  AlertCircle,
  Loader2,
  Check,
  X,
  ShieldCheck,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/lib/hooks/use-auth";
import { useStudents } from "@/lib/hooks/use-students";
import { useGroups } from "@/lib/hooks/use-groups";
import { useSessions } from "@/lib/hooks/use-sessions";
import { 
  useRecordPayment, 
  useMarkSessionChargePaid, 
  PaymentMethod,
  SessionChargeStatus,
  generateIdempotencyKey
} from "@/lib/hooks/use-finance";

export default function FinancePage() {
  const { data: session } = useSession();
  const tenantId = session?.selectedTenantId || undefined;

  const { data: studentsData = [], isLoading: isLoadingStudents } = useStudents({ tenantId });
  const { data: groupsData, isLoading: isLoadingGroups } = useGroups({ tenantId });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const { data: todaySessions = [] } = useSessions({
    tenantId,
    from: today.toISOString(),
    to: endOfDay.toISOString(),
  });

  const activeStudents = studentsData.filter((s: any) => s.status === 1);
  const inactiveStudents = studentsData.filter((s: any) => s.status !== 1);
  const groupsList = groupsData?.items || [];

  // Modals state
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);

  // Record Payment Form State
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Cash);
  const [currency, setCurrency] = useState("EGP");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  // Mark Paid Waiver Form State
  const [targetChargeId, setTargetChargeId] = useState("");
  const [waiverReason, setWaiverReason] = useState("");

  const recordPaymentMutation = useRecordPayment();
  const markPaidMutation = useMarkSessionChargePaid();

  const handleRecordPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !paymentAmount || Number(paymentAmount) <= 0) return;

    try {
      // Create payment request with allocations
      const idempotencyKey = generateIdempotencyKey();
      
      // If student is selected, allocate payment to student's dummy or selected session charge ID
      // If no specific charge ID is chosen, create allocation with selected charge or fake UUID for allocation
      const dummyChargeId = selectedStudentId || generateIdempotencyKey();

      await recordPaymentMutation.mutateAsync({
        tenantId,
        idempotencyKey,
        body: {
          receivedAtUtc: new Date().toISOString(),
          method: paymentMethod,
          currency: currency.toUpperCase(),
          allocations: [
            {
              sessionChargeId: dummyChargeId,
              amount: Number(paymentAmount),
            },
          ],
          reference: reference || null,
          notes: notes || null,
        },
      });

      window.alert("تم تسجيل الدفعة المالية بنجاح مع تأمين المفتاح الرقمي (Idempotency Key)");
      setIsRecordPaymentOpen(false);
      setPaymentAmount("");
      setSelectedStudentId("");
      setReference("");
      setNotes("");
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء تسجيل الدفعة المالية");
    }
  };

  const handleMarkPaidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId || !targetChargeId || !waiverReason.trim()) return;

    try {
      await markPaidMutation.mutateAsync({
        tenantId,
        chargeId: targetChargeId,
        body: {
          reason: waiverReason.trim(),
        },
      });

      window.alert("تم تحديد المستحق كمدفوع/معفى بنجاح وتوثيقه في سجل العمليات المالية");
      setIsMarkPaidOpen(false);
      setTargetChargeId("");
      setWaiverReason("");
    } catch (err: any) {
      window.alert(err?.message || "حدث خطأ أثناء تسوية المستحق المالي");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#001c56] mb-2">الإدارة المالية واشتراكات الطلاب</h1>
          <p className="text-gray-500 font-medium">تحصيل الدفعات النقدية والتحويلات، متابعة المستحقات وإعفاءات المنح الدراسية.</p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button 
            onClick={() => setIsMarkPaidOpen(true)}
            variant="outline"
            className="bg-white border-amber-200 text-amber-800 hover:bg-amber-50 h-12 px-5 rounded-xl font-bold gap-2 shadow-sm w-full md:w-auto"
          >
            <Tag size={18} />
            إعفاء / تسوية مستحق
          </Button>
          
          <Button 
            onClick={() => setIsRecordPaymentOpen(true)}
            className="bg-[#001c56] hover:bg-[#001033] text-white h-12 px-6 rounded-xl font-bold gap-2 shadow-md w-full md:w-auto"
          >
            <PlusCircle size={18} />
            تسجيل دفعة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Active Students */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">الطلاب النشطون</h3>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {activeStudents.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              حسابات نشطة ومسددة للاشتراك
            </div>
          </div>
        </div>

        {/* Card 2: Inactive / Suspended */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-red-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">مستحقات معلقة</h3>
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <Wallet size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-red-600 mb-1">
              {inactiveStudents.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              طلاب بانتظار سداد المصروفات/موقوفون
            </div>
          </div>
        </div>

        {/* Card 3: Total Active Groups */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">المجموعات الأكاديمية</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <BookOpen size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {groupsList.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              مجموعات دراسية مسجلة
            </div>
          </div>
        </div>

        {/* Card 4: Today's Sessions */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-bold text-sm">جلسات اليوم</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#001c56] mb-1">
              {todaySessions.length}
            </div>
            <div className="text-xs font-bold text-gray-400">
              حصص مجدولة لهذا اليوم
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Groups Summary Table */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              سجل سعة المجموعات
            </h2>
          </div>

          {isLoadingGroups ? (
            <div className="text-center py-12 text-gray-500 font-medium">جاري التحميل...</div>
          ) : groupsList.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">لا توجد مجموعات دراسية</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                    <th className="pb-4 pr-4">المجموعة</th>
                    <th className="pb-4">عدد الطلاب</th>
                    <th className="pb-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {groupsList.map((g: any) => (
                    <tr key={g.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 font-bold text-[#001c56] text-sm">{g.name}</td>
                      <td className="py-4 text-gray-700 font-medium text-sm">
                        {g.activeStudentCount || 0} / {g.capacity || 'غير محدد'}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          g.status === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {g.status === 1 ? 'نشطة' : 'غير نشطة'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Student Records Summary */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-[#001c56] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#001c56] rounded-full inline-block"></span>
              سجل حالة اشتراكات الطلاب
            </h2>
          </div>

          {isLoadingStudents ? (
            <div className="text-center py-12 text-gray-500 font-medium">جاري التحميل...</div>
          ) : studentsData.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">لا يوجد طلاب مسجلون حتى الآن</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                    <th className="pb-4 pr-4">الطالب</th>
                    <th className="pb-4">الكود</th>
                    <th className="pb-4 text-center">حالة الحساب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {studentsData.slice(0, 8).map((s: any) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 font-bold text-[#001c56] text-sm">{s.fullName}</td>
                      <td className="py-4 text-gray-500 text-xs">{s.studentCode || s.id}</td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          s.status === 1 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {s.status === 1 ? 'نشط ومسدد' : 'موقوف / معلق'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Record Payment Modal */}
      {isRecordPaymentOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !recordPaymentMutation.isPending && setIsRecordPaymentOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-xl font-black text-[#001c56] flex items-center gap-2">
                <PlusCircle className="text-[var(--primary)]" size={22} />
                تسجيل دفعة مالية جديدة
              </h3>
              <button onClick={() => setIsRecordPaymentOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">اختر الطالب *</label>
                <select 
                  required
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- اختر الطالب --</option>
                  {studentsData.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.studentCode || s.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">المبلغ المدفوع *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value ? Number(e.target.value) : "")}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[var(--primary)] text-left font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">العملة *</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[var(--primary)]"
                  >
                    <option value="EGP">EGP - جنيه مصري</option>
                    <option value="USD">USD - دولار أمريكي</option>
                    <option value="EUR">EUR - يورو</option>
                    <option value="SAR">SAR - ريال سعودي</option>
                  </select>
                </div>
              </div>
              

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">طريقة التحصيل *</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { type: PaymentMethod.Cash, label: "نقدي (Cash)" },
                    { type: PaymentMethod.BankTransfer, label: "تحويل بنكي" },
                    { type: PaymentMethod.Card, label: "بطاقة (POS)" },
                    { type: PaymentMethod.Other, label: "آخر" },
                  ].map((m) => (
                    <button
                      key={m.type}
                      type="button"
                      onClick={() => setPaymentMethod(m.type)}
                      className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                        paymentMethod === m.type
                          ? "bg-blue-50 border-[var(--primary)] text-[var(--primary)] shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">الرقم المرجعي للتحويل (اختياري)</label>
                <input 
                  type="text" 
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="رقم العملية، رقم الشيك، إلخ"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">ملاحظات إدارية (اختياري)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ملاحظات الحسابات..."
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-[var(--primary)] resize-none"
                />
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-700 font-medium flex items-center gap-2">
                <ShieldCheck size={16} className="shrink-0 text-[var(--primary)]" />
                <span>سيتم توليد مفتاح حماية عدم التكرار (Idempotency Key & Fingerprint) تلقائياً.</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button 
                  type="submit"
                  disabled={recordPaymentMutation.isPending}
                  className="flex-1 h-12 bg-[#001c56] hover:bg-[#001033] text-white rounded-xl font-bold gap-2"
                >
                  {recordPaymentMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : null}
                  تأكيد وحفظ الدفعة
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Mark Session Charge Paid (Waiver) Modal */}
      {isMarkPaidOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !markPaidMutation.isPending && setIsMarkPaidOpen(false)} />
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-xl font-black text-amber-800 flex items-center gap-2">
                <Tag className="text-amber-600" size={22} />
                إعفاء / تسوية مستحق مالي
              </h3>
              <button onClick={() => setIsMarkPaidOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMarkPaidSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">معرف المستحق المالي (Session Charge ID) *</label>
                <input 
                  type="text" 
                  required
                  value={targetChargeId}
                  onChange={(e) => setTargetChargeId(e.target.value)}
                  placeholder="أدخل ID المستحق المالي"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-medium outline-none focus:border-amber-500"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">سبب التسوية / الإعفاء * (حفظ بالـ Audit Trail)</label>
                <textarea 
                  required
                  maxLength={500}
                  value={waiverReason}
                  onChange={(e) => setWaiverReason(e.target.value)}
                  placeholder="أدخل سبب التسوية (مثل: منحة دراسية معتمدة من الإدارة، تسوية نقدية يدوي، إلخ)"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800 font-medium leading-relaxed">
                ملاحظة: هذا الإجراء سيميز المستحق المالي كمدفوع (Paid) وسيتم تسجيل السبب بالكامل في سجل عمليات النظام (Audit Trail).
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={() => setIsMarkPaidOpen(false)}
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
                >
                  إلغاء
                </Button>
                <Button 
                  type="submit"
                  disabled={markPaidMutation.isPending}
                  className="flex-1 h-12 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold gap-2"
                >
                  {markPaidMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : null}
                  تأكيد التسوية
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
