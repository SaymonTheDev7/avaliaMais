package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Teacher;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link Teacher}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link Teacher} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class TeacherSpecification {

    /**
     * Retorna uma especificação para buscar professores pelo nome.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do professor a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Teacher> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome do professor, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar professores pelo email.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param email O email do professor a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Teacher> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o email for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"
            ); // Filtra pelo email do professor, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar professores pelo nome do curso.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param course O nome do curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Teacher> hasCourse(String course) {
        return (root, query, criteriaBuilder) -> {
            if (course == null || course.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome do curso for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.join("courses").get("name")), "%" + course.toLowerCase() + "%"
            ); // Filtra pelo nome do curso do professor, permitindo correspondências parciais.
        };
    }
}

