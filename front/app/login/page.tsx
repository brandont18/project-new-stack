"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, LogIn, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/api/auth";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { token, setToken, setUser } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }
        return useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
    }, []);

    useEffect(() => {
        if (isHydrated && token) {
            router.replace("/");
        }
    }, [isHydrated, token, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    if (!isHydrated) return null;

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await login(data);
            setToken(response.token);
            setUser(response.user);
            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Credenciales incorrectas. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute top-4 right-4 z-50">
                <ModeToggle />
            </div>
            
            {}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-blue-600 dark:mix-blend-multiply" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-indigo-600 dark:mix-blend-multiply" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-purple-600 dark:mix-blend-multiply" />

            <div className="w-full max-w-md px-4 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
                        Mejora y Soluciones
                    </h1>
                    <p className="text-muted-foreground">Accede a tu panel de control</p>
                </div>

                <Card className="border-border bg-card/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-bold text-card-foreground">Iniciar Sesión</CardTitle>
                            <LogIn className="w-6 h-6 text-primary" />
                        </div>
                        <CardDescription className="text-muted-foreground">
                            Ingresa tu correo para continuar
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}
                            
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">Correo Electrónico</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@correo.com"
                                        disabled={isLoading}
                                        className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary"
                                        {...register("email", { 
                                            required: "El correo es obligatorio",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Correo inválido"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary"
                                        {...register("password", { 
                                            required: "La contraseña es obligatoria"
                                        })}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-destructive">{errors.password.message}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-4">
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-lg transition-all"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <div className="flex items-center">
                                        Entrar
                                        <ChevronRight className="ml-2 w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
