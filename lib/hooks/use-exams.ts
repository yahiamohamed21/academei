import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseExamsParams {
  tenantId: string | undefined;
  courseId: string | undefined;
  status?: number;
  page?: number;
  pageSize?: number;
}

export function useExams({
  tenantId,
  courseId,
  status,
  page = 1,
  pageSize = 20,
}: UseExamsParams) {
  return useQuery({
    queryKey: ["exams", tenantId, courseId, { status, page, pageSize }],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!courseId) throw new Error("Course ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/exams", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            courseId,
            status: status !== undefined ? status : undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch exams");
      }

      return data;
    },
    enabled: !!tenantId && !!courseId,
  });
}
