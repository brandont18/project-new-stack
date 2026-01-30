package com.mys.api.modules.auth.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequest {
    @NotBlank(message = "El correo es obligatorio")
    @NotNull(message = "El correo es obligatorio")
    @Email(message = "El correo es invalido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @NotNull(message = "La contraseña es obligatoria")
    private String password;
}
