package net.weg.avaliaMais.infra.model.dto.response;

import net.weg.avaliaMais.model.role.UserRole;

/**
 * DTO (Data Transfer Object) utilizado como resposta ao login de um usuário.
 *
 * @param token Token JWT gerado para autenticação e autorização.
 * @param role Papel (role) do usuário autenticado no sistema.
 */
public record LoginResponseDTO(String token, UserRole role) {
}
