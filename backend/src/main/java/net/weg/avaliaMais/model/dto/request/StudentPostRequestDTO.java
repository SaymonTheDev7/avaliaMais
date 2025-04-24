package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;

import java.util.UUID;

/**
 * DTO para representar os dados necessários para a criação de um aluno.
 */
public record StudentPostRequestDTO(

        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        @NotNull(message = "O ID do curso atual não pode ser nulo")
        UUID currentCourseId,

        @NotNull(message = "O ID do usuário autenticado não pode ser nulo")
        UUID authUserUuid

) {

    /**
     * Converte o DTO para uma entidade {@link Student}, a partir das entidades já recuperadas no service.
     *
     * @param currentCourse Curso atual do aluno.
     * @param authUser      Usuário autenticado associado ao aluno.
     * @return Entidade {@link Student} preenchida.
     */
    public Student toEntity(Course currentCourse, AuthUser authUser) {
        return Student.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .currentCourse(currentCourse)
                .authUser(authUser)
                .build();
    }
}
