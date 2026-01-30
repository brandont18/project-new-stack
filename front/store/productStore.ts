import { create } from 'zustand';
import type { ProductUIState } from '@/types/products';

export const useProductUIStore = create<ProductUIState>((set) => ({
  modalOpen: false,
  formKey: 0,
  companyInput: "",
  selectedCompany: null,
  assignModalOpen: false,
  assignProductId: null,
  assignCompany: "",

  setModalOpen: (open) => set({ modalOpen: open }),
  incrementFormKey: () => set((state) => ({ formKey: state.formKey + 1 })),
  setCompanyInput: (input) => set({ companyInput: input }),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setAssignModalOpen: (open) => set({ assignModalOpen: open }),
  setAssignProductId: (id) => set({ assignProductId: id }),
  setAssignCompany: (company) => set({ assignCompany: company }),
  resetAssignState: () => set({ assignModalOpen: false, assignProductId: null, assignCompany: "" }),
}));
