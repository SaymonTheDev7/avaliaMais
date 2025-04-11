package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.List;
import java.util.UUID;

public record StudentPostRequestDTO(
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

        @NotNull(message = "A lista de turmas não pode ser nula")
        List<UUID> classIds,

        @NotNull(message = "O ID do curso atual não pode ser nulo")
        UUID currentCourseId,

        @NotNull
        UserRole role
) {
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
