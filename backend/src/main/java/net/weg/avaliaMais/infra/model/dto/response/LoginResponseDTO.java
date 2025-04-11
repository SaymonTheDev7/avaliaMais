package net.weg.avaliaMais.infra.model.dto.response;

import net.weg.avaliaMais.model.role.UserRole;

public record LoginResponseDTO(String token, UserRole role) {
}
