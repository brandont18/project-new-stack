import type { Company } from "./companies";
import type { Product } from "./products";

export interface DashboardState {
  companies: Company[];
  products: Product[];
  loading: boolean;
  fetchAll: () => Promise<void>;
}