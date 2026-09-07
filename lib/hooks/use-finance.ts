import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

// ----------------------------------------------------------------------
// Enums & Constants
// ----------------------------------------------------------------------

export enum PaymentMethod {
  Cash = 1,
  BankTransfer = 2,
  Card = 3,
  Other = 99,
}

export enum SessionChargeStatus {
  Pending = 1,
  PartiallyPaid = 2,
  Paid = 3,
}

// ----------------------------------------------------------------------
// Types & DTOs
// ----------------------------------------------------------------------

export interface PaymentAllocationInput {
  sessionChargeId: string;
  amount: number;
}

export interface RecordPaymentRequest {
  receivedAtUtc: string;
  method: PaymentMethod;
  currency: string;
  allocations: PaymentAllocationInput[];
  reference?: string | null;
  notes?: string | null;
}

export interface PaymentAllocationSummaryResponse {
  allocationId: string;
  sessionChargeId: string;
  amount: number;
  allocatedAtUtc: string;
}

export interface PaymentResponse {
  paymentId: string;
  amount: number;
  currency: string;
  method: string;
  receivedAtUtc: string;
  receivedByMembershipId: string;
  reference?: string | null;
  notes?: string | null;
  allocations: PaymentAllocationSummaryResponse[];
}

export interface MarkSessionChargePaidRequest {
  reason: string;
}

export interface SessionChargeResponse {
  id: string;
  studentId: string;
  studentName?: string;
  sessionId: string;
  amount: number;
  currency: string;
  status: SessionChargeStatus;
  createdAtUtc: string;
}

// ----------------------------------------------------------------------
// Helper Utilities (Idempotency & SHA-256 Fingerprint)
// ----------------------------------------------------------------------

export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function computeSHA256Fingerprint(body: object): Promise<string> {
  // Sort object keys for stable JSON stringification
  const sortKeys = (obj: any): any => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortKeys);
    return Object.keys(obj)
      .sort()
      .reduce((acc: any, key: string) => {
        acc[key] = sortKeys(obj[key]);
        return acc;
      }, {});
  };

  const normalizedJson = JSON.stringify(sortKeys(body));

  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedJson);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Fallback hash representation if crypto.subtle is unavailable
  let hash = 0;
  for (let i = 0; i < normalizedJson.length; i++) {
    const char = normalizedJson.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, "0");
}

// ----------------------------------------------------------------------
// React Query Hooks
// ----------------------------------------------------------------------

export function useRecordPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      body,
      idempotencyKey,
    }: {
      tenantId: string;
      body: RecordPaymentRequest;
      idempotencyKey?: string;
    }) => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const key = idempotencyKey || generateIdempotencyKey();
      const fingerprint = await computeSHA256Fingerprint(body);

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://teachos.runasp.net";
      const response = await fetch(`${baseUrl}/api/tenants/${tenantId}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": tenantId,
          "X-CSRF-TOKEN": csrfToken,
          "Idempotency-Key": key,
          "X-Idempotency-Fingerprint": fingerprint,
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        let errMessage = "فشل في تسجيل الدفعة المالية";
        try {
          const errData = await response.json();
          errMessage = errData?.detail || errData?.message || errMessage;
        } catch {}
        throw new Error(errMessage);
      }

      return (await response.json()) as PaymentResponse;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["payments", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["session-charges", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useMarkSessionChargePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      chargeId,
      body,
    }: {
      tenantId: string;
      chargeId: string;
      body: MarkSessionChargePaidRequest;
    }) => {
      if (!tenantId || !chargeId) throw new Error("Tenant ID and Charge ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://teachos.runasp.net";
      const response = await fetch(
        `${baseUrl}/api/tenants/${tenantId}/session-charges/${chargeId}/mark-paid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );

      if (!response.ok) {
        let errMessage = "فشل في تسوية المستحق المالي";
        try {
          const errData = await response.json();
          errMessage = errData?.detail || errData?.message || errMessage;
        } catch {}
        throw new Error(errMessage);
      }

      return true;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["session-charges", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}
