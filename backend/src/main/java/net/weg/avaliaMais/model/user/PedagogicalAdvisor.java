package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;

/**
 * Representa um Conselheiro Pedagógico no sistema.
 * Esta classe herda de {@link User} e contém informações específicas sobre o conselheiro pedagógico,
 * como o turno de trabalho e a carga horária semanal.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class PedagogicalAdvisor extends User {

    /**
     * Converte a entidade de Conselheiro Pedagógico para um DTO de resposta.
     * O DTO contém informações sobre o conselheiro pedagógico, como o UUID, nome de usuário, senha, e-mail,
     * turno de trabalho e carga horária semanal.
     *
     * @return Um {@link PedagogicalAdvisorResponseDTO} contendo as informações detalhadas do conselheiro pedagógico.
     */
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
