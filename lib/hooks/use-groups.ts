import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseGroupsParams {
  tenantId: string | undefined;
  search?: string;
  subjectId?: string;
  gradeLevelId?: string;
  branchId?: string;
  teacherId?: string;
  status?: number;
  page?: number;
  pageSize?: number;
}

export function useGroups({
  tenantId,
  search,
  subjectId,
  gradeLevelId,
  branchId,
  teacherId,
  status,
  page = 1,
  pageSize = 50,
}: UseGroupsParams) {
  return useQuery({
    queryKey: [
      "groups",
      tenantId,
      { search, subjectId, gradeLevelId, branchId, teacherId, status, page, pageSize },
    ],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/groups", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            search: search || undefined,
            subjectId: subjectId || undefined,
            gradeLevelId: gradeLevelId || undefined,
            branchId: branchId || undefined,
            teacherId: teacherId || undefined,
            status: status !== undefined ? status : undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch groups");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}
