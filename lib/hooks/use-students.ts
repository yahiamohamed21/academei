import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { components } from "@/lib/api/v1";

export type StudentCreateRequest = components["schemas"]["StudentCreateRequest"];

interface UseStudentsParams {
  tenantId: string | undefined;
}

export function useStudents({ tenantId }: UseStudentsParams) {
  return useQuery({
    queryKey: ["students", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/students", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch students");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: StudentCreateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students", {
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
        throw new Error((error as any)?.detail || "Failed to create student");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}
