package net.weg.avaliaMais.infra.dto.request;

import net.weg.avaliaMais.model.role.UserRole;

public record RegisterResponseDTO(String username, String password, UserRole role) {
}
