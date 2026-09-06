import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

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
