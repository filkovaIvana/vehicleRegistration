package org.example.security;

import org.example.entity.User;
import org.example.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade {

    private final UserService userService;

    public AuthenticationFacade(UserService userService) {
        this.userService = userService;
    }

    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) auth.getPrincipal();
        return userService.getUserByUsername(username);
    }
}
