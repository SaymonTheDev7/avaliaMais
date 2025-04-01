package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.Event;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

/**
 * Classe de especificações para consultas na entidade {@link Event}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link Event} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class EventSpecification {

    /**
     * Retorna uma especificação para buscar eventos pelo nome.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do evento a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Event> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome do evento.
        };
    }

    /**
     * Retorna uma especificação para buscar eventos pela data.
     *
     * @param date A data do evento a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Event> hasDate(LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se a data for nula.
            }
            return criteriaBuilder.equal(root.get("date"), date); // Filtra pela data do evento.
        };
    }

    /**
     * Retorna uma especificação para buscar eventos pelo status.
     *
     * @param status O status do evento a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Event> hasStatus(String status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null || status.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o status for nulo ou vazio.
            }
            return criteriaBuilder.equal(root.get("status"), status); // Filtra pelo status do evento.
        };
    }

    /**
     * Retorna uma especificação para buscar eventos pela etapa.
     *
     * @param step A etapa do evento a ser filtrada.
     * @return A especificação para a consulta.
     */
    public static Specification<Event> hasStep(String step) {
        return (root, query, criteriaBuilder) -> {
            if (step == null || step.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se a etapa for nula ou vazia.
            }
            return criteriaBuilder.equal(root.get("step"), step); // Filtra pela etapa do evento.
        };
    }
}
