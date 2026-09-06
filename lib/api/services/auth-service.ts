import api from "../client";
import { csrfState, tenantState } from "../state";
import { ApiError, parseProblemDetails } from "../errors/problem-details";
import type { components } from "../v1";

export type LoginRequest = components["schemas"]["LoginRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];
export type RegisterRequest = components["schemas"]["RegisterRequest"];
export type RegisterResponse = components["schemas"]["RegisterResponse"];
export type CurrentSessionResponse = components["schemas"]["CurrentSessionResponse"];

export const authService = {
  /**
   * 1. GET /api/auth/antiforgery
   * Fetches the CSRF token and sets it in application state memory.
   * Server sets the paired __Host-TeacherOS.Antiforgery cookie automatically.
   */
  async getAntiforgeryToken(): Promise<string> {
    const res = await api.GET("/api/auth/antiforgery");
    if (!res.response.ok || !res.data) {
      throw new ApiError(res.response.status, parseProblemDetails(res.response, res.error));
    }
    csrfState.setToken(res.data.token);
    return res.data.token;
  },

  /**
   * 2. POST /api/auth/login
   * Performs login with credentials and X-CSRF-TOKEN header parameter.
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    let token = csrfState.getToken();
    if (!token) {
      token = await this.getAntiforgeryToken();
    }

    const res = await api.POST("/api/auth/login", {
      params: {
        header: {
          "X-CSRF-TOKEN": token || "",
        },
      },
      body: credentials,
    });

    if (!res.response.ok || !res.data) {
      throw new ApiError(res.response.status, parseProblemDetails(res.response, res.error));
    }

    return res.data;
  },

  /**
   * 3. GET /api/auth/me
   * Retrieves the current user session and memberships.
   */
  async getCurrentSession(): Promise<CurrentSessionResponse> {
    const res = await api.GET("/api/auth/me");
    if (!res.response.ok || !res.data) {
      throw new ApiError(res.response.status, parseProblemDetails(res.response, res.error));
    }

    // Auto-select tenant if not currently set or invalid
    if (res.data.selectedTenantId) {
      tenantState.setTenantId(res.data.selectedTenantId);
    } else if (res.data.memberships && res.data.memberships.length > 0) {
      tenantState.setTenantId(res.data.memberships[0].tenantId);
    }

    return res.data;
  },

  /**
   * POST /api/auth/register
   */
  async register(registration: RegisterRequest): Promise<RegisterResponse> {
    let token = csrfState.getToken();
    if (!token) {
      token = await this.getAntiforgeryToken();
    }

    const res = await api.POST("/api/auth/register", {
      params: {
        header: {
          "X-CSRF-TOKEN": token || "",
        },
      },
      body: registration,
    });

    if (!res.response.ok || !res.data) {
      throw new ApiError(res.response.status, parseProblemDetails(res.response, res.error));
    }

    return res.data;
  },

  /**
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    const token = csrfState.getToken() || "";
    const res = await api.POST("/api/auth/logout", {
      params: {
        header: {
          "X-CSRF-TOKEN": token,
        },
      },
    });

    if (!res.response.ok) {
      throw new ApiError(res.response.status, parseProblemDetails(res.response, res.error));
    }
    csrfState.setToken(null);
    tenantState.setTenantId(null);
  },
};
