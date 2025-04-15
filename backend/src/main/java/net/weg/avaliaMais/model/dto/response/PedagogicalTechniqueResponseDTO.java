package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.PedagogicalTechnique;

import java.util.UUID;

/**
 * DTO de resposta para um técnico pedagógico.
 * <p>
 * Contém os dados de um técnico pedagógico a serem retornados para o cliente.
 *
 * @param uuid           UUID do técnico pedagógico. Identificador único.
 * @param username       Nome de usuário vinculado ao técnico.
 * @param password       Senha associada ao usuário (normalmente não retornada em APIs por questões de segurança).
 * @param email          Email do técnico pedagógico.
 * @param workShift      Turno de trabalho do técnico (ex: manhã, tarde, noite).
 * @param workloadWeek   Carga horária semanal do técnico pedagógico.
 * @param authUserUuid   UUID do usuário autenticado vinculado ao técnico.
 */
public record PedagogicalTechniqueResponseDTO(
        UUID uuid,
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek,
        UUID authUserUuid
) {

    /**
     * Construtor que converte uma entidade {@link PedagogicalTechnique} em um DTO de resposta {@link PedagogicalTechniqueResponseDTO}.
     *
     * @param actualTechnique A entidade {@link PedagogicalTechnique} que será convertida.
     */
    public PedagogicalTechniqueResponseDTO(PedagogicalTechnique actualTechnique) {
        this(
                actualTechnique.getUuid(),
                actualTechnique.getAuthUser().getUsername(),
                actualTechnique.getAuthUser().getPassword(),
                actualTechnique.getEmail(),
                actualTechnique.getWorkShift(),
                actualTechnique.getWorkloadWeek(),
                actualTechnique.getAuthUser().getUuid()
        );
    }
}
