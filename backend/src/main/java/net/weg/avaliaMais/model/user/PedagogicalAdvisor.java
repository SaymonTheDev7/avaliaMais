package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalAdvisor extends User {

    public PedagogicalAdvisorResponseDTO toDto() {
        return new PedagogicalAdvisorResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getAuthUser().getPassword(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek()
        );
    }
}
