package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;

import java.util.List;
import java.util.UUID;

public record StudentPostRequestDTO (
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek,
        List<UUID> classIds
) {

    public Student converter(List<ClassSchool> allClasses) {

        List<ClassSchool> classList = allClasses.stream().filter(classSchool -> classIds.contains(classSchool.getUuid())).toList();

        return Student.builder().username(username).password(password).email(email).workShift(workShift).workloadWeek(workloadWeek).classIds(classList).build();
    }
}
