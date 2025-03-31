package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.ClassSchool;
import org.springframework.data.jpa.domain.Specification;

/**
 * Classe de especificações para consultas na entidade {@link ClassSchool}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link ClassSchool} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class ClassSpecification {

    /**
     * Retorna uma especificação para buscar classes pelo ano.
     *
     * @param year O ano a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<ClassSchool> hasYear(Integer year) {
        return (root, query, criteriaBuilder) -> {
            if (year == null) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o ano for nulo.
            }
            return criteriaBuilder.equal(root.get("year"), year); // Filtra pelo ano especificado.
        };
    }

    /**
     * Retorna uma especificação para buscar classes pelo nome do curso.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param nameCourse O nome do curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<ClassSchool> hasCourse(String nameCourse) {
        return (root, query, criteriaBuilder) -> {
            if (nameCourse == null || nameCourse.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome do curso for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.join("course").get("nameCourse")), "%" + nameCourse.toLowerCase() + "%"
            ); // Filtra pelo nome do curso, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar classes pelo turno de trabalho.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param shift O turno de trabalho a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<ClassSchool> hasShift(String shift) {
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
     * Retorna uma especificação para buscar classes pela localização.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param location A localização a ser filtrada.
     * @return A especificação para a consulta.
     */
    public static Specification<ClassSchool> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> {
            if (location == null || location.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se a localização for nula ou vazia.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("location")), "%" + location.toLowerCase() + "%"
            ); // Filtra pela localização especificada.
        };
    }
}
