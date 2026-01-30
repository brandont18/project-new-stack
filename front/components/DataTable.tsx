import React from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyText?: string;
}

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  loading,
  error,
  emptyText = "Sin datos para mostrar",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 border-b font-semibold text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-400">
                Cargando...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-red-500">
                {error}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="even:bg-slate-50 dark:even:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 border-b">
                    {col.render ? col.render(row[col.key], row) : row[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
