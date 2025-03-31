package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Supervisor;

import java.util.UUID;

/**
 * DTO de resposta para o supervisor.
 * Contém as informações necessárias para representar um supervisor em uma resposta.
 */
public record SupervisorResponseDTO(

        /**
         * UUID do supervisor.
         * Identificador único do supervisor.
         */
        UUID uuid,

        /**
         * Nome do supervisor.
         * Nome completo do supervisor.
         */
        String name,

        /**
         * Endereço de e-mail do supervisor.
         * O e-mail associado ao supervisor.
         */
        String email

) {

    /**
     * Construtor que converte um objeto {@link Supervisor} para um DTO {@link SupervisorResponseDTO}.
     *
     * @param actualSupervisor O objeto {@link Supervisor} a ser convertido.
     */
    public SupervisorResponseDTO(Supervisor actualSupervisor) {
        this(actualSupervisor.getUuid(),
                actualSupervisor.getUsername(),
                actualSupervisor.getEmail());
    }
}
