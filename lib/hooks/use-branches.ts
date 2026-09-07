import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { components } from "@/lib/api/v1";

export type BranchWriteRequest = components["schemas"]["BranchWriteRequest"];

export function useBranches(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["branches", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/branches", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch branches");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, name }: { tenantId: string; name: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/branches", {
        params: {
          path: { tenantId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { name },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to create branch");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["branches", tenantId] });
    },
  });
}

export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, branchId, name }: { tenantId: string; branchId: string; name: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/branches/{branchId}", {
        params: {
          path: { tenantId, branchId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { name },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update branch");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["branches", tenantId] });
    },
  });
}

