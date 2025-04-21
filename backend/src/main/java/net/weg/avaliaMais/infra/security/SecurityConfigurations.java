package net.weg.avaliaMais.infra.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Classe de configuração de segurança da aplicação.
 * Define as regras de autenticação, autorização, CORS e gerenciamento de sessões.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigurations {

    /**
     * Filtro de segurança personalizado responsável por interceptar e validar requisições.
     */
    private final SecurityFilter securityFilter;

    /**
     * Configura a cadeia de filtros de segurança da aplicação.
     *
     * @param httpSecurity objeto para configuração da segurança HTTP.
     * @return uma instância de {@link SecurityFilterChain} com as configurações definidas.
     * @throws Exception caso ocorra algum erro ao construir a configuração.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                    corsConfiguration.addAllowedOrigin("http://localhost:3000");
                    corsConfiguration.addAllowedMethod("GET");
                    corsConfiguration.addAllowedMethod("POST");
                    corsConfiguration.addAllowedMethod("PUT");
                    corsConfiguration.addAllowedMethod("DELETE");
                    corsConfiguration.addAllowedMethod("CATCH");
                    corsConfiguration.addAllowedHeader("*");
                    corsConfiguration.setAllowCredentials(true);
                    return corsConfiguration;
                }))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/auth/getAll").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/auth/delete/{username}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/pedagogical-techniques/add").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * Fornece o {@link AuthenticationManager} usado pelo Spring Security para autenticação.
     *
     * @param authenticationConfiguration configuração de autenticação do Spring.
     * @return instância do gerenciador de autenticação.
     * @throws Exception caso ocorra erro ao obter o gerenciador.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Cria e fornece um {@link PasswordEncoder} para criptografar senhas.
     * Utiliza o algoritmo BCrypt.
     *
     * @return instância de {@link BCryptPasswordEncoder}.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
