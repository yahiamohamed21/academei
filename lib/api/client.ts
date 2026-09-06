import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./v1";
import { csrfState, tenantState } from "./state";
import { parseProblemDetails, ApiError } from "./errors/problem-details";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://teachos.runasp.net";

// Middleware for request credentials, CSRF, and Tenant context
const requestAuthAndTenantMiddleware: Middleware = {
  async onRequest({ request }) {
    // Clone headers to modify
    const headers = new Headers(request.headers);

    // Set standard content type if not already set and body exists
    if (!headers.has("Content-Type") && request.body) {
      headers.set("Content-Type", "application/json");
    }

    // Attach CSRF Token if available
    const csrfToken = csrfState.getToken();
    if (csrfToken && !headers.has("X-CSRF-TOKEN")) {
      headers.set("X-CSRF-TOKEN", csrfToken);
    }

    // Attach Tenant Id if available
    const tenantId = tenantState.getTenantId();
    if (tenantId && !headers.has("X-Tenant-Id")) {
      headers.set("X-Tenant-Id", tenantId);
    }

    return new Request(request, {
      headers,
      credentials: "include", // Ensure session and antiforgery cookies are sent with requests
    });
  },
  async onResponse({ response }) {
    if (!response.ok) {
      let problemDetails;
      try {
        const data = await response.clone().json();
        problemDetails = parseProblemDetails(response, data);
      } catch {
        problemDetails = parseProblemDetails(response);
      }
      // Log or trigger handling for specific HTTP status codes if necessary
      if (response.status === 401 && typeof window !== "undefined") {
        // Handle unauthenticated state if needed
      }
    }
    return response;
  },
};

export const api = createClient<paths>({
  baseUrl: BASE_URL,
});

api.use(requestAuthAndTenantMiddleware);

export default api;
