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
        List<ClassSchool> classIds,
        UUID currentCourseId  // Novo campo para o ID do curso atual
) {

    // Construtor que aceita todos os parâmetros
    public StudentResponseDTO(UUID uuid, String name, String email, String workShift, Double workloadWeek, List<ClassSchool> classIds, UUID currentCourseId) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.workShift = workShift;
        this.workloadWeek = workloadWeek;
        this.classIds = classIds;
        this.currentCourseId = currentCourseId;
    }

    // Construtor usando um objeto Student para inicializar os valores
    public StudentResponseDTO(Student actualStudent) {
        this(
                actualStudent.getUuid(),
                actualStudent.getUsername(),
                actualStudent.getEmail(),
                actualStudent.getWorkShift(),
                actualStudent.getWorkloadWeek(),
                actualStudent.getClassIds(),
                actualStudent.getCurrentCourse() != null ? actualStudent.getCurrentCourse().getUuid() : null  // Adicionando o ID do curso atual
        );
    }
}
