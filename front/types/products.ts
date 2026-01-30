export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export interface ProductUIState {
  modalOpen: boolean;
  formKey: number;
  companyInput: string;
  selectedCompany: string | null;
  assignModalOpen: boolean;
  assignProductId: number | null;
  assignCompany: string;

  setModalOpen: (open: boolean) => void;
  incrementFormKey: () => void;
  setCompanyInput: (input: string) => void;
  setSelectedCompany: (company: string | null) => void;
  setAssignModalOpen: (open: boolean) => void;
  setAssignProductId: (id: number | null) => void;
  setAssignCompany: (company: string) => void;
  resetAssignState: () => void;
}