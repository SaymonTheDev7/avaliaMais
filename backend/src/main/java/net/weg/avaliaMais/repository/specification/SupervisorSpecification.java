package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.user.Supervisor;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link Supervisor}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link Supervisor} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class SupervisorSpecification {

    /**
     * Retorna uma especificação para buscar supervisores pelo nome de usuário.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do supervisor a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Supervisor> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("username")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome de usuário do supervisor, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar supervisores pelo email.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param email O email do supervisor a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Supervisor> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o email for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"
            ); // Filtra pelo email do supervisor, permitindo correspondências parciais.
        };
    }
}
