package be.icc.epreuve.integree.config;

import be.icc.epreuve.integree.jwt.AuthEntryPointJwt;
import be.icc.epreuve.integree.jwt.AuthTokenFilter;
import be.icc.epreuve.integree.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;


import java.util.Arrays;


@Configuration

@EnableMethodSecurity

public class WebSecurityConfig {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }



  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
       
      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
   
      return authProvider;
  }
  

  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }



  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth ->
          auth.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                  .requestMatchers("/api/auth/forgot-Password").permitAll()
                  .requestMatchers("/api/auth/reset-password").permitAll()
                  .requestMatchers("/api/art-create)").permitAll()
                  .requestMatchers("/api/posts/**").permitAll()
                  .requestMatchers("/api/post/**").permitAll()
                  .requestMatchers("/api/stripe/**").permitAll()
                  .requestMatchers("/api/makeOffer").authenticated()
                  .requestMatchers("/api/admin/**").hasRole("ADMIN")
                  .requestMatchers("/api/user/**").hasRole("ADMIN")
                  .requestMatchers("/api/**").permitAll()
                  .anyRequest().authenticated()
        ).exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    http.authenticationProvider(authenticationProvider());

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }




}
