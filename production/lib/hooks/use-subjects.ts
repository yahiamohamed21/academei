import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export function useSubjects(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["subjects", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/subjects", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch subjects");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}
