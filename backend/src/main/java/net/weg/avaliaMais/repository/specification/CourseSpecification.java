package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {

    public static Specification<Course> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("nameCourse")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Course> hasShift(String shift) {
        return (root, query, criteriaBuilder) -> {
            if (shift == null || shift.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("shift")), "%" + shift.toLowerCase() + "%");
        };
    }

    public static Specification<Course> hasType(String type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null || type.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("type")), "%" + type.toLowerCase() + "%");
        };
    }

}
