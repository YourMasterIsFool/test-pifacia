import { $fetch } from "ofetch";
import type { FetchOptions } from "ofetch";
import { CONFIG } from "../../config/config";

export async function apiClient(url: string, options: FetchOptions = {}) {
  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // Tambahkan token jika ada
  };

  try {
    return await $fetch(url, {
      baseURL: CONFIG.baseUrl,
      ...options,
      headers,
    });
  } catch (error: any) {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token"); // Hapus token jika tidak valid
    //   window.location.href = "/login";
    // }
    throw error;
  }
}
