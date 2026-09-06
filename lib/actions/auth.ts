"use server";

import { cookies } from "next/headers";
import { api } from "../api/client";

export async function login(formData: FormData) {
  const emailOrId = formData.get("emailOrId") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Get AntiForgery Token
    const antiForgeryRes = await api.GET("/api/auth/antiforgery");
    
    if (antiForgeryRes.error || !antiForgeryRes.data?.token) {
      return { success: false, message: "فشل في تأمين الاتصال (CSRF)" };
    }

    const csrfToken = antiForgeryRes.data.token;

    // 2. Perform Login
    const loginRes = await api.POST("/api/auth/login", {
      params: {
        header: {
          "X-CSRF-TOKEN": csrfToken,
        }
      },
      body: {
        email: emailOrId,
        password: password,
      },
    });

    if (loginRes.error) {
      // Return specific error message if exists, otherwise generic
      // The error is typed from OpenAPI
      return { success: false, message: (loginRes.error as any)?.detail || "البيانات غير صحيحة" };
    }

    // Since the API uses HTTP-only cookies, they are automatically set on the response by Next.js if we pass them, 
    // but in Server Actions, fetch automatically forwards Set-Cookie headers to the browser.
    
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "حدث خطأ غير متوقع" };
  }
}
