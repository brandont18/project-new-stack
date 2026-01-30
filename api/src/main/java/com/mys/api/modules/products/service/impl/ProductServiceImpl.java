package com.mys.api.modules.products.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mys.api.modules.products.model.Product;
import com.mys.api.modules.products.model.AssignedProduct;
import com.mys.api.modules.products.model.dto.ProductRequestDTO;
import com.mys.api.modules.products.model.dto.ProductResponseDTO;
import com.mys.api.modules.products.repository.ProductRepository;
import com.mys.api.modules.products.repository.AssignedProductRepository;
import com.mys.api.modules.products.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final AssignedProductRepository assignedProductRepository;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        Product product = new Product();
        product.setName(request.getName());

        Product savedProduct = productRepository.save(product);

        return mapToResponseDTO(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponseDTO assignProductToCurrentTenant(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productId));

        if (assignedProductRepository.existsByProductId(productId)) {
            throw new RuntimeException("El producto ya está asignado a este tenant");
        }

        AssignedProduct assignedProduct = AssignedProduct.builder()
                .productId(productId)
                .build();

        assignedProductRepository.save(assignedProduct);

        return mapToResponseDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsForCurrentTenant() {
        List<AssignedProduct> assignedProducts = assignedProductRepository.findAll();

        List<Long> productIds = assignedProducts.stream()
                .map(AssignedProduct::getProductId)
                .collect(Collectors.toList());

        List<Product> products = productRepository.findAllById(productIds);

        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private ProductResponseDTO mapToResponseDTO(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}
