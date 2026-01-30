package com.mys.api.modules.tenants.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mys.api.modules.tenants.model.Tenant;
import com.mys.api.modules.tenants.model.dto.TenantRequestDTO;
import com.mys.api.modules.tenants.model.dto.TenantResponseDTO;
import com.mys.api.modules.tenants.repository.TenantRepository;
import com.mys.api.modules.tenants.service.TenantService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final com.mys.api.multitenancy.service.TenantMigrationService tenantMigrationService;

    @Override
    public TenantResponseDTO createTenant(TenantRequestDTO request) {
        Tenant tenant = new Tenant();
        tenant.setName(request.getName());
        tenant.setNit(request.getNit());

        Tenant savedTenant = tenantRepository.save(tenant);

        tenantMigrationService.createTenantSchema(savedTenant.getNit());

        return TenantResponseDTO.builder()
                .id(savedTenant.getId())
                .name(savedTenant.getName())
                .nit(savedTenant.getNit())
                .createdAt(savedTenant.getCreatedAt())
                .updatedAt(savedTenant.getUpdatedAt())
                .build();
    }

    @Override
    public List<TenantResponseDTO> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenant -> TenantResponseDTO.builder()
                        .id(tenant.getId())
                        .name(tenant.getName())
                        .nit(tenant.getNit())
                        .createdAt(tenant.getCreatedAt())
                        .updatedAt(tenant.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
