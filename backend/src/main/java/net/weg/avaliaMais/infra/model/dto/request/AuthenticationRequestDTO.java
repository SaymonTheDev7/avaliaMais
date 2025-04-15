package net.weg.avaliaMais.infra.model.dto.request;

/**
 * DTO (Data Transfer Object) utilizado para receber os dados de autenticação do usuário.
 *
 * @param username Nome de usuário utilizado para login.
 * @param password Senha correspondente ao nome de usuário.
 */
public record AuthenticationRequestDTO(String username, String password) {
}
