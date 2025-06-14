package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.UUID;

public record TeacherPostRequestDTO(

        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        @NotNull(message = "O ID do usuário autenticado não pode ser nulo")
        UUID authUserUuid,

        @NotBlank(message = "A área profissional não pode estar em branco")
        String professionalArea

) {
    public Teacher toEntity(AuthUser authUser) {
        return Teacher.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .authUser(authUser)
                .professionalArea(professionalArea)
                .build();
    }
}
