import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { components } from "@/lib/api/v1";

export type GradeLevelWriteRequest = components["schemas"]["GradeLevelWriteRequest"];

export function useGradeLevels(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["grade-levels", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/grade-levels", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch grade levels");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useCreateGradeLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: GradeLevelWriteRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/grade-levels", {
        params: {
          path: { tenantId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to create grade level");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["grade-levels", tenantId] });
    },
  });
}

export function useUpdateGradeLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, gradeLevelId, body }: { tenantId: string; gradeLevelId: string; body: GradeLevelWriteRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/grade-levels/{gradeLevelId}", {
        params: {
          path: { tenantId, gradeLevelId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update grade level");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["grade-levels", tenantId] });
    },
  });
}

