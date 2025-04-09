package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Supervisor extends User {

    public SupervisorResponseDTO toDto() {
        return new SupervisorResponseDTO(this);
    }
}
