package com.mys.api.modules.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mys.api.modules.products.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
