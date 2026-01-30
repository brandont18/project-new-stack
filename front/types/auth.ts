import { User } from "@/types/users";

export interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

export interface LoginResponse {
    token: string;
    user: User;
}
