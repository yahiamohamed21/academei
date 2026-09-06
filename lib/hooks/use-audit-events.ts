import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseAuditEventsParams {
  tenantId: string | undefined;
  entityType?: string;
  action?: string;
  actorMembershipId?: string;
  fromUtc?: string;
  toUtc?: string;
  page?: number;
  pageSize?: number;
}

export function useAuditEvents({
  tenantId,
  entityType,
  action,
  actorMembershipId,
  fromUtc,
  toUtc,
  page = 1,
  pageSize = 50,
}: UseAuditEventsParams) {
  return useQuery({
    queryKey: ["audit-events", tenantId, { entityType, action, actorMembershipId, fromUtc, toUtc, page, pageSize }],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/audit-events", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            entityType: entityType || undefined,
            action: action || undefined,
            actorMembershipId: actorMembershipId || undefined,
            fromUtc: fromUtc || undefined,
            toUtc: toUtc || undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch audit events");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}
