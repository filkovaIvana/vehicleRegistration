package org.example.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.entity.User;
import org.example.model.UserBasics;
import org.example.model.UserLoginCredientialsModel;
import org.example.repository.UserRepository;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

/**
 * on login request - these methods are automatically called following this order:
 * 1). JWTAuthenticationFilter -> attemptAuthentication(request, response) - parsing the request-body and prepare to
 * get the user credentials like userName and pass
 * 2). JWTAuthenticationFilter -> getUserLoginCredientialsModel(request) - reading the user login credientials
 * 3). JWTAuthenticationFilter -> obtainUsername(request) - get UserLoginCredientials from request and then read the userName
 * 4). JWTAuthenticationFilter -> obtainPassword(request) - get UserLoginCredientials from request and then read the userName
 * 5). AuthenticationManager -> authenticate(authentication) - checks if the passed username and password are valid,
 * and if so will call JWTAuthenticationFilter -> successfulAuthentication() method that generates the token
 * 6). JWTAuthenticationFilter -> successfulAuthentication(request, response, chain, auth) -  generates the token
 * coupled with the username and expirationTime
 */

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private UserRepository userRepository;

    private final ObjectMapper mapper;
    public static final String REQUEST_ATTRIBUTE_FOR_JSON = "JWTAuthenticationFilter_AuthAttribute";

    public JWTAuthenticationFilter(ObjectMapper mapper, UserRepository userRepository) {
        super();
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    /**
     * this method is automatically called from getUserLoginCredentialsModel() method and try to get UserLoginCredientialsModel
     * from request with JSON format and then read the userName
     */
    @Override
    protected String obtainUsername(HttpServletRequest request) {
        return Optional.ofNullable(request.getAttribute(REQUEST_ATTRIBUTE_FOR_JSON))
                .map(model -> (UserLoginCredientialsModel) model)
                .orElseThrow(() -> new AuthenticationServiceException("Could not authenticate user, as request did not contain proper JSON format."))
                .getUsername();
    }

    /**
     * this method is automatically called from getUserLoginCredentialsModel() method and try to get UserLoginCredientialsModel
     * from request with JSON format and then read the password
     */
    @Override
    protected String obtainPassword(HttpServletRequest request) {
        return Optional.ofNullable(request.getAttribute(REQUEST_ATTRIBUTE_FOR_JSON))
                .map(model -> (UserLoginCredientialsModel) model)
                .orElseThrow(() -> new AuthenticationServiceException("Could not authenticate user, as request did not contain proper JSON format."))
                .getPassword();
    }

    /**
     * This method is first called automatically on requests like /login to get and check the
     * UserLoginCredientials like userName and password
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("ENTERED ATTEMPT AUTHENTICATION");
        // as we are parsing the request-body, we have to read the request ONCE (otherwise we are trying to re-read the inputstream, which gets closed)
        request.setAttribute(REQUEST_ATTRIBUTE_FOR_JSON, getUserLoginCredientialsModel(request));
        System.out.println("BEFORE attemptAuthentication: ");
        Authentication attemptAuthenticationResult = super.attemptAuthentication(request, response);
        System.out.println("AFTER attemptAuthentication: " + attemptAuthenticationResult);
        // cleanup
        request.removeAttribute(REQUEST_ATTRIBUTE_FOR_JSON);
        return attemptAuthenticationResult;
    }

    /**
     * This method is called from attemptAuthentication() method and tries to read credentials model from request,
     * as we are expecting this in JSON format instead of url-parameters.
     *
     * @return returns empty optional of request did not contain any parsable JSON
     */
    private UserLoginCredientialsModel getUserLoginCredientialsModel(HttpServletRequest request) {
        try(ServletInputStream inputStream = request.getInputStream()){
            return mapper.readValue(inputStream, UserLoginCredientialsModel.class);
        } catch(IOException e){ // NOSONAR
            // NO-OP
        }
        return null;
    }

    /**
     * this method is automatically called on finishing the authenticate() method from AuthenticationManager
     * after asserting that passed userName and password are valid, and creates token coupled with the username and expirationTime
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) throws IOException, ServletException {
        System.out.println("ENTERED SUCCESSFUL AUTHENTICATION");
        // When authentication was successful, store the username inside the JWT-related HTTP-header
        String username = String.valueOf(auth.getPrincipal());
        Optional<User> userOpt = userRepository.findByEmail(username);
        Date expirationTime = new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME);
        JSONObject userJSONObject = new JSONObject();
        if (userOpt.isPresent()) {
            try{
                UserBasics userBasics = new UserBasics(userOpt.get());
                userJSONObject.put("UserName", userBasics.getUserName());
                userJSONObject.put("Email", userBasics.getEmail());
                userJSONObject.put("Role", userBasics.getRole());
            } catch (JSONException jse){
            }
        }
        response.addHeader(SecurityConstants.HEADER_STRING, TokenHelper.createToken(username, expirationTime));
        response.getWriter().print(String.valueOf(userJSONObject));
    }

}
