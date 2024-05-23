package org.example.repository;

import org.example.entity.UserRight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRightRepository extends JpaRepository<UserRight, Long> {
    Optional<UserRight> findByName(String name);
}

