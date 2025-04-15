package net.weg.avaliaMais.infra.model.dto.response;

import net.weg.avaliaMais.model.role.UserRole;

/**
 * DTO (Data Transfer Object) utilizado para registrar um novo usuário no sistema.
 *
 * @param username Nome de usuário escolhido para o cadastro.
 * @param password Senha definida pelo usuário.
 * @param role Papel (role) que o usuário terá no sistema.
 */
public record RegisterResponseDTO(String username, String password, UserRole role) {
}
