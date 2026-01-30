export interface Company {
  id: number;
  name: string;
  nit: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
}

export interface CompanyUIState {
  modalOpen: boolean;
  formKey: number;
  setModalOpen: (open: boolean) => void;
  incrementFormKey: () => void;
}