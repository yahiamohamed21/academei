import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { components } from "@/lib/api/v1";

// Types
export type StudentCreateRequest = components["schemas"]["StudentCreateRequest"];
export type StudentUpdateRequest = components["schemas"]["StudentUpdateRequest"];
export type GuardianWriteRequest = components["schemas"]["GuardianWriteRequest"];
export type GuardianResponse = components["schemas"]["GuardianResponse"];
export type StudentGuardianCreateRequest = components["schemas"]["StudentGuardianCreateRequest"];
export type StudentGuardianUpdateRequest = components["schemas"]["StudentGuardianUpdateRequest"];
export type StudentGuardianResponse = components["schemas"]["StudentGuardianResponse"];
export type GuardianRelationshipType = components["schemas"]["GuardianRelationshipType"];

interface UseStudentsParams {
  tenantId: string | undefined;
}

interface UseStudentParams {
  tenantId: string | undefined;
  studentId: string | undefined;
}

interface UseStudentGuardiansParams {
  tenantId: string | undefined;
  studentId: string | undefined;
}

// ----------------------------------------------------------------------
// Student Queries & Mutations
// ----------------------------------------------------------------------

export function useStudents({ tenantId }: UseStudentsParams) {
  return useQuery({
    queryKey: ["students", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/students", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch students");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useStudent({ tenantId, studentId }: UseStudentParams) {
  return useQuery({
    queryKey: ["student", tenantId, studentId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!studentId) throw new Error("Student ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/students/{studentId}", {
        params: {
          path: { tenantId, studentId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch student details");
      }

      return data;
    },
    enabled: !!tenantId && !!studentId,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: StudentCreateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students", {
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
        throw new Error((error as any)?.detail || "Failed to create student");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, body }: { tenantId: string; studentId: string; body: StudentUpdateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/students/{studentId}", {
        params: {
          path: { tenantId, studentId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
    },
  });
}

export function useUpdateStudentBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, branchId }: { tenantId: string; studentId: string; branchId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PUT("/api/tenants/{tenantId}/students/{studentId}/branch", {
        params: {
          path: { tenantId, studentId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { branchId },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update student branch");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
    },
  });
}

export function useUpdateStudentGradeLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, gradeLevelId }: { tenantId: string; studentId: string; gradeLevelId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PUT("/api/tenants/{tenantId}/students/{studentId}/grade-level", {
        params: {
          path: { tenantId, studentId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body: { gradeLevelId },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update student grade level");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
    },
  });
}

// ----------------------------------------------------------------------
// Student Status Mutations
// ----------------------------------------------------------------------

export function useSuspendStudentAdministrative() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/suspensions/administrative", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to suspend student administratively");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useSuspendStudentNonPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/suspensions/non-payment", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to suspend student for non-payment");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useReactivateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/reactivation", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to reactivate student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

export function useGraduateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId }: UseStudentParams) => {
      if (!tenantId || !studentId) throw new Error("Tenant ID and Student ID are required");

      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
        throw new Error("فشل في تأمين الاتصال (CSRF)");
      }
      const csrfToken = antiForgeryRes.data.token;

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/graduation", {
        params: {
          path: { tenantId, studentId },
          header: { 
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to graduate student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", tenantId, studentId] });
      queryClient.invalidateQueries({ queryKey: ["students", tenantId] });
    },
  });
}

// ----------------------------------------------------------------------
// Guardian Queries & Mutations
// ----------------------------------------------------------------------

export function useGuardians(tenantId: string | undefined) {
  return useQuery({
    queryKey: ["guardians", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/guardians", {
        params: {
          path: { tenantId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch guardians");
      }

      return data;
    },
    enabled: !!tenantId,
  });
}

export function useGuardian(tenantId: string | undefined, guardianId: string | undefined) {
  return useQuery({
    queryKey: ["guardian", tenantId, guardianId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!guardianId) throw new Error("Guardian ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/guardians/{guardianId}", {
        params: {
          path: { tenantId, guardianId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch guardian details");
      }

      return data;
    },
    enabled: !!tenantId && !!guardianId,
  });
}

export function useCreateGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, body }: { tenantId: string; body: GuardianWriteRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/guardians", {
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
        throw new Error((error as any)?.detail || "Failed to create guardian");
      }

      return data;
    },
    onSuccess: (_, { tenantId }) => {
      queryClient.invalidateQueries({ queryKey: ["guardians", tenantId] });
    },
  });
}

export function useUpdateGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, guardianId, body }: { tenantId: string; guardianId: string; body: GuardianWriteRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/guardians/{guardianId}", {
        params: {
          path: { tenantId, guardianId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update guardian");
      }

      return data;
    },
    onSuccess: (_, { tenantId, guardianId }) => {
      queryClient.invalidateQueries({ queryKey: ["guardians", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["guardian", tenantId, guardianId] });
    },
  });
}

// ----------------------------------------------------------------------
// Student-Guardian Link Mutations & Queries
// ----------------------------------------------------------------------

export function useStudentGuardians({ tenantId, studentId }: UseStudentGuardiansParams) {
  return useQuery({
    queryKey: ["student-guardians", tenantId, studentId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required");
      if (!studentId) throw new Error("Student ID is required");

      const { data, error } = await api.GET("/api/tenants/{tenantId}/students/{studentId}/guardians", {
        params: {
          path: { tenantId, studentId },
          header: { "X-Tenant-Id": tenantId },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to fetch student guardians");
      }

      return data;
    },
    enabled: !!tenantId && !!studentId,
  });
}

export function useLinkStudentGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, body }: { tenantId: string; studentId: string; body: StudentGuardianCreateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/guardians", {
        params: {
          path: { tenantId, studentId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to link guardian to student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student-guardians", tenantId, studentId] });
    },
  });
}

export function useUpdateStudentGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, guardianId, body }: { tenantId: string; studentId: string; guardianId: string; body: StudentGuardianUpdateRequest }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.PATCH("/api/tenants/{tenantId}/students/{studentId}/guardians/{guardianId}", {
        params: {
          path: { tenantId, studentId, guardianId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
        body,
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to update student guardian relationship");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student-guardians", tenantId, studentId] });
    },
  });
}

export function useUnlinkStudentGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tenantId, studentId, guardianId }: { tenantId: string; studentId: string; guardianId: string }) => {
      const antiForgeryRes = await api.GET("/api/auth/antiforgery");
      const csrfToken = antiForgeryRes.data?.token || "";

      const { data, error } = await api.POST("/api/tenants/{tenantId}/students/{studentId}/guardians/{guardianId}/unlink", {
        params: {
          path: { tenantId, studentId, guardianId },
          header: {
            "X-Tenant-Id": tenantId,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      });

      if (error) {
        throw new Error((error as any)?.detail || "Failed to unlink guardian from student");
      }

      return data;
    },
    onSuccess: (_, { tenantId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: ["student-guardians", tenantId, studentId] });
    },
  });
}
