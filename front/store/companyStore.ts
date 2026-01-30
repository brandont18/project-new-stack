import { create } from 'zustand';
import type { CompanyUIState } from '@/types/companies';

export const useCompanyUIStore = create<CompanyUIState>((set) => ({
  modalOpen: false,
  formKey: 0,
  setModalOpen: (open) => set({ modalOpen: open }),
  incrementFormKey: () => set((state) => ({ formKey: state.formKey + 1 })),
}));
