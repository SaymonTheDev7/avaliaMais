package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.ClassSchool;
import org.springframework.data.jpa.domain.Specification;

public class ClassSpecification {
    public static Specification<ClassSchool> hasYear(Integer year) {
        return (root, query, criteriaBuilder) -> {
            if (year == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("year"), year);
        };
    }

    public static Specification<ClassSchool> hasCourse(String nameCourse) {
        return (root, query, criteriaBuilder) -> {
            if (nameCourse == null || nameCourse.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.join("course").get("nameCourse")), "%" + nameCourse.toLowerCase() + "%"
            );
        };
    }

    public static Specification<ClassSchool> hasShift(String shift) {
        return (root, query, criteriaBuilder) -> {
            if (shift == null || shift.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("shift")), "%" + shift.toLowerCase() + "%"
            );
        };
    }

    public static Specification<ClassSchool> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> {
            if (location == null || location.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), "%" + location.toLowerCase() + "%"
            );
        };
    }
}
