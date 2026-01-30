"use client";

import { useProductsStore } from "@/hooks/useProducts";
import { useCompaniesStore } from "@/hooks/useCompanies";
import { CompanySelect } from "@/components/CompanySelect";
import { DataTable } from "@/components/DataTable";
import { FormModal, CreateButton } from "@/components/FormModal";
import { Product } from "@/types/products";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toast, useToast } from "@/components/ui/toast";

import { useProductUIStore } from "@/store/productStore";

export default function ProductsPage() {
  const { 
    modalOpen, setModalOpen,
    formKey, incrementFormKey,
    companyInput, setCompanyInput,
    selectedCompany, setSelectedCompany,
    assignModalOpen, setAssignModalOpen,
    assignProductId, setAssignProductId,
    assignCompany, setAssignCompany,
    resetAssignState
  } = useProductUIStore();

  const { products, loading, error, create, assignProductToCompany, assignLoading } = useProductsStore(selectedCompany);
  const { companies, loading: loadingCompanies } = useCompaniesStore();
  const { toast, showToast, hideToast } = useToast();

  const columns = [
    { key: "id" as keyof Product, header: "ID" },
    { key: "name" as keyof Product, header: "Nombre" },
    {
      key: "createdAt" as keyof Product,
      header: "Creado",
      render: (value: string) => value ? new Date(value).toLocaleDateString() : ""
    },
    ...(!selectedCompany ? [{
      key: "acciones" as any,
      header: "Acciones",
      render: (_: any, row: Product) => (
        <button
          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-xs font-semibold shadow-sm"
          style={{ minWidth: 80 }}
          onClick={() => {
            setAssignProductId(row.id);
            setAssignModalOpen(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Asignar
        </button>
      )
    }] : [])
  ];

  const assignCompanyOptions = companies.map((c: { name: string; nit: string }) => ({ value: c.nit, label: c.name }));

  const handleAssign = async () => {
    if (!assignProductId || !assignCompany) return;
    try {
      await assignProductToCompany({ nit: assignCompany, productId: assignProductId });
      resetAssignState();
      showToast("Producto asignado exitosamente", "success");
    } catch (error) {
      console.error("Error al asignar producto:", error);
      showToast("Error al asignar el producto", "error");
    }
  };

  const fields = [
    { name: "name", label: "Nombre", required: true },
  ];

  const handleCreate = async (values: Record<string, any>) => {
    try {
      await create(values as { name: string });
      showToast("Producto creado exitosamente", "success");
    } catch (error) {
      showToast("Error al crear el producto", "error");
    }
  };

  const companyOptions = companies
    .filter((c: { name: string; nit: string }) => c.name.toLowerCase().includes(companyInput.toLowerCase()))
    .map((c: { name: string; nit: string }) => ({ value: c.nit, label: c.name }));

  const handleSelectCompany = async (nit: string, label: string) => {
    if (!nit) {
      setSelectedCompany(null);
      setCompanyInput("");
      return;
    }
    setSelectedCompany(nit);
  };

  const handleOpenModal = () => {
    incrementFormKey();
    setModalOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Productos</h1>
          <p className="text-slate-500 mt-0.5 text-xs">Administra el inventario de productos</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-800">
        <div className="w-full md:w-80">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Filtrar por empresa</label>
          <CompanySelect
            options={companyOptions}
            loading={loadingCompanies}
            onInputChange={setCompanyInput}
            onSelect={handleSelectCompany}
          />
        </div>
        <div className="md:self-end">
          <CreateButton onClick={handleOpenModal}>
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Crear producto
          </CreateButton>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          error={error?.message}
          emptyText="No hay productos registrados"
        />
      </div>
      <FormModal
        key={formKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        fields={fields}
        title="Crear producto"
        submitText="Crear"
      />

      { }
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <Dialog.Content>
          <form onSubmit={(e) => { e.preventDefault(); handleAssign(); }} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Asignar producto a empresa</h2>
            <div>
              <label className="block mb-2 font-medium">Empresa</label>
              <CompanySelect
                options={assignCompanyOptions}
                loading={loadingCompanies}
                onInputChange={(input) => {
                }}
                onSelect={(nit, label) => {
                  setAssignCompany(nit);
                }}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAssignState();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={assignLoading || !assignCompany}>
                {assignLoading ? "Asignando..." : "Asignar"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}