package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Student;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class StudentSpecification {

    public static Specification<Student> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Student> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
        };
    }

    public static Specification<Student> hasClass(UUID classUuid) {
        return (root, query, criteriaBuilder) -> {
            if (classUuid == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.isMember(classUuid, root.get("classes"));
        };
    }

    public static Specification<Student> hasCourse(String course) {
        return (root, query, criteriaBuilder) -> {
            if (course == null || course.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.join("classes").join("course").get("name")), "%" + course.toLowerCase() + "%");
        };
    }

}
