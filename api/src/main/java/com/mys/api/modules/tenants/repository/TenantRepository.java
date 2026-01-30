package com.mys.api.modules.tenants.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mys.api.modules.tenants.model.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, Long> {

}
