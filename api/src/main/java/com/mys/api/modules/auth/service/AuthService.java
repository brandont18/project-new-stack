package com.mys.api.modules.auth.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.mys.api.modules.auth.model.dto.AuthRequest;
import com.mys.api.modules.auth.model.dto.AuthResponse;
import com.mys.api.modules.users.model.User;

public interface AuthService {

    String generateToken(User user);

    Boolean isTokenValid(String token, UserDetails userDetails);

    String extractUserName(String token);

    AuthResponse login(AuthRequest request);

}
