package com.mys.api.modules.tenants.model.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TenantResponseDTO {
    private Long id;
    private String name;
    private String nit;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
