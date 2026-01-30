package com.mys.api.modules.auth.model.dto;

import com.mys.api.modules.users.model.dto.UserResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private UserResponseDTO user;
}
