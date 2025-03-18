package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;
import java.util.List;
import java.util.UUID;

public record TeacherPostRequestDTO(
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek,
        List<UUID> classIds
) {

    public Teacher converter(List<ClassSchool> allClasses) {
        List<ClassSchool> classesList = allClasses.stream().filter(classSchool -> classIds.contains(classSchool.getUuid())).toList();

        return Teacher.builder().username(username).password(password).email(email).workShift(workShift).workloadWeek(workloadWeek).classIds(classesList).build();
    }
}
