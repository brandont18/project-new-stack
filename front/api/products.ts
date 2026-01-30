import { setTenantId } from "./axios";
import axios from "./axios";

export async function getProducts() {
  const res = await axios.get("/products");
  return res.data;
}

export async function createProduct(data: { name: string }) {
  const res = await axios.post("/products", data);
  return res.data;
}

export async function getAssignedProducts(nit: string) {
  setTenantId(nit);
  const res = await axios.get("/products/assigned");
  setTenantId(null);
  return res.data;
}

export async function assignProductToCompany(nit: string, productId: number) {
  setTenantId(nit);
  try {
    await axios.post(`/products/${productId}/assign`);
  } finally {
    setTenantId(null);
  }
}