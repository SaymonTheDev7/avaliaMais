package net.weg.avaliaMais.model.dto.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.user.Supervisor;
import net.weg.avaliaMais.model.role.UserRole;

/**
 * DTO para representar os dados necessários para a criação de um supervisor.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link Supervisor}.
 */
public record SupervisorPostRequestDTO(

        /**
         * Nome de usuário do supervisor.
         * <p>
         * Este campo representa o nome de usuário do supervisor, que não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do supervisor.
         * <p>
         * Este campo representa a senha do supervisor, que não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Email do supervisor.
         * <p>
         * Este campo representa o email do supervisor, que deve ser válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do supervisor.
         * <p>
         * Este campo representa o turno de trabalho do supervisor, como "matutino", "vespertino", etc.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do supervisor.
         * <p>
         * Este campo representa a carga horária semanal do supervisor em horas, e deve ser um valor positivo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        Double workloadWeek,

        /**
         * Função ou papel do supervisor no sistema.
         * <p>
         * Este campo representa o papel do supervisor no sistema, atribuindo um papel de usuário ao supervisor.
         */
        @NotNull(message = "O papel do supervisor não pode ser nulo")
        UserRole role
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
) {

    /**
     * Converte o DTO para uma entidade {@link Supervisor}.
     * <p>
     * A conversão envolve a criação de uma instância de {@link Supervisor} com os dados fornecidos.
     *
     * @return Uma instância de {@link Supervisor} com os dados fornecidos.
     */
    public Supervisor converter() {
        return Supervisor.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)// Atribuindo o papel do supervisor ao objeto Supervisor
                .build();
    }
}
