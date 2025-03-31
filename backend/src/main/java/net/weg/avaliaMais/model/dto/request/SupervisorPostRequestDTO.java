package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.Supervisor;

/**
 * DTO para requisição de criação de um supervisor.
 * Contém os dados necessários para cadastrar um novo supervisor.
 */
public record SupervisorPostRequestDTO(

        /**
         * Nome de usuário do supervisor.
         * Não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do supervisor.
         * Não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Endereço de e-mail do supervisor.
         * Deve ser um e-mail válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do supervisor (ex: manhã, tarde, noite).
         * Não pode estar em branco.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do supervisor.
         * Deve ser um valor positivo e não pode ser nulo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek
) {

    /**
     * Converte o DTO em uma entidade {@link Supervisor}.
     *
     * @return Um objeto {@link Supervisor} preenchido com os dados fornecidos.
     */
    public Supervisor converter() {
        return Supervisor.builder()
                .username(username)
                .password(password)
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .build();
    }

}

