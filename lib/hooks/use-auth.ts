import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, type LoginRequest, type RegisterRequest } from "../api/services/auth-service";
import { tenantState } from "../api/state";
import { useState, useEffect } from "react";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      // Initialize CSRF token if missing
      try {
        await authService.getAntiforgeryToken();
      } catch (err) {
        console.warn("Could not pre-fetch CSRF token:", err);
      }
      return authService.getCurrentSession();
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      // Do not retry on 401 Unauthorized
      if (error?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

export function useAuthActions() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registration: RegisterRequest) => authService.register(registration),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null);
      queryClient.clear();
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}

export function useTenantContext() {
  const { data: session } = useSession();
  const [selectedTenantId, setSelectedTenantIdState] = useState<string | null>(() => tenantState.getTenantId());

  useEffect(() => {
    if (session?.selectedTenantId) {
      setSelectedTenantIdState(session.selectedTenantId);
      tenantState.setTenantId(session.selectedTenantId);
    } else if (session?.memberships && session.memberships.length > 0 && !selectedTenantId) {
      const defaultTenant = session.memberships[0].tenantId;
      setSelectedTenantIdState(defaultTenant);
      tenantState.setTenantId(defaultTenant);
    }
  }, [session, selectedTenantId]);

  const setTenantId = (id: string | null) => {
    setSelectedTenantIdState(id);
    tenantState.setTenantId(id);
  };

  return {
    selectedTenantId,
    setTenantId,
    memberships: session?.memberships || [],
  };
}
