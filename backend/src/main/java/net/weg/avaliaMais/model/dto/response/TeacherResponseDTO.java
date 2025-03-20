package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

public record TeacherResponseDTO(
        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek,
        List<UUID> classIds,
        String professionalArea
) {

    public TeacherResponseDTO(Teacher actualTeacher) {
        this(
                actualTeacher.getUuid(),
                actualTeacher.getUsername(),
                actualTeacher.getEmail(),
                actualTeacher.getWorkShift(),
                actualTeacher.getWorkloadWeek(),
                actualTeacher.getClassIds().stream().map(ClassSchool::getUuid).toList(),
                actualTeacher.getProfessionalArea()
        );
    }
}
