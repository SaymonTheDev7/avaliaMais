package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.Course;

/**
 * DTO para representar os dados opcionais para atualizar um curso.
 * <p>
 * Esta classe permite atualizações parciais de um curso existente,
 * ou seja, apenas os campos que forem fornecidos serão atualizados.
 * </p>
 */
public record CourseUpdateRequestDTO(

        String nameCourse,

        String startAndEndLocation,

        String typeCourse,

        String shift,

        Double workloadCourse,

        Double time

) {

    /**
     * Atualiza um objeto {@link Course} com os campos não nulos do DTO.
     * <p>
     * Este método aplica apenas os campos fornecidos (não nulos) ao curso existente.
     * </p>
     *
     * @param course O curso a ser atualizado.
     */
    public void applyTo(Course course) {
        if (nameCourse != null) course.setNameCourse(nameCourse);
        if (startAndEndLocation != null) course.setStartAndEndLocation(startAndEndLocation);
        if (typeCourse != null) course.setTypeCourse(typeCourse);
        if (shift != null) course.setShift(shift);
        if (workloadCourse != null) course.setWorkloadCourse(workloadCourse);
        if (time != null) course.setTime(time);
    }
}
