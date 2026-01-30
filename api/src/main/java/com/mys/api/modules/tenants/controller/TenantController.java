package com.mys.api.modules.tenants.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mys.api.modules.tenants.model.dto.TenantRequestDTO;
import com.mys.api.modules.tenants.model.dto.TenantResponseDTO;
import com.mys.api.modules.tenants.service.TenantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    @PostMapping
    public ResponseEntity<TenantResponseDTO> create(@Valid @RequestBody TenantRequestDTO request) {
        return ResponseEntity.ok(tenantService.createTenant(request));
    }

    @GetMapping
    public ResponseEntity<List<TenantResponseDTO>> getAll() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }
}
