package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.user.Supervisor;
import net.weg.avaliaMais.model.role.UserRole;

public record SupervisorPostRequestDTO(

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
        Double workloadWeek,

        @NotNull
        UserRole role
) {

    public Supervisor converter() {
        return Supervisor.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .build();
    }
}
