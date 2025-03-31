package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;

import java.util.List;
import java.util.UUID;

/**
 * DTO para requisição de criação de um estudante.
 * Contém os dados necessários para cadastrar um novo estudante.
 */
public record StudentPostRequestDTO(

        /**
         * Nome de usuário do estudante.
         * Não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do estudante.
         * Não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Endereço de e-mail do estudante.
         * Deve ser um e-mail válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do estudante (ex: manhã, tarde, noite).
         * Não pode estar em branco.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do estudante.
         * Deve ser um valor positivo e não pode ser nulo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        /**
         * Lista de IDs das turmas associadas ao estudante.
         * Não pode ser nula.
         */
        @NotNull(message = "A lista de turmas não pode ser nula")
        List<UUID> classIds,

        /**
         * ID do curso atual do estudante.
         * Não pode ser nulo.
         */
        @NotNull(message = "O ID do curso atual não pode ser nulo")
        UUID currentCourseId

) {

    /**
     * Converte o DTO em uma entidade {@link Student}, associando as turmas e o curso correspondente.
     *
     * @param allClasses Lista de todas as turmas disponíveis.
     * @param allCourses Lista de todos os cursos disponíveis.
     * @return Um objeto {@link Student} preenchido com os dados fornecidos.
     * @throws IllegalArgumentException Se o curso atual não for encontrado na lista de cursos.
     */
    public Student converter(List<ClassSchool> allClasses, List<Course> allCourses) {

        // Filtra as turmas com base nos UUIDs passados
        List<ClassSchool> classList = allClasses.stream()
                .filter(classSchool -> classIds.contains(classSchool.getUuid()))
                .toList();

        // Busca o curso atual com base no ID
        Course currentCourse = allCourses.stream()
                .filter(course -> course.getUuid().equals(currentCourseId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado para o ID fornecido"));

        // Cria e retorna o objeto Student
        return Student.builder()
                .username(username)
                .password(password)
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .classIds(classList)  // Atribui as turmas corretamente
                .currentCourse(currentCourse)  // Atribui o curso atual
                .build();
    }
}
