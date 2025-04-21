package net.weg.avaliaMais.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Classe de configuração para CORS (Cross-Origin Resource Sharing).
 *
 * Permite que o front-end em http://localhost:3000 acesse os recursos da API do back-end.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*", "Cookie", "Origin", "X-Requested-With", "Content-Type", "Accept")
                .allowCredentials(true);
    }
}
