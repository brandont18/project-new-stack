"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, getAssignedProducts, assignProductToCompany as apiAssignProductToCompany } from "@/api/products";

export function useProductsStore(nit?: string | null) {
    const queryClient = useQueryClient();
    
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ["products", nit],
        queryFn: () => nit ? getAssignedProducts(nit) : getProducts(),
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const assignMutation = useMutation({
        mutationFn: ({ nit, productId }: { nit: string, productId: number }) => 
            apiAssignProductToCompany(nit, productId),
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["products"] });
            }, 1000);
        },
    });

    return {
        products,
        loading: isLoading || mutation.isPending,
        error,
        create: mutation.mutateAsync,
        assignProductToCompany: assignMutation.mutateAsync,
        assignLoading: assignMutation.isPending,
    };
}
