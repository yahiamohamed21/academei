import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

// ----------------------------------------------------------------------
// Enums & DTO Interfaces
// ----------------------------------------------------------------------

export enum GroupStatus {
  Active = 1,
  Archived = 2,
}

export enum EnrollmentStatus {
  Active = 1,
  Left = 2,
}

export interface GroupCreateRequest {
  name: string;
  subjectId: string;
  gradeLevelId: string;
  branchId: string;
  teacherProfileId?: string | null;
  capacity?: number | null;
}

export interface GroupUpdateRequest {
  name: string;
  capacity?: number | null;
}

export interface GroupTeacherAssignmentRequest {
  teacherProfileId: string | null;
}

export interface GroupBranchAssignmentRequest {
  branchId: string;
}

export interface GroupPriceUpdateRequest {
  pricePerSession: number | null;
  reason: string;
}

export interface GroupEnrollmentsRequest {
  studentIds: string[];
}

export interface GroupResponse {
  id: string;
  name: string;
  code?: string;
  subjectId: string;
  gradeLevelId: string;
  branchId: string;
  teacherId?: string | null;
  teacherProfileId?: string | null;
  capacity?: number | null;
  maxCapacity?: number;
  enrolledCount?: number;
  activeStudentCount?: number;
  pricePerSession?: number | null;
  status: GroupStatus;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface GroupListItem extends GroupResponse {
  activeStudentCount: number;
}

export interface GroupStudentItem {
  studentId: string;
  studentCode: string;
  fullName: string;
  nationalId: string;
  homeBranchId: string;
  homeBranchName: string;
  gradeLevelId: string;
  gradeLevelName: string;
  joinedAtUtc: string;
  status: EnrollmentStatus;
}

export interface EligibleStudentItem {
  studentId: string;
  studentCode: string;
  fullName: string;
  nationalId: string;
  homeBranchId: string;
  homeBranchName: string;
  gradeLevelId: string;
  gradeLevelName: string;
}

export interface GroupEnrollmentResponse {
  id: string;
  studentId: string;
  status: EnrollmentStatus;
  joinedAtUtc: string;
  leftAtUtc?: string | null;
}

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

// ----------------------------------------------------------------------
// Queries
// ----------------------------------------------------------------------

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

export function useGroup({ tenantId, groupId }: { tenantId: string | undefined; groupId: string | undefined }) {
  return useQuery({
    queryKey: ["group", tenantId, groupId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!groupId) throw new Error("Group ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/groups/{groupId}", {
        params: {
          path: { tenantId, groupId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch group details");
      }

      return data;
    },
    enabled: !!tenantId && !!groupId,
  });
}

export function useGroupStudents({ tenantId, groupId }: { tenantId: string | undefined; groupId: string | undefined }) {
  return useQuery({
    queryKey: ["group-students", tenantId, groupId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!groupId) throw new Error("Group ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/groups/{groupId}/students", {
        params: {
          path: { tenantId, groupId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch enrolled students");
      }

      return data;
    },
    enabled: !!tenantId && !!groupId,
  });
}

export function useEligibleGroupStudents({
  tenantId,
  groupId,
  search,
  page = 1,
  pageSize = 50,
}: {
  tenantId: string | undefined;
  groupId: string | undefined;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["eligible-group-students", tenantId, groupId, { search, page, pageSize }],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!groupId) throw new Error("Group ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/groups/{groupId}/eligible-students", {
        params: {
          path: { tenantId, groupId },
          header: { "X-Tenant-Id": tenantId },
          query: {
            search: search || undefined,
            page,
            pageSize,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch eligible students");
      }

      return data;
    },
    enabled: !!tenantId && !!groupId,
  });
}

// ----------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: GroupCreateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/groups", {
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
        throw new Error((error as any)?.detail || "Failed to create group");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
    },
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, body }: { tenantId: string; groupId: string; body: GroupUpdateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/groups/{groupId}", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update group");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useArchiveGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId }: { tenantId: string; groupId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/groups/{groupId}/archive", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to archive group");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useReactivateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId }: { tenantId: string; groupId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/groups/{groupId}/reactivate", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to reactivate group");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useAssignGroupTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, teacherProfileId, teacherId }: { tenantId: string; groupId: string; teacherProfileId?: string | null; teacherId?: string | null }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const selectedTeacherProfileId = teacherProfileId !== undefined ? teacherProfileId : (teacherId !== undefined ? teacherId : null);

      const { data, error } = await api.PUT("/api/tenants/{tenantId}/groups/{groupId}/teacher", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { teacherProfileId: selectedTeacherProfileId },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to assign teacher to group");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useTransferGroupBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, branchId }: { tenantId: string; groupId: string; branchId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PUT("/api/tenants/{tenantId}/groups/{groupId}/branch", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { branchId },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to transfer group branch");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useUpdateGroupPrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, body }: { tenantId: string; groupId: string; body: GroupPriceUpdateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/groups/{groupId}/price" as any, {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update group price");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
    },
  });
}

export function useEnrollGroupStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, studentIds }: { tenantId: string; groupId: string; studentIds: string[] }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/groups/{groupId}/enrollments", {
        params: {
          path: { tenantId, groupId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { studentIds },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to enroll students in group");
      }

      return data;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
      queryClient.invalidateQueries({ queryKey: ["group-students", tenantId, groupId] });
      queryClient.invalidateQueries({ queryKey: ["eligible-group-students", tenantId, groupId] });
    },
  });
}

export function useLeaveGroupStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, groupId, studentId }: { tenantId: string; groupId: string; studentId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/groups/{groupId}/enrollments/{studentId}/leave", {
        params: {
          path: { tenantId, groupId, studentId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to remove student from group");
      }

      return true;
    },
    onSuccess: (_, { tenantId, groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groups", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["group", tenantId, groupId] });
      queryClient.invalidateQueries({ queryKey: ["group-students", tenantId, groupId] });
      queryClient.invalidateQueries({ queryKey: ["eligible-group-students", tenantId, groupId] });
    },
  });
}
