package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;

import java.util.List;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Teacher extends User {

    @ManyToMany(mappedBy = "teachers")
    private List<ClassSchool> classIds;

    private String professionalArea;

    public TeacherResponseDTO toDto() {
        return new TeacherResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.classIds.stream().map(ClassSchool::getUuid).toList(),
                this.professionalArea
        );
    }
}
