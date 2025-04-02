package net.weg.avaliaMais.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;

/**
 * Entidade que representa um supervisor no sistema.
 * Estende a classe {@link User} e herda os atributos e comportamentos de um usuário.
 *
 * A classe {@link Supervisor} não possui atributos adicionais além dos herdados de {@link User}.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Supervisor extends User {
    public SupervisorResponseDTO toDto() {
        return new SupervisorResponseDTO(this);
    }


}
