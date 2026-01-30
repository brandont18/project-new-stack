package com.mys.api.modules.tenants.service;

import java.util.List;

import com.mys.api.modules.tenants.model.dto.TenantRequestDTO;
import com.mys.api.modules.tenants.model.dto.TenantResponseDTO;

public interface TenantService {
    TenantResponseDTO createTenant(TenantRequestDTO request);
    List<TenantResponseDTO> getAllTenants();
}
