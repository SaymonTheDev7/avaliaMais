package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.user.PedagogicalAdvisor;

/**
 * DTO para representar os dados necessários para a criação de um novo orientador pedagógico.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link PedagogicalAdvisor}.
 */
public record PedagogicalAdvisorPostRequestDTO(

        /**
         * Nome de usuário do orientador pedagógico.
         * <p>
         * Este campo representa o nome de usuário do orientador pedagógico que será utilizado para login.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do orientador pedagógico.
         * <p>
         * Este campo representa a senha associada ao nome de usuário do orientador pedagógico.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Email do orientador pedagógico.
         * <p>
         * Este campo representa o email do orientador pedagógico, que deve ser válido.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do orientador pedagógico.
         * <p>
         * Este campo representa o turno de trabalho do orientador pedagógico, como "matutino", "vespertino", etc.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do orientador pedagógico.
         * <p>
         * Este campo representa a carga horária semanal do orientador pedagógico em horas, e deve ser um valor positivo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek
) {

    /**
     * Converte o DTO para uma entidade {@link PedagogicalAdvisor}.
     *
     * @return Um objeto {@link PedagogicalAdvisor} baseado nos dados fornecidos.
     */
    public PedagogicalAdvisor converter() {
        return PedagogicalAdvisor.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .build();
    }
}
