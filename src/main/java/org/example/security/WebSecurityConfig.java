package org.example.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public WebSecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedSlash(true);
        return firewall;
    }
    @Override
    public void configure(WebSecurity web) throws Exception {
        //@formatter:off
        super.configure(web);
        web.httpFirewall(allowUrlEncodedSlashHttpFirewall());

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable().authorizeRequests()
//               ENDPOINT-CONFIGURATION
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/crudApi/searchUsers").permitAll()
                .antMatchers("/crudApi/searchUsersByArea").permitAll()
                .antMatchers("/crudApi/user").permitAll()
                .antMatchers("/crudApi/user/all").permitAll()
                .antMatchers("/crudApi/searchUser/all").permitAll()
                .antMatchers("/crudApi/searchArea/all").permitAll()
//                .antMatchers("/crudApi/searchUserAndArea/all").permitAll()
                .antMatchers("/crudApi/institution/all").permitAll()
                .antMatchers("/crudApi/publication/all").permitAll()
                .antMatchers("/crudApi/publications/*").permitAll()
                .antMatchers("/crudApi/uploadImageUser/*").permitAll()
//                .antMatchers("/crudApi/institutions/*").permitAll()
                .antMatchers("/crudApi/gender/all").permitAll()
                .antMatchers("/crudApi/country/all").permitAll()
//                .antMatchers("/crudApi/fullUser").permitAll()
                .antMatchers("/allowed/**").permitAll()
                .antMatchers("/registration/**").permitAll()
                .antMatchers("/account").permitAll()

                .anyRequest().authenticated()
                .and().httpBasic().and().csrf().disable()

                // authentication (once during login)
                .addFilter(getJWTAuthenticationFilter())

                //  authorization (recover user from JWT on each request)
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), userRepository))

                // never create a session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    /**
     * Creates an instance of our authentication filter, which uses our custom AuthenticationManager
     *
     * @return
     *
     * @throws Exception
     */
    protected JWTAuthenticationFilter getJWTAuthenticationFilter() throws Exception {
        JWTAuthenticationFilter authenticationFilter = new JWTAuthenticationFilter(new ObjectMapper(), userRepository);
        authenticationFilter.setAuthenticationManager(authenticationManager());
        return authenticationFilter;
    }

    /**
     * Create our own authentication manager, which has access into the database.
     *
     * @return
     */
    protected HMUAuthenticationManager getHMUAuthenticationManager() {
        return new HMUAuthenticationManager(userRepository, this.passwordEncoder());
    }

    /**
     * This method is overridden to activate the usage of our own specific implementation.
     *
     * @return
     *
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * This method is overriden to return our own specific implementation.
     *
     * @return
     *
     * @throws Exception
     */
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return getHMUAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.addAllowedMethod(HttpMethod.GET);
        corsConfig.addAllowedMethod(HttpMethod.POST);
        corsConfig.addAllowedMethod(HttpMethod.DELETE);
        corsConfig.addAllowedMethod(HttpMethod.PUT);
        corsConfig.addExposedHeader(SecurityConstants.HEADER_STRING);

        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

}
