package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;

/**
 * Representa um Técnico Pedagógico no sistema.
 * Esta classe herda de {@link User} e contém informações específicas sobre o técnico pedagógico,
 * como o turno de trabalho, a carga horária semanal e o vínculo com o usuário autenticado.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalTechnique extends User {

    /**
     * Converte a entidade de Técnico Pedagógico para um DTO de resposta.
     * O DTO contém informações sobre o técnico pedagógico, como o UUID, nome de usuário, senha, e-mail,
     * turno de trabalho, carga horária semanal e o UUID do usuário autenticado.
     *
     * @return Um {@link PedagogicalTechniqueResponseDTO} contendo as informações detalhadas do técnico pedagógico.
     */
    public PedagogicalTechniqueResponseDTO toDto() {
        return new PedagogicalTechniqueResponseDTO(
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
