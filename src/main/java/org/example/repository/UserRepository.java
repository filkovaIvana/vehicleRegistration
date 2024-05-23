package org.example.repository;

import org.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

//    @EntityGraph(value = "User.rolesAndGrants", type = EntityGraph.EntityGraphType.LOAD)
    Optional<User> findByEmail(String username);

//    @EntityGraph(value = "User.rolesAndGrants", type = EntityGraph.EntityGraphType.LOAD)
    Optional<User> findByUserName(String userName);

}
