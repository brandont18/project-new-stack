package com.mys.api.modules.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mys.api.modules.users.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
