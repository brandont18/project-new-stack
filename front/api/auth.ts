import api from "@/api/axios";
import { LoginResponse } from "@/types/auth";

export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};