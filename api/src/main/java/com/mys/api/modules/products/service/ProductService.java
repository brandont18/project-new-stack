package com.mys.api.modules.products.service;

import java.util.List;

import com.mys.api.modules.products.model.dto.ProductRequestDTO;
import com.mys.api.modules.products.model.dto.ProductResponseDTO;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO request);
    ProductResponseDTO assignProductToCurrentTenant(Long productId);
    List<ProductResponseDTO> getProductsForCurrentTenant();
    List<ProductResponseDTO> getAllProducts();
}
