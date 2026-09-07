import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface UseCoursesParams {
  tenantId: string | undefined;
  search?: string;
  subjectId?: string;
  gradeLevelId?: string;
  status?: number;
  page?: number;
  pageSize?: number;
}

export function useCourses({
  tenantId,
  search,
  subjectId,
  gradeLevelId,
  status,
  page = 1,
  pageSize = 20,
}: UseCoursesParams) {
  return useQuery({
    queryKey: [
      "courses",
      tenantId,
      { search, subjectId, gradeLevelId, status, page, pageSize },
    ],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/courses", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            search: search || undefined,
            subjectId: subjectId || undefined,
            gradeLevelId: gradeLevelId || undefined,
            status: status !== undefined ? status : undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch courses");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

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

