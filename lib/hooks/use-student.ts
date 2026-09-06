import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseStudentParams {
  tenantId: string | undefined;
  studentId: string | undefined;
}

export function useStudent({ tenantId, studentId }: UseStudentParams) {
  return useQuery({
    queryKey: ["student", tenantId, studentId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!studentId) throw new Error("Student ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/students/{studentId}", {
        params: {
          path: { tenantId, studentId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch student details");
      }

      return data;
    },
    enabled: !!tenantId && !!studentId,
  });
}

export function useSuspendStudentAdministrative() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/suspensions/administrative", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to suspend student administratively");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useSuspendStudentNonPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/suspensions/non-payment", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to suspend student for non-payment");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useReactivateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/reactivation", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to reactivate student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}
