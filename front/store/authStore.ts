import { User } from "@/types/users";
import { AuthState } from "@/types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: string | null) => set({ token }),
            user: null,
            setUser: (user: User | null) => set({ user }),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);