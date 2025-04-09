package net.weg.avaliaMais.repository.specification;

import net.weg.avaliaMais.model.user.Student;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

/**
 * Classe de especificações para consultas na entidade {@link Student}.
 * Esta classe oferece métodos estáticos para construir especificações que podem ser usadas
 * em consultas dinâmicas de {@link Student} com base em diferentes parâmetros.
 *
 * As especificações podem ser combinadas para criar consultas mais complexas.
 */
public class StudentSpecification {

    /**
     * Retorna uma especificação para buscar estudantes pelo nome de usuário.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param name O nome do estudante a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Student> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("username")), "%" + name.toLowerCase() + "%"
            ); // Filtra pelo nome de usuário do estudante, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar estudantes pelo email.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param email O email do estudante a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Student> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o email for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"
            ); // Filtra pelo email do estudante, permitindo correspondências parciais.
        };
    }

    /**
     * Retorna uma especificação para buscar estudantes pela classe (por UUID da classe).
     *
     * @param classUuid O UUID da classe do estudante.
     * @return A especificação para a consulta.
     */
    public static Specification<Student> hasClass(UUID classUuid) {
        return (root, query, criteriaBuilder) -> {
            if (classUuid == null) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o UUID da classe for nulo.
            }
            return criteriaBuilder.isMember(classUuid, root.get("classes")); // Filtra pelos estudantes que pertencem à classe especificada.
        };
    }

    /**
     * Retorna uma especificação para buscar estudantes por curso, com base no nome do curso.
     * A busca é insensível a maiúsculas e minúsculas.
     *
     * @param course O nome do curso a ser filtrado.
     * @return A especificação para a consulta.
     */
    public static Specification<Student> hasCourse(String course) {
        return (root, query, criteriaBuilder) -> {
            if (course == null || course.isEmpty()) {
                return criteriaBuilder.conjunction(); // Retorna uma condição "verdadeira" se o nome do curso for nulo ou vazio.
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.join("classes").join("course").get("name")), "%" + course.toLowerCase() + "%"
            ); // Filtra pelos estudantes do curso especificado, permitindo correspondências parciais.
        };
    }
}
