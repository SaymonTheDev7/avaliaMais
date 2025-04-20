package net.weg.avaliaMais.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Classe de configuração para CORS (Cross-Origin Resource Sharing).
 *
 * Esta classe configura o comportamento CORS para permitir o compartilhamento de recursos entre o front-end e o back-end.
 * Especificamente, ela permite que o front-end no endereço "http://localhost:3000" acesse os recursos da API do back-end.
 *
 * <p>O método {@link #addCorsMappings(CorsRegistry)} configura os caminhos que o CORS afetará, as origens permitidas,
 * os métodos HTTP permitidos e os cabeçalhos aceitos.</p>
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configura as regras de CORS para o aplicativo.
     *
     * @param registry a instância do {@link CorsRegistry} usada para configurar as permissões CORS.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
<<<<<<< Updated upstream
        registry.addMapping("/**")  // Aplica as configurações de CORS para todos os caminhos da API.
                .allowedOrigins("http://localhost:3000") // URL permitida para fazer requisições (geralmente, o front-end).
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Métodos HTTP permitidos.
                .allowedHeaders("*, \"Cookie\"", "Origin", "X-Requested-With", "Content-Type", "Accept") // Cabeçalhos permitidos.
                .allowCredentials(true); // Permite o envio de credenciais como cookies e cabeçalhos de autorização.
=======
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*, \"Cookie\"", "Origin", "X-Requested-With", "Content-Type", "Accept")
                .allowCredentials(true);
>>>>>>> Stashed changes
    }
}
