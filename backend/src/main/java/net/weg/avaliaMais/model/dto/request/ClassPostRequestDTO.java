package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

public record ClassPostRequestDTO(

        @NotNull(message = "O UUID do curso não pode ser nulo")
        UUID courseUuid,

        @NotEmpty(message = "A lista de alunos não pode estar vazia")
        @Size(min = 1, message = "Deve haver pelo menos um aluno")
        List<UUID> studentIds,

        @NotEmpty(message = "A lista de professores não pode estar vazia")
        @Size(min = 1, message = "Deve haver pelo menos um professor")
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

        @NotNull(message = "O tempo não pode ser nulo")
        @Positive(message = "O tempo deve ser positivo")
        Double time,

        @NotNull(message = "A quantidade de alunos não pode ser nula")
        @Positive(message = "A quantidade de alunos deve ser positiva")
        Integer quantityStudents,

        @NotBlank(message = "O turno não pode estar em branco")
        String shift



) {
    public ClassSchool converter(List<Course> allCourses, List<Student> allStudents, List<Teacher> allTeachers) {
        Course course = allCourses.stream()
                .filter(c -> c.getUuid().equals(courseUuid))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        List<Student> studentsList = studentIds == null ? List.of() :
                allStudents.stream()
                        .filter(student -> studentIds.contains(student.getUuid()))
                        .toList();

        List<Teacher> teachersList = teacherIds == null ? List.of() :
                allTeachers.stream()
                        .filter(teacher -> teacherIds.contains(teacher.getUuid()))
                        .toList();

        return ClassSchool.builder()
                .course(course)  // Agora 'course' está correto
                .students(studentsList)
                .teachers(teachersList)
                .nameClass(nameClass)
                .year(year)
                .location(location)
                .workloadClass(workloadClass)
                .time(time)
                .quantityStudents(quantityStudents)
                .shift(shift)
                .build();
    }
}
