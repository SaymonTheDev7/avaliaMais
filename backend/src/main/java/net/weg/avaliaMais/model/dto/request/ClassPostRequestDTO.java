package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * DTO para representar os dados necessários para criar uma turma (classe).
 */
public record ClassPostRequestDTO(

        @NotNull(message = "O UUID do curso não pode ser nulo")
        UUID courseUuid,

        List<UUID> studentIds,

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
     */
    public ClassSchool converter(List<Course> allCourses, List<Student> allStudents, List<Teacher> allTeachers) {
        // Busca o curso correspondente ao UUID fornecido
        Course course = allCourses.stream()
                .filter(c -> c.getUuid().equals(courseUuid))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        // Se a lista for nula, assume uma lista vazia
        List<UUID> safeStudentIds = studentIds == null ? Collections.emptyList() : studentIds;
        List<UUID> safeTeacherIds = teacherIds == null ? Collections.emptyList() : teacherIds;

        // Busca os alunos correspondentes
        List<Student> studentsList = safeStudentIds.stream()
                .map(id -> allStudents.stream()
                        .filter(s -> s.getUuid().equals(id))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + id)))
                .toList();

        // Busca os professores correspondentes
        List<Teacher> teachersList = safeTeacherIds.stream()
                .map(id -> allTeachers.stream()
                        .filter(t -> t.getUuid().equals(id))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + id)))
                .toList();

        // Cria e retorna a instância da turma
        return ClassSchool.builder()
                .course(course)
                .students(studentsList)
                .teachers(teachersList)
                .nameClass(nameClass)
                .year(year)
                .location(location)
                .workloadClass(workloadClass)
                .time(time != null ? time : "")
                .quantityStudents(quantityStudents)
                .shift(shift)
                .build();
    }
}
