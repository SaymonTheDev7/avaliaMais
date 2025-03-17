package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;

public record CoursePostRequestDTO (
    String nameCourse,
    String startAndEndLocation,
    String typeCourse,
    String shift,
    Double workloadCourse,
    Double time
) {

    public Course converter () {
        return Course.builder().nameCourse(nameCourse).startAndEndLocation(startAndEndLocation).typeCourse(typeCourse).shift(shift).workloadCourse(workloadCourse).time(time).build();
    }
}
