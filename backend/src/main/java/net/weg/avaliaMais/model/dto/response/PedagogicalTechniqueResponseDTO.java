package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.PedagogicalTechnique;

import java.util.UUID;

/**
 * DTO de resposta para a técnica pedagógica.
 * Contém as informações necessárias para representar uma técnica pedagógica em uma resposta.
 */
public record PedagogicalTechniqueResponseDTO(

        /**
         * UUID da técnica pedagógica.
         * Identificador único da técnica pedagógica.
         */
        UUID uuid,

        /**
         * Nome de usuário da técnica pedagógica.
         * Nome utilizado para login ou identificação da técnica pedagógica.
         */
        String username,

        /**
         * Senha da técnica pedagógica.
         * A senha associada ao nome de usuário.
         */
        String password,

        /**
         * Endereço de e-mail da técnica pedagógica.
         * O e-mail associado à técnica pedagógica.
         */
        String email,

        /**
         * Turno de trabalho da técnica pedagógica.
         * Indica o período em que a técnica pedagógica trabalha (ex: manhã, tarde, noite).
         */
        String workShift,

        /**
         * Carga horária semanal da técnica pedagógica.
         * O total de horas trabalhadas pela técnica pedagógica por semana.
         */
        Double workloadWeek

) {

    /**
     * Construtor que converte um objeto {@link PedagogicalTechnique} para um DTO {@link PedagogicalTechniqueResponseDTO}.
     *
     * @param ActualPedagogicalTechnique A técnica pedagógica a ser convertida.
     */
    public PedagogicalTechniqueResponseDTO(PedagogicalTechnique ActualPedagogicalTechnique) {
        this(
                ActualPedagogicalTechnique.getUuid(),
                ActualPedagogicalTechnique.getUsername(),
                ActualPedagogicalTechnique.getPassword(),
                ActualPedagogicalTechnique.getEmail(),
                ActualPedagogicalTechnique.getWorkShift(),
                ActualPedagogicalTechnique.getWorkloadWeek()
        );
    }
}
