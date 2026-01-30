"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuthStore();
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const unsub = useAuthStore.persist.onHydrate(() => setIsHydrated(false));
        const unsubFinish = useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));

        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        return () => {
            unsub();
            unsubFinish();
        };
    }, []);

    useEffect(() => {
        if (isHydrated && !token) {
            router.replace("/login");
        }
    }, [isHydrated, token, router]);

    if (!isHydrated || (isHydrated && token === undefined)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-400 animate-pulse">Cargando aplicación...</p>
            </div>
        );
    }

    if (!token) {
        return null;
    }

    return <>{children}</>;
};
