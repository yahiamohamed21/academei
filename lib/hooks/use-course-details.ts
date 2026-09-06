import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseCourseDetailsParams {
  tenantId: string | undefined;
  courseId: string | undefined;
}

export function useCourseDetails({ tenantId, courseId }: UseCourseDetailsParams) {
  return useQuery({
    queryKey: ["course", tenantId, courseId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!courseId) throw new Error("Course ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/courses/{courseId}", {
        params: {
          path: { tenantId, courseId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch course details");
      }

      return data;
    },
    enabled: !!tenantId && !!courseId,
  });
}
