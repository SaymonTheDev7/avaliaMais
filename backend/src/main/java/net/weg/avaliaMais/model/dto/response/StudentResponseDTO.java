package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.List;
import java.util.UUID;

public record StudentResponseDTO(
        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek,
        List<ClassSchool> classIds,
        UUID currentCourseId
) {
    public StudentResponseDTO(Student actualStudent) {
        this(
                actualStudent.getUuid(),
                actualStudent.getAuthUser().getUsername(),
                actualStudent.getEmail(),
                actualStudent.getWorkShift(),
                actualStudent.getWorkloadWeek(),
                actualStudent.getClassIds(),
                actualStudent.getCurrentCourse() != null ? actualStudent.getCurrentCourse().getUuid() : null
        );
    }
}
