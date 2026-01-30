package com.mys.api.modules.products.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mys.api.modules.products.model.AssignedProduct;

public interface AssignedProductRepository extends JpaRepository<AssignedProduct, Long> {
    List<AssignedProduct> findAll();
    Optional<AssignedProduct> findByProductId(Long productId);
    boolean existsByProductId(Long productId);
}
