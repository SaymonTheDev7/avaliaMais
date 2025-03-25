package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import org.springframework.data.jpa.domain.Specification;

public class PedagogicalTechniqueSpecification {

    public static Specification<PedagogicalTechnique> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<PedagogicalTechnique> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
        };
    }
}
