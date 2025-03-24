package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record ClassResponseDTO(
        UUID uuid,
        String nameClass,
        Integer year,
        Double workloadClass,
        String location,
        Double time,
        Integer quantityStudents,
        String shift,
        UUID courseUuid,
        String courseName,
        List<UUID> studentIds,
        List<UUID> teacherIds
) {

    public ClassResponseDTO(ClassSchool actualClassSchool) {
        this(
                actualClassSchool.getUuid(),
                actualClassSchool.getNameClass(),
                actualClassSchool.getYear(),
                actualClassSchool.getWorkloadClass(),
                actualClassSchool.getLocation(),
                actualClassSchool.getTime(),
                actualClassSchool.getQuantityStudents(),
                actualClassSchool.getShift(),
                actualClassSchool.getCourse().getUuid(),
                actualClassSchool.getCourse().getNameCourse(),
                actualClassSchool.getStudents().stream().map(student -> student.getUuid()).collect(Collectors.toList()),
                actualClassSchool.getTeachers().stream().map(teacher -> teacher.getUuid()).collect(Collectors.toList())
        );
    }

}


