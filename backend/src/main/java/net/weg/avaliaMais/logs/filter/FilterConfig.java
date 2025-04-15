package net.weg.avaliaMais.logs.filter;

import net.weg.avaliaMais.logs.service.LogService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Classe de configuração responsável pelo registro de filtros no sistema.
 * Esta configuração adiciona um filtro de logging personalizado para capturar
 * e registrar informações sobre as requisições HTTP.
 */
@Configuration
public class FilterConfig {

    /**
     * Registra um filtro de logging personalizado na aplicação.
     * O filtro será responsável por interceptar todas as requisições HTTP, capturando informações
     * relevantes para posterior análise e registro.
     *
     * @param logService Serviço de log utilizado para registrar informações sobre as requisições.
     * @return Um {@link FilterRegistrationBean} contendo a configuração do filtro de logging.
     */
    @Bean(name = "customLoggingFilter")
    public FilterRegistrationBean<LoggingFilter> loggingFilter(LogService logService) {
        // Criação do objeto de filtro de logging
        FilterRegistrationBean<LoggingFilter> registrationBean = new FilterRegistrationBean<>();
        LoggingFilter loggingFilter = new LoggingFilter(logService);

        // Define o filtro de logging
        registrationBean.setFilter(loggingFilter);

        // Aplica o filtro a todas as requisições (URL padrão "/")
        registrationBean.addUrlPatterns("/*");

        // Retorna a configuração do filtro
        return registrationBean;
    }
}
