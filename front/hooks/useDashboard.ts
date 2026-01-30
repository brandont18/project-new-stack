"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/api/companies";
import { getProducts } from "@/api/products";

export function useDashboardStore() {
  
  const { data: companies = [], isLoading: loadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    companies,
    products,
    loading: loadingCompanies || loadingProducts,
  };
}
