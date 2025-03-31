package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.PedagogicalAdvisor;

/**
 * DTO para representar os dados necessários para a criação de um Assessor Pedagógico.
 * <p>
 * Esta classe é usada para receber e validar as informações antes de persistir um novo assessor pedagógico no sistema.
 */
public record PedagogicalAdvisorPostRequestDTO(

        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

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
                .username(username)
                .password(password)
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .build();
    }
}
