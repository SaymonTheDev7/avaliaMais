package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.jpa.domain.Specification;

public class SupervisorSpecification {

    public static Specification<Supervisor> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Supervisor> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
        };
    }
}
