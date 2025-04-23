package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.AdminResponseDTO;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Admin extends User {
    public AdminResponseDTO toDto() {
        return new AdminResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getAuthUser().getPassword(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getAuthUser().getUuid()
        );
    }
}
