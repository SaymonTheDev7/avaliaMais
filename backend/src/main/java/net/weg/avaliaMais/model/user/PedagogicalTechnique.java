package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalTechnique extends User {

    public PedagogicalTechniqueResponseDTO toDto() {
        return new PedagogicalTechniqueResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getAuthUser().getPassword(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getAuthUser().getRole()
        );
    }
}
