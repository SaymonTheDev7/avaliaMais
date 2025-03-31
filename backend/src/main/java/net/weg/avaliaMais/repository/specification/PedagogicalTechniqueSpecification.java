package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.PedagogicalTechnique;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link PedagogicalTechnique}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link PedagogicalTechnique} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class PedagogicalTechniqueSpecification {

    /**
     * Retorna uma especificação para buscar técnicas pedagógicas pelo nome.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome da técnica pedagógica a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<PedagogicalTechnique> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"
            ); // Filtra pela técnica pedagógica, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar técnicas pedagógicas pelo email.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param email O email da técnica pedagógica a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<PedagogicalTechnique> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o email for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"
            ); // Filtra pelo email da técnica pedagógica, permitindo correspondências parciais.
        };
    }
}
