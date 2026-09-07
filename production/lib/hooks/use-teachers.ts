import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { components } from "@/lib/api/v1";

type TeacherStatus = components["schemas"]["TeacherStatus"];
export type TeacherCreateRequest = components["schemas"]["TeacherCreateRequest"];

interface UseTeachersParams {
  tenantId: string | undefined;
  search?: string;
  subjectId?: string;
  branchId?: string;
  status?: TeacherStatus;
  page?: number;
  pageSize?: number;
}

export function useTeachers({
  tenantId,
  search,
  subjectId,
  branchId,
  status,
  page = 1,
  pageSize = 50,
}: UseTeachersParams) {
  return useQuery({
    queryKey: ["teachers", tenantId, { search, subjectId, branchId, status, page, pageSize }],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/teachers", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            search: search || undefined,
            subjectId: subjectId || undefined,
            branchId: branchId || undefined,
            status: status !== undefined ? status : undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch teachers");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: TeacherCreateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/teachers", {
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
        throw new Error((error as any)?.detail || "Failed to create teacher");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers", tenantId] });
    },
  });
}

export function useDeactivateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, teacherId }: { tenantId: string; teacherId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/teachers/{teacherId}/deactivate", {
        params: {
          path: { tenantId, teacherId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to deactivate teacher");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers", tenantId] });
    },
  });
}

export function useReactivateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, teacherId }: { tenantId: string; teacherId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/teachers/{teacherId}/reactivate", {
        params: {
          path: { tenantId, teacherId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to reactivate teacher");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers", tenantId] });
    },
  });
}
