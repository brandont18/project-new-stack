
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

let tenantId: string | null = null;
export function setTenantId(nit: string | null) {
    tenantId = nit;
}

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (!config.headers) config.headers = new axios.AxiosHeaders();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (tenantId) {
        config.headers["X-Tenant-ID"] = tenantId;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                useAuthStore.getState().setToken("");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
