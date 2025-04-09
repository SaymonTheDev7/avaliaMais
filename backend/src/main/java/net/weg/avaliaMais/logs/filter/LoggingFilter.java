package net.weg.avaliaMais.logs.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.logs.service.LogService;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

/**
 * Filtro responsável por registrar logs de todas as requisições HTTP recebidas pelo sistema.
 * <p>
 * Este filtro captura informações como o tipo de ação (método HTTP), endpoint acessado,
 * endereço IP do cliente, horário de início e fim da requisição, além do status da resposta.
 * Os dados registrados são enviados ao {@link LogService}.
 */
@Component
@RequiredArgsConstructor
public class LoggingFilter implements Filter {

    private final LogService logService;

    /**
     * Intercepta todas as requisições HTTP e registra logs detalhados.
     *
     * @param request  Objeto {@link ServletRequest} que representa a requisição HTTP.
     * @param response Objeto {@link ServletResponse} que representa a resposta HTTP.
     * @param chain    Encadeamento de filtros para continuar o processamento da requisição.
     * @throws IOException              Caso ocorra um erro de entrada/saída durante o processamento.
     * @throws jakarta.servlet.ServletException Caso ocorra um erro no processamento do servlet.
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // Captura os dados da requisição
        LocalDateTime startTime = LocalDateTime.now();
        String actionType = req.getMethod();
        String requestURI = req.getRequestURI();
        String clientIP = req.getRemoteAddr();

        // Executa a requisição normalmente
        chain.doFilter(request, response);

        // Captura os dados da resposta
        LocalDateTime endTime = LocalDateTime.now();
        int status = res.getStatus();

        // Formata a mensagem de log
        String logMessage = "Ação: " + actionType +
                " | Endpoint: " + requestURI +
                " | Status: " + status +
                " | IP: " + clientIP +
                " | Início: " + startTime +
                " | Fim: " + endTime;

        // Salva o log utilizando o serviço de logs
        logService.saveLog(actionType, logMessage);
    }
}
