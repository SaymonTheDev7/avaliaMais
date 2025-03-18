package net.weg.avaliaMais.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
public class PedagogicalAdvisor extends User {

    public PedagogicalAdvisorResponseDTO toDto() {
        return new PedagogicalAdvisorResponseDTO(this.getUuid(), this.getUsername(), this.getPassword(), this.getEmail(), this.getWorkShift(), this.getWorkloadWeek());
    }
}
