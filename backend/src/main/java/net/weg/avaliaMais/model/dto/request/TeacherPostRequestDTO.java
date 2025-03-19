package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

public record TeacherPostRequestDTO(

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
        @Size(min = 1, message = "A lista de turmas não pode ser vazia")
        List<UUID> classIds,

        @NotBlank(message = "A area profissional nao pode estar em branco")
        String professionalArea

) {

    public Teacher converter(List<ClassSchool> allClasses) {
        List<ClassSchool> classesList = allClasses.stream().filter(classSchool -> classIds.contains(classSchool.getUuid())).toList();

        return Teacher.builder().username(username).password(password).email(email).workShift(workShift).workloadWeek(workloadWeek).classIds(classesList).professionalArea(professionalArea).build();
    }
}
