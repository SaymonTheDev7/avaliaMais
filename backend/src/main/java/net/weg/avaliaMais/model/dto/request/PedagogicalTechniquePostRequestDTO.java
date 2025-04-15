package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;

import java.util.UUID;

/**
 * DTO para representar os dados necessários para a criação de uma técnica pedagógica.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link PedagogicalTechnique}.
 */
public record PedagogicalTechniquePostRequestDTO(

        /**
         * Email do técnico pedagógico.
         * <p>
         * Este campo representa o email do técnico pedagógico, que deve ser válido.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do técnico pedagógico.
         * <p>
         * Este campo representa o turno de trabalho do técnico pedagógico, como "matutino", "vespertino", etc.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do técnico pedagógico.
         * <p>
         * Este campo representa a carga horária semanal do técnico pedagógico em horas, e deve ser um valor positivo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        /**
         * UUID do usuário autenticado associado ao técnico pedagógico.
         * <p>
         * Este campo representa o UUID do usuário autenticado, que será usado para associar a técnica pedagógica a um usuário existente.
         */
        UUID authUserUuid
) {

    /**
     * Converte o DTO para uma entidade {@link PedagogicalTechnique}.
     * <p>
     * A conversão envolve buscar o usuário autenticado correspondente ao UUID fornecido e associá-lo à técnica pedagógica.
     *
     * @param authUserRepository O repositório usado para buscar o usuário autenticado.
     * @return Uma instância de {@link PedagogicalTechnique} com os dados fornecidos e o usuário associado.
     * @throws RuntimeException Se o usuário autenticado com o UUID fornecido não for encontrado.
     */
    public PedagogicalTechnique converter(AuthUserRepository authUserRepository) {

        AuthUser authUser = authUserRepository.findById(authUserUuid)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return PedagogicalTechnique.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .authUser(authUser)
                .build();
    }
}
