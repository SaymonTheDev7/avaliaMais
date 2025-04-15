package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.List;
import java.util.UUID;

/**
 * DTO para representar os dados necessários para criar uma turma (classe).
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las
 * antes de criar uma entidade {@link ClassSchool}. Ela contém informações como
 * o curso, alunos, professores, nome da turma, ano, localização, carga horária,
 * entre outros dados necessários para a criação de uma turma no sistema.
 * </p>
 */
public record ClassPostRequestDTO(

        @NotNull(message = "O UUID do curso não pode ser nulo")
        UUID courseUuid,

        @NotNull(message = "A lista de alunos não pode ser nula")
        List<UUID> studentIds,

        @NotNull(message = "A lista de professores não pode ser nula")
        List<UUID> teacherIds,

        @NotBlank(message = "O nome da turma não pode estar em branco")
        String nameClass,

        @NotNull(message = "O ano da turma não pode ser nulo")
        Integer year,

        @NotBlank(message = "O local não pode estar em branco")
        String location,

        @NotNull(message = "A carga horária não pode ser nula")
        @Positive(message = "A carga horária deve ser positiva")
        Double workloadClass,

        String time,

        @NotNull(message = "A quantidade de alunos não pode ser nula")
        @Positive(message = "A quantidade de alunos deve ser positiva")
        Integer quantityStudents,

        @NotBlank(message = "O turno não pode estar em branco")
        String shift

) {

    /**
     * Converte o DTO em uma entidade {@link ClassSchool}, associando os cursos, alunos e professores correspondentes.
     * <p>
     * Este método converte os dados contidos no DTO para criar uma instância de {@link ClassSchool}.
     * Ele busca os objetos correspondentes a partir dos IDs fornecidos (curso, alunos, professores),
     * realizando a validação para garantir que todas as informações estejam corretas.
     * </p>
     *
     * @param allCourses  Lista de cursos disponíveis no sistema.
     * @param allStudents Lista de alunos disponíveis no sistema.
     * @param allTeachers Lista de professores disponíveis no sistema.
     * @return Uma instância de {@link ClassSchool} contendo os dados validados e processados.
     * @throws RuntimeException Se o curso, aluno ou professor especificado não for encontrado.
     */
    public ClassSchool converter(List<Course> allCourses, List<Student> allStudents, List<Teacher> allTeachers) {
        // Busca o curso correspondente ao UUID fornecido
        Course course = allCourses.stream()
                .filter(c -> c.getUuid().equals(courseUuid))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        // Busca os alunos correspondentes aos IDs fornecidos
        List<Student> studentsList = studentIds.stream()
                .map(id -> allStudents.stream()
                        .filter(s -> s.getUuid().equals(id))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + id)))
                .toList();

        // Busca os professores correspondentes aos IDs fornecidos
        List<Teacher> teachersList = teacherIds.stream()
                .map(id -> allTeachers.stream()
                        .filter(t -> t.getUuid().equals(id))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + id)))
                .toList();

        // Cria e retorna uma instância de ClassSchool com os dados fornecidos
        return ClassSchool.builder()
                .course(course)
                .students(studentsList)
                .teachers(teachersList)
                .nameClass(nameClass)
                .year(year)
                .location(location)
                .workloadClass(workloadClass)
                .time(String.valueOf(time))
                .quantityStudents(quantityStudents)
                .shift(shift)
                .build();
    }
}
