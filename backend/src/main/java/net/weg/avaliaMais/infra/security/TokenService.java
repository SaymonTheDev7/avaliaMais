package net.weg.avaliaMais.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import net.weg.avaliaMais.infra.model.AuthUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Serviço responsável pela geração e validação de tokens JWT (JSON Web Token).
 */
@Service
public class TokenService {

    /**
     * Chave secreta utilizada para assinar e verificar os tokens.
     * O valor é configurado no arquivo de propriedades (application.properties ou application.yml).
     */
    @Value("${api.security.token.secret}")
    private String secret;

    /**
     * Gera um token JWT para o usuário autenticado.
     *
     * @param authUser objeto {@link AuthUser} que representa o usuário autenticado.
     * @return uma string contendo o token JWT gerado.
     * @throws RuntimeException caso ocorra algum erro durante a criação do token.
     */
    public String generateToken(AuthUser authUser) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("SENAI/WEG")
                    .withSubject(authUser.getUsername())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException jwtCreationException) {
            throw new RuntimeException("Error while generating token", jwtCreationException);
        }
    }

    /**
     * Valida um token JWT e retorna o nome de usuário (subject) se o token for válido.
     *
     * @param token o token JWT a ser validado.
     * @return o subject (usuário) contido no token, ou uma string vazia se o token for inválido.
     */
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("SENAI/WEG")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException jwtVerificationException) {
            return "";
        }
    }

    /**
     * Gera a data de expiração do token, definida como 2 horas a partir do momento atual.
     *
     * @return um {@link Instant} representando a data de expiração do token.
     */
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
