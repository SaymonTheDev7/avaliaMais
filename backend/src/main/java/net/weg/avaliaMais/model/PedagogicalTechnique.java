package net.weg.avaliaMais.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;

import java.util.UUID;

/**
 * Entidade que representa uma técnica pedagógica no sistema.
 * Estende a classe {@link User} e contém informações relacionadas à técnica pedagógica,
 * como turno de trabalho e carga horária semanal.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalTechnique extends User {

    /**
     * Converte a instância atual de {@link PedagogicalTechnique} para um objeto do tipo {@link PedagogicalTechniqueResponseDTO}.
     * Este método é utilizado para retornar os dados da técnica pedagógica em um formato adequado para resposta de API.
     *
     * @return um {@link PedagogicalTechniqueResponseDTO} contendo os dados da técnica pedagógica.
     */
    public PedagogicalTechniqueResponseDTO toDto() {
        return new PedagogicalTechniqueResponseDTO(
                this.getUuid(),
                this.getUsername(),
                this.getPassword(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek()
        );
    }
}
