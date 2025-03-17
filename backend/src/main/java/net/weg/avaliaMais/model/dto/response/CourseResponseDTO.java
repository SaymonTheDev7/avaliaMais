package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Course;

import java.util.UUID;

public record CourseResponseDTO(
    UUID uuid,
    String nameCourse,
    String startAndEndLocation,
    String typeCourse,
    String shift,
    Double workloadCourse,
    Double time
) {

    public CourseResponseDTO (Course ActualCourse) {
        this(ActualCourse.getUuid(), ActualCourse.getNameCourse(), ActualCourse.getStartAndEndLocation(), ActualCourse.getTypeCourse(), ActualCourse.getShift(), ActualCourse.getWorkloadCourse(), ActualCourse.getTime());
    }
}
