package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;

/**
 * Representa um Supervisor no sistema.
 * Esta classe herda de {@link User} e contém informações específicas sobre o supervisor.
 * O supervisor possui o método {@link #toDto()} para converter os dados da entidade em um DTO de resposta.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Supervisor extends User {

    /**
     * Converte a entidade Supervisor para um DTO de resposta.
     * O DTO contém informações sobre o supervisor, incluindo o UUID, nome de usuário, e-mail, etc.
     *
     * @return Um {@link SupervisorResponseDTO} contendo as informações detalhadas do supervisor.
     */
    public SupervisorResponseDTO toDto() {
        return new SupervisorResponseDTO(this);
    }
}
