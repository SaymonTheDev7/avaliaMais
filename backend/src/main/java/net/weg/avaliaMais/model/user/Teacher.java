package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Teacher extends User {

    private String professionalArea;

    public TeacherResponseDTO toDto() {
        return new TeacherResponseDTO(
                this.getUuid(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getAuthUser().getUuid(),
                this.professionalArea
        );
    }
}
