package org.example.security;

import org.example.entity.User;
import org.example.repository.UserRepository;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

public class HMUAuthenticationManager implements AuthenticationManager {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public HMUAuthenticationManager(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /*  this method is automatically called on login request after all automatically called methods from JWTAuthenticationFilter
     *  for obtaining UserCredentials are done (except successfulAuthentication()),
     *  and checks if the username and password are valid, and if so on finishing it will proceed to
     *  JWTAuthenticationFilter -> successfulAuthentication() method that generates the token
     */
    @Override
    public Authentication authenticate(Authentication authentication) {
        System.out.println("ENTERED authenticate");
        if( !authentication.getClass().isAssignableFrom(UsernamePasswordAuthenticationToken.class) || authentication.isAuthenticated() ){
            System.out.println("HERE 1");
            throw new AuthenticationServiceException("Got wrong type of auth token");
        }

        UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication;
        System.out.println("authToken: " + authToken);

        String username = String.valueOf(authToken.getPrincipal());
        System.out.println("username: " + username);
        if( username == null || username.trim().isEmpty() ){
            System.out.println("HERE 2");
            throw new BadCredentialsException("No valid username got provided");
        }

        System.out.println("BEFORE CHECK USERNAME");
        User storedUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("Username not found"));
        System.out.println("AFTER CHECK USERNAME");

        System.out.println("BEFORE CHECK PASSWORD");
        String storedCryptedPassword = Optional.ofNullable(storedUser.getPassword())
                .orElseThrow(() -> new AccountExpiredException("No valid password found"));
        System.out.println("AFTER CHECK PASSWORD");

        String requestedPassword = String.valueOf(authToken.getCredentials());
        System.out.println("AFTER requestedPassword");

        if( !passwordEncoder.matches(requestedPassword, storedCryptedPassword) ){
            System.out.println("HERE 3: Provided password did not match stored password");
            throw new BadCredentialsException("Provided password did not match stored password");
        }

        if( !storedUser.isActive() ){
            System.out.println("HERE 4: User is not active");
            throw new BadCredentialsException("User was not active");
        }
        System.out.println("BEFORE END authenticate");
        // return new token including the rights of the user, but do not store password in it
        return new UsernamePasswordAuthenticationToken(storedUser.getEmail(), null, getAuthorities(storedUser));
    }

    /*
     * This returns a list with all rights of the user, which are gathered from assigned roles.
     */
    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        if( user == null || user.isActive() ){
            return Collections.emptyList();
        }
        return user.getRoles()
                .stream()
                .map(userRoleAssociation -> userRoleAssociation.getRights())
                .flatMap(Collection::stream)
                .map(userRight -> new SimpleGrantedAuthority(userRight.getName()))
                .collect(Collectors.toList());
    }

}
