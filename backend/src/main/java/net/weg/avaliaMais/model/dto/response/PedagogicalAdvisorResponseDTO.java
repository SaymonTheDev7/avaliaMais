package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.PedagogicalAdvisor;

import java.util.UUID;

/**
 * DTO de resposta para o assessor pedagógico.
 * Contém as informações necessárias para representar um assessor pedagógico em uma resposta.
 */
public record PedagogicalAdvisorResponseDTO(

        /**
         * UUID do assessor pedagógico.
         * Identificador único do assessor pedagógico.
         */
        UUID uuid,

        /**
         * Nome de usuário do assessor pedagógico.
         * Nome utilizado para login ou identificação do assessor.
         */
        String username,

        /**
         * Senha do assessor pedagógico.
         * A senha associada ao nome de usuário.
         */
        String password,

        /**
         * Endereço de e-mail do assessor pedagógico.
         * O e-mail associado ao assessor.
         */
        String email,

        /**
         * Turno de trabalho do assessor pedagógico.
         * Indica o período em que o assessor trabalha (ex: manhã, tarde, noite).
         */
        String workShift,

        /**
         * Carga horária semanal do assessor pedagógico.
         * O total de horas trabalhadas pelo assessor por semana.
         */
        Double workloadWeek

) {

    /**
     * Construtor que converte um objeto {@link PedagogicalAdvisor} para um DTO {@link PedagogicalAdvisorResponseDTO}.
     *
     * @param ActualPedagogicalAdvisor O assessor pedagógico a ser convertido.
     */
    public PedagogicalAdvisorResponseDTO (PedagogicalAdvisor ActualPedagogicalAdvisor) {
        this(
                ActualPedagogicalAdvisor.getUuid(),
                ActualPedagogicalAdvisor.getUsername(),
                ActualPedagogicalAdvisor.getPassword(),
                ActualPedagogicalAdvisor.getEmail(),
                ActualPedagogicalAdvisor.getWorkShift(),
                ActualPedagogicalAdvisor.getWorkloadWeek()
        );
    }
}
