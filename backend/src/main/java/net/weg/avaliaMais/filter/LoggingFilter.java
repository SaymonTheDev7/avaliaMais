package net.weg.avaliaMais.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.service.LogService;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class LoggingFilter implements Filter {

    private final LogService logService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        LocalDateTime startTime = LocalDateTime.now();
        String actionType = req.getMethod();
        String requestURI = req.getRequestURI();
        String clientIP = req.getRemoteAddr();

        chain.doFilter(request, response);

        LocalDateTime endTime = LocalDateTime.now();
        int status = res.getStatus();

        String logMessage = "Ação: " + actionType +
                " | Endpoint: " + requestURI +
                " | Status: " + status +
                " | IP: " + clientIP +
                " | Início: " + startTime +
                " | Fim: " + endTime;

        logService.saveLog(actionType, logMessage);
    }
}
