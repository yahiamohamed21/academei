import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseSessionsParams {
  tenantId: string | undefined;
  from: string; // ISO Date String
  to: string; // ISO Date String
  groupId?: string;
  teacherId?: string;
  branchId?: string;
  status?: number;
}

export function useSessions({
  tenantId,
  from,
  to,
  groupId,
  teacherId,
  branchId,
  status,
}: UseSessionsParams) {
  return useQuery({
    queryKey: [
      "sessions",
      tenantId,
      { from, to, groupId, teacherId, branchId, status },
    ],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/sessions", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            from,
            to,
            groupId: groupId || undefined,
            teacherId: teacherId || undefined,
            branchId: branchId || undefined,
            status: status !== undefined ? status : undefined,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch sessions");
      }

      return data;
    },
    enabled: !!tenantId && !!from && !!to,
  });
}
