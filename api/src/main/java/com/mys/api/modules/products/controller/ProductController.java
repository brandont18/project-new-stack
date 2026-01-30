package com.mys.api.modules.products.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mys.api.modules.products.model.dto.ProductRequestDTO;
import com.mys.api.modules.products.model.dto.ProductResponseDTO;
import com.mys.api.modules.products.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO request) {
        ProductResponseDTO response = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{productId}/assign")
    public ResponseEntity<ProductResponseDTO> assignProductToCurrentTenant(@PathVariable Long productId) {
        ProductResponseDTO response = productService.assignProductToCurrentTenant(productId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/assigned")
    public ResponseEntity<List<ProductResponseDTO>> getProductsForCurrentTenant() {
        List<ProductResponseDTO> products = productService.getProductsForCurrentTenant();
        return ResponseEntity.ok(products);
    }
}
