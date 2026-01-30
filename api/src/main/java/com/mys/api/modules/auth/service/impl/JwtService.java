package com.mys.api.modules.auth.service.impl;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mys.api.modules.auth.model.dto.AuthRequest;
import com.mys.api.modules.auth.model.dto.AuthResponse;
import com.mys.api.modules.auth.service.AuthService;
import com.mys.api.modules.users.model.User;
import com.mys.api.modules.users.model.dto.UserResponseDTO;
import com.mys.api.modules.users.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService implements AuthService {

    private final Long jwtExpiration;
    private final SecretKey jwtSecret;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public JwtService(
            @Value("${jwt.expiration}") Long jwtExpiration, 
            @Value("${jwt.secret}") String jwtSecret,
            @Lazy AuthenticationManager authenticationManager,
            UserRepository userRepository) {
        this.jwtExpiration = jwtExpiration;
        this.jwtSecret = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @Override
    public String generateToken(User user) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(jwtSecret)
                .compact();
    } 

    @Override
    public Boolean isTokenValid(String token, UserDetails userDetails) {
        String userName = extractUserName(token);
        Boolean isTokenExpired = isTokenExpired(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired);
    }

    @Override
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(jwtSecret)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            return null;
        }
    } 

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("El usuario no se encontro"));

        String token = generateToken(user);

        UserResponseDTO userDTO = UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(userDTO)
                .build();
    }
}