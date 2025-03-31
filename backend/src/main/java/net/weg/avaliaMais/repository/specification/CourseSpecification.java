package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Course;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link Course}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link Course} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class CourseSpecification {

    /**
     * Retorna uma especificação para buscar cursos pelo nome.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Course> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("nameCourse")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome do curso, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar cursos pelo turno.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param shift O turno do curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Course> hasShift(String shift) {
        return (root, query, criteriaBuilder) -> {
            if (shift == null || shift.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o turno for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("shift")), "%" + shift.toLowerCase() + "%"
            ); // Filtra pelo turno especificado.
        };
    }

    /**
     * Retorna uma especificação para buscar cursos pelo tipo.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param type O tipo de curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Course> hasType(String type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null || type.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o tipo for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("type")), "%" + type.toLowerCase() + "%"
            ); // Filtra pelo tipo de curso especificado.
        };
    }
}
