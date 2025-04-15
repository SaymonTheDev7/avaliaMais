package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.Supervisor;

import java.util.UUID;

/**
 * DTO de resposta para um supervisor.
 * <p>
 * Contém os dados básicos de um supervisor a serem retornados para o cliente.
 *
 * @param uuid  UUID do supervisor. Identificador único.
 * @param name  Nome de usuário do supervisor (proveniente do AuthUser).
 * @param email Email institucional ou de contato do supervisor.
 */
public record SupervisorResponseDTO(
        UUID uuid,
        String name,
        String email
) {

    /**
     * Construtor que converte uma entidade {@link Supervisor} em um DTO de resposta {@link SupervisorResponseDTO}.
     *
     * @param actualSupervisor A entidade {@link Supervisor} que será convertida para o DTO.
     */
    public SupervisorResponseDTO(Supervisor actualSupervisor) {
        this(
                actualSupervisor.getUuid(),
                actualSupervisor.getAuthUser().getUsername(),
                actualSupervisor.getEmail()
        );
    }
}
