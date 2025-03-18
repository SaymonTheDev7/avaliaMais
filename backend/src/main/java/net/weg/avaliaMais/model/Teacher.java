package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;

import java.util.List;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Teacher extends User {

    @ManyToMany(mappedBy = "teachers")
    private List<ClassSchool> classIds;

    public TeacherResponseDTO toDto() {
        return new TeacherResponseDTO(this.getUuid(), this.getUsername(), this.getEmail(), this.getWorkShift(), this.getWorkloadWeek(), this.classIds.stream().map(ClassSchool::getUuid).toList()
        );
    }
}
