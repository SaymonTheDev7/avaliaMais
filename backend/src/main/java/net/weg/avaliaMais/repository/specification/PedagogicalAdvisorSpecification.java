package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.user.PedagogicalAdvisor;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link PedagogicalAdvisor}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link PedagogicalAdvisor} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class PedagogicalAdvisorSpecification {

    /**
     * Retorna uma especificação para buscar orientadores pedagógicos pelo nome.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do orientador pedagógico a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<PedagogicalAdvisor> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome do orientador pedagógico, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar orientadores pedagógicos pelo email.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param email O email do orientador pedagógico a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<PedagogicalAdvisor> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o email for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"
            ); // Filtra pelo email do orientador pedagógico, permitindo correspondências parciais.
        };
    }
}
