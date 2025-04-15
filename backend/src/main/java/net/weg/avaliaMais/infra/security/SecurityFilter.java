package net.weg.avaliaMais.infra.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro de segurança responsável por interceptar as requisições HTTP
 * e realizar a autenticação do usuário com base no token JWT fornecido.
 */
@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    /** Serviço responsável por validar e extrair informações do token JWT. */
    private final TokenService tokenService;

    /** Repositório para acesso aos dados dos usuários autenticáveis. */
    private final AuthUserRepository authUserRepository;

    /**
     * Método principal do filtro que é executado uma vez por requisição.
     * Verifica a presença de um token JWT no cabeçalho ou nos cookies,
     * valida o token e autentica o usuário, inserindo-o no contexto de segurança.
     *
     * @param request      objeto {@link HttpServletRequest} contendo os dados da requisição.
     * @param response     objeto {@link HttpServletResponse} contendo os dados da resposta.
     * @param filterChain  cadeia de filtros a ser continuada após o processamento.
     * @throws ServletException em caso de erro relacionado ao servlet.
     * @throws IOException       em caso de erro de I/O.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var login = tokenService.validateToken(token);
            UserDetails userDetails = authUserRepository.findByUsername(login);
            var authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Recupera o token de autenticação da requisição.
     * O token pode estar presente no cabeçalho "Authorization" ou em um cookie chamado "token".
     *
     * @param request objeto {@link HttpServletRequest} contendo os dados da requisição.
     * @return o token JWT se encontrado; caso contrário, {@code null}.
     */
    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");
        }
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("token")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
