package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;

import java.util.UUID;

public record ClassResponseDTO(

        UUID uuid,
        String nameClass,
        Double workloadClass,
        Double time,
        Integer quantityStudents,
        String shift
) {

    public ClassResponseDTO (ClassSchool ActualClassSchool) {
        this(ActualClassSchool.getUuid(), ActualClassSchool.getNameClass(), ActualClassSchool.getWorkloadClass(), ActualClassSchool.getTime(), ActualClassSchool.getQuantityStudents(), ActualClassSchool.getShift());
    }
}
