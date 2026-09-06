// State helpers for CSRF Token and Tenant Context

let memoryCsrfToken: string | null = null;
let memoryTenantId: string | null = null;

const TENANT_STORAGE_KEY = "teacher_os_tenant_id";

export const csrfState = {
  getToken: (): string | null => memoryCsrfToken,
  setToken: (token: string | null) => {
    memoryCsrfToken = token;
  },
};

export const tenantState = {
  getTenantId: (): string | null => {
    if (memoryTenantId) return memoryTenantId;
    if (typeof window !== "undefined") {
      return localStorage.getItem(TENANT_STORAGE_KEY);
    }
    return null;
  },
  setTenantId: (tenantId: string | null) => {
    memoryTenantId = tenantId;
    if (typeof window !== "undefined") {
      if (tenantId) {
        localStorage.setItem(TENANT_STORAGE_KEY, tenantId);
      } else {
        localStorage.removeItem(TENANT_STORAGE_KEY);
      }
    }
  },
};
