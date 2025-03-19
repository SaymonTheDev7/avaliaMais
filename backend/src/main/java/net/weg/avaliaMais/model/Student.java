package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Student extends User {

    @ManyToMany(mappedBy = "students")
    private List<ClassSchool> classIds;

    @ManyToOne
    @JoinColumn(name = "current_course_id")
    private Course currentCourse;  // Novo atributo para o curso atual do aluno

    public StudentResponseDTO toDto() {
        return new StudentResponseDTO(
                this.getUuid(),
                this.getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getClassIds(),
                this.currentCourse != null ? this.currentCourse.getUuid() : null  // Adicionando o ID do curso atual no DTO
        );
    }

    public List<ClassSchool> getClassesIds() {
        return classIds;
    }
}
