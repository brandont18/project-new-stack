"use client";

import { useCompaniesStore } from "@/hooks/useCompanies";
import { DataTable } from "@/components/DataTable";
import { FormModal, CreateButton } from "@/components/FormModal";
import { Company } from "@/types/companies";
import { Toast, useToast } from "@/components/ui/toast";

import { useCompanyUIStore } from "@/store/companyStore";

export default function CompaniesPage() {
  const { companies, loading, error, create } = useCompaniesStore();
  const { toast, showToast, hideToast } = useToast();
  const { modalOpen, setModalOpen, formKey, incrementFormKey } = useCompanyUIStore();

  const columns: Array<{ key: keyof Company; header: string; render?: (value: any) => string }> = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nombre" },
    { key: "nit", header: "NIT" },
    {
      key: "createdAt",
      header: "Creado",
      render: (value: string) => value ? new Date(value).toLocaleDateString() : ""
    },
  ];

  const fields = [
    { name: "name", label: "Nombre", required: true },
    { name: "nit", label: "NIT", required: true },
  ];

  const handleCreate = async (values: Record<string, any>) => {
    try {
      await create(values as { name: string; nit: string; });
      showToast("Empresa creada exitosamente", "success");
    } catch (error) {
      showToast("Error al crear la empresa", "error");
    }
  };

  const handleOpenModal = () => {
    incrementFormKey();
    setModalOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Empresas</h1>
          <p className="text-slate-500 mt-0.5 text-xs">Gestiona todas las empresas del sistema</p>
        </div>
        <CreateButton onClick={handleOpenModal}>
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Crear empresa
        </CreateButton>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <DataTable
          columns={columns}
          data={companies}
          loading={loading}
          error={error?.message}
          emptyText="No hay empresas registradas"
        />
      </div>
      <FormModal
        key={formKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        fields={fields}
        title="Crear empresa"
        submitText="Crear"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}