package net.weg.avaliaMais.model.dto.response;

import java.time.Instant;

public record ErrorResponseDTO(String mensagem, Class aClass, Instant instant) {
}
