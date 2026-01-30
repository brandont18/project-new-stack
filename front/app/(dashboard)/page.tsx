"use client";

import { useDashboardStore } from "@/hooks/useDashboard";
import { DashboardIcons } from "@/components/DashboardIcons";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";


export default function DashboardPage() {
  const { companies, products, loading } = useDashboardStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Panel de Control</h1>
          <p className="text-slate-500 mt-0.5 text-xs">Resumen general del sistema</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden group animate-fade-in-up">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="relative pb-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 shadow-md shadow-blue-500/30">
                <DashboardIcons.company className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Empresas</CardTitle>
                <CardDescription className="text-xs">Total registradas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {loading ? (
              <div className="text-center text-muted-foreground py-4 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">{companies.length}</span>
                <span className="text-xs text-slate-500">activas</span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800 hover:shadow-lg hover:shadow-purple-200/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="relative pb-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 shadow-md shadow-purple-500/30">
                <DashboardIcons.product className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Productos</CardTitle>
                <CardDescription className="text-xs">Total registrados</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {loading ? (
              <div className="text-center text-muted-foreground py-4 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent">{products.length}</span>
                <span className="text-xs text-slate-500">disponibles</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}