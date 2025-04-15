package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;

import java.util.List;
import java.util.UUID;

/**
 * DTO para representar os dados necessários para a criação de um aluno.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link Student}.
 */
public record StudentPostRequestDTO(

        /**
         * Nome de usuário do aluno.
         * <p>
         * Este campo representa o nome de usuário do aluno, que não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do aluno.
         * <p>
         * Este campo representa a senha do aluno, que não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Email do aluno.
         * <p>
         * Este campo representa o email do aluno, que deve ser válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do aluno.
         * <p>
         * Este campo representa o turno de trabalho do aluno, como "matutino", "vespertino", etc.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do aluno.
         * <p>
         * Este campo representa a carga horária semanal do aluno em horas, e deve ser um valor positivo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        /**
         * Lista de IDs das turmas às quais o aluno pertence.
         * <p>
         * Este campo representa a lista de UUIDs das turmas do aluno, e não pode ser nulo.
         */
        @NotNull(message = "A lista de turmas não pode ser nula")
        List<UUID> classIds,

        /**
         * ID do curso atual do aluno.
         * <p>
         * Este campo representa o UUID do curso atual do aluno, e não pode ser nulo.
         */
        @NotNull(message = "O ID do curso atual não pode ser nulo")
        UUID currentCourseId
) {

    /**
     * Converte o DTO para uma entidade {@link Student}.
     * <p>
     * A conversão envolve buscar as turmas e o curso atual com base nos IDs fornecidos e associá-los à instância de {@link Student}.
     *
     * @param allClasses A lista de todas as turmas disponíveis para filtrar as turmas relacionadas ao aluno.
     * @param allCourses A lista de todos os cursos disponíveis para buscar o curso atual do aluno.
     * @return Uma instância de {@link Student} com os dados fornecidos e as entidades associadas.
     * @throws IllegalArgumentException Se o curso não for encontrado para o ID fornecido.
     */
    public Student converter(List<ClassSchool> allClasses, List<Course> allCourses) {

        List<ClassSchool> classList = allClasses.stream()
                .filter(classSchool -> classIds.contains(classSchool.getUuid()))
                .toList();

        Course currentCourse = allCourses.stream()
                .filter(course -> course.getUuid().equals(currentCourseId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado para o ID fornecido"));

        return Student.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .classIds(classList)
                .currentCourse(currentCourse)
                .build();
    }
}
