package net.weg.avaliaMais.model;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;

import java.util.UUID;
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalTechnique extends User {

    public PedagogicalTechniqueResponseDTO toDto() {
        return new PedagogicalTechniqueResponseDTO(this.getUuid(), this.getUsername(), this.getPassword(), this.getEmail(), this.getWorkShift(), this.getWorkloadWeek());
    }
}
