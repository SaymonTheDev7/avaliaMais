package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

public record ClassPostRequestDTO(
        Course uuid_course,
        List<UUID> studentIds,
        List<UUID> teacherIds,
        String nameClass,
        Double workloadClass,
        Double time,
        Integer quantityStudents,
        String shift
) {

    public ClassSchool converter() {
        return ClassSchool.builder().uuid_course(uuid_course).students(null).teachers(null).nameClass(nameClass).workloadClass(workloadClass).time(time).quantityStudents(quantityStudents).shift(shift).build();
    }
}
