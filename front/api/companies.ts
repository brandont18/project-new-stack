import axios from "./axios";

export async function getCompanies() {
  const res = await axios.get("/tenants");
  return res.data;
}

export async function createCompany(data: { name: string; nit: string }) {
  const res = await axios.post("/tenants", data);
  return res.data;
}
