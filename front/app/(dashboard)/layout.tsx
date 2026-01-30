"use client";

import { ModeToggle } from "@/components/mode-toggle";

import Link from "next/link";
import { useActiveNav } from "../../store/activeNavStore";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setToken, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const isActive = useActiveNav(["/", "/companies", "/products"]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="bg-blue-600 text-white p-1 rounded-lg">M&S</span>
              <span className="hidden sm:inline">Mejora y Soluciones</span>
            </Link>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">{user.name}</span>
                </div>
              )}
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          {}
          <nav className="w-56 min-h-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800 py-5 px-3 flex flex-col gap-1 shadow-sm">
            <Link
              href="/"
              className={`py-2.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2.5 text-sm group ${isActive("/") ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" : "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:scale-[1.01]"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span>Inicio</span>
            </Link>
            <Link
              href="/companies"
              className={`py-2.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2.5 text-sm group ${isActive("/companies") ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" : "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:scale-[1.01]"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span>Empresas</span>
            </Link>
            <Link
              href="/products"
              className={`py-2.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2.5 text-sm group ${isActive("/products") ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" : "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:scale-[1.01]"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <span>Productos</span>
            </Link>
          </nav>
          <main className="flex-1 px-6 py-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        <footer className="border-t py-6 text-center text-sm text-slate-500 bg-slate-50/50 dark:bg-slate-950/50">
          <p>© 2026 Mejora y Soluciones • Panel de Gestión</p>
        </footer>
      </div>
    </AuthGuard>
  );
}