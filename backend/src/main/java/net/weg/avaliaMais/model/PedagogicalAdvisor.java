package net.weg.avaliaMais.model;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalAdvisor extends User {

    public PedagogicalAdvisorResponseDTO toDto() {
        return new PedagogicalAdvisorResponseDTO(this.getUuid(), this.getUsername(), this.getPassword(), this.getEmail(), this.getWorkShift(), this.getWorkloadWeek());
    }
}
