package org.example.security;

import org.example.entity.User;
import org.example.exceptions.ForbiddenException;
import org.example.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 * This methods are called for /register requests in the following order:
 * 1). JWTAuthorizationFilter -> doFilterInternal(req, res, chain) - in which
 * because it does not have authorization set and since there is neither set token bearer so it directly goes to
 * chain.doFilter(req, res);
 */

/*
 * This methods are called for @preauthorize annotated endpoints in the following order:
 * 1). JWTAuthorizationFilter -> doFilterInternal(req, res, chain) - in which checks it authorization need to be done
 * and if bearer token is present for authorization, and if so then check if the token is valid and if the user associated
 * with that token has granted authorities to access that endpoint, and in order to get the authorities
 * gathered from assigned roles invoke:
 * 2). JWTAuthorizationFilter -> getAuthorities() method
 */

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    /*
     * This method is automatically called on requests like /register and all @preauthorize methods and check if
     *  authorization need to be done and if bearer token is present for authorization, and then check if
     * the token is valid and get the user coupled with the token so after can check the granted authorities
     * which are gathered from assigned roles of that user.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException, ForbiddenException {
        // this header variable indicates if authorization is set to be done
        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        // for /register request this header value for authorization is null and there is not bearer token prefix
        if( header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX) ){
            chain.doFilter(req, res);
            return;
        }

        // if enter this part then the requested endpoint is @preauthorize annotated and needs to be authenticated
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        if( authentication == null ){
            // when not being able to get auth, just reject this here without further processing
            res.setStatus(401);
            return;
        }

        // when reaching this, everything went okay
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if( token == null ){
            return null;
        }

        String username = TokenHelper.userFromToken(token);
        if( username == null ){
            return null;
        }
        Optional<User> storedUser = userRepository.findByEmail(username);
        return storedUser
                .map(user ->new UsernamePasswordAuthenticationToken(username,null , getAuthorities(user)))
                .orElse(null);
    }

    /*
     * This returns a list with all rights of the user, which are gathered from assigned roles.
     */
    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        if( user == null ){
            return Collections.emptyList();
        }
        return user.getRoles()
                .stream()
                .map(role -> role.getRights())
                .flatMap(Collection::stream)
                .map(userRight -> {
                    return new SimpleGrantedAuthority(userRight.getName());})
                .collect(Collectors.toList());
    }
}
