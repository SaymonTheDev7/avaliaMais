package net.weg.avaliaMais.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;

import java.util.List;
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Student extends User {

    @ManyToMany(mappedBy = "students")
    private List<ClassSchool> classIds;

    public StudentResponseDTO toDto() {
        return new StudentResponseDTO(
                this.getUuid(), this.getUsername(), this.getEmail(), this.getWorkShift(), this.getWorkloadWeek(), this.getClassIds());
    }

    public List<ClassSchool> getClassesIds() {
        return classIds;
    }
}
