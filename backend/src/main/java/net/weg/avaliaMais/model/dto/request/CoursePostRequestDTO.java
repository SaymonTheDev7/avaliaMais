package net.weg.avaliaMais.model.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.model.Course;
public record CoursePostRequestDTO(

        @NotBlank(message = "O nome do curso não pode estar em branco")
        String nameCourse,

        @NotBlank(message = "A data de início e término não pode estar em branco")
        String startAndEndLocation,

        @NotBlank(message = "O tipo do curso não pode estar em branco")
        String typeCourse,

        @NotBlank(message = "O turno não pode estar em branco")
        String shift,

        @NotNull(message = "A carga horária do curso não pode ser nula")
        @Positive(message = "A carga horária deve ser positiva")
        Double workloadCourse,

        @NotNull(message = "O tempo não pode ser nulo")
        @Positive(message = "O tempo deve ser positivo")
        Double time

) {

    public Course converter() {
        return Course.builder().nameCourse(nameCourse).startAndEndLocation(startAndEndLocation).typeCourse(typeCourse).shift(shift).workloadCourse(workloadCourse).time(time).build();
    }
}
