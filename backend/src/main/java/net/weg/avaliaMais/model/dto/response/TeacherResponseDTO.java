package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.Teacher;

import java.util.UUID;

public record TeacherResponseDTO(
        UUID uuid,
        String email,
        String workShift,
        Double workloadWeek,
        UUID authUserUuid,
        String professionalArea
) {
    public TeacherResponseDTO(Teacher actualTeacher) {
        this(
                actualTeacher.getUuid(),
                actualTeacher.getEmail(),
                actualTeacher.getWorkShift(),
                actualTeacher.getWorkloadWeek(),
                actualTeacher.getAuthUser().getUuid(),
                actualTeacher.getProfessionalArea()
        );
    }
}
