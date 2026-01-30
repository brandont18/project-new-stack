"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanies, createCompany } from "@/api/companies";

export function useCompaniesStore() {
  const queryClient = useQueryClient();
  
  const { data: companies = [], isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const mutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  return {
    companies,
    loading: isLoading || mutation.isPending,
    error,
    create: mutation.mutateAsync,
  };
}
