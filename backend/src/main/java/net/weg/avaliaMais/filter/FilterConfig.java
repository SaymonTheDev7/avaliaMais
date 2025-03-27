package net.weg.avaliaMais.filter;

import net.weg.avaliaMais.service.LogService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<LoggingFilter> loggingFilter(LogService logService) {
        FilterRegistrationBean<LoggingFilter> registrationBean = new FilterRegistrationBean<>();
        LoggingFilter loggingFilter = new LoggingFilter(logService);
        registrationBean.setFilter(loggingFilter);
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}
