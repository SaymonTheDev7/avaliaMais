package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;

import java.util.List;
import java.util.UUID;

public record StudentResponseDTO(
        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek,
        List<ClassSchool> classIds
) {

    public StudentResponseDTO(Student actualStudent) {
        this(actualStudent.getUuid(), actualStudent.getUsername(), actualStudent.getEmail(), actualStudent.getWorkShift(), actualStudent.getWorkloadWeek(), actualStudent.getClassIds());
    }
}
