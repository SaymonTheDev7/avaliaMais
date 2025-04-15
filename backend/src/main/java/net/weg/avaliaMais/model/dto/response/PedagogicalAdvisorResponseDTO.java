package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.PedagogicalAdvisor;

import java.util.UUID;

/**
 * DTO de resposta para um orientador pedagógico.
 * <p>
 * Contém os dados de um orientador pedagógico a serem retornados para o cliente.
 *
 * @param uuid          UUID do orientador pedagógico. Identificador único.
 * @param username      Nome de usuário vinculado ao orientador.
 * @param password      Senha associada ao usuário (normalmente não retornada em APIs por questões de segurança).
 * @param email         Email do orientador pedagógico.
 * @param workShift     Turno de trabalho do orientador (ex: manhã, tarde, noite).
 * @param workloadWeek  Carga horária semanal do orientador pedagógico.
 */
public record PedagogicalAdvisorResponseDTO(
        UUID uuid,
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek
) {

    /**
     * Construtor que converte uma entidade {@link PedagogicalAdvisor} em um DTO de resposta {@link PedagogicalAdvisorResponseDTO}.
     *
     * @param advisor A entidade {@link PedagogicalAdvisor} que será convertida.
     */
    public PedagogicalAdvisorResponseDTO(PedagogicalAdvisor advisor) {
        this(
                advisor.getUuid(),
                advisor.getAuthUser().getUsername(),
                advisor.getAuthUser().getPassword(),
                advisor.getEmail(),
                advisor.getWorkShift(),
                advisor.getWorkloadWeek()
        );
    }
}
