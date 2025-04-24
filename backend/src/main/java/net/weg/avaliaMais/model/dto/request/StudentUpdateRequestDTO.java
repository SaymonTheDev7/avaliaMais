package net.weg.avaliaMais.model.dto.request;

import java.util.UUID;

/**
 * DTO para atualização parcial de um estudante.
 */
public record StudentUpdateRequestDTO(
        String email,
        String workShift,
        Double workloadWeek,
        UUID currentCourseId,
        UUID authUserUuid
) {}
