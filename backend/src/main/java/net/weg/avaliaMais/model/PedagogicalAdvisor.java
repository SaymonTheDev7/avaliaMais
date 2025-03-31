package net.weg.avaliaMais.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;

/**
 * Entidade que representa um assessor pedagógico no sistema.
 * Estende a classe {@link User} e contém informações relacionadas ao assessor pedagógico,
 * como turno de trabalho e carga horária semanal.
 */
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PedagogicalAdvisor extends User {

<<<<<<< HEAD
    /**
     * Converte a instância atual de {@link PedagogicalAdvisor} para um objeto do tipo {@link PedagogicalAdvisorResponseDTO}.
     * Este método é utilizado para retornar os dados do assessor pedagógico em um formato adequado para resposta de API.
     *
     * @return um {@link PedagogicalAdvisorResponseDTO} contendo os dados do assessor pedagógico.
     */
=======



>>>>>>> 621fc38809b22b7904290100618ec88d5a60329c
    public PedagogicalAdvisorResponseDTO toDto() {
        return new PedagogicalAdvisorResponseDTO(
                this.getUuid(),
                this.getUsername(),
                this.getPassword(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek()
        );
    }
}
