package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.UUID;

/**
 * DTO para atualização de um professor.
 */
public record TeacherUpdateRequestDTO(

        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        UUID authUserUuid,

        @NotBlank(message = "A área profissional não pode estar em branco")
        String professionalArea

) {}
