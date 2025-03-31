package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link Teacher}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para consultas dinâmicas e complexas.
 */
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, UUID>, JpaSpecificationExecutor<Teacher> {

    /**
     * Encontra um professor por nome de usuário.
     *
     * @param username O nome de usuário do professor.
     * @return Um {@link Optional} contendo o {@link Teacher} se encontrado, ou vazio se não.
     */
    Optional<Teacher> findByUsername(String username);

    /**
     * Verifica se um professor existe com base no UUID fornecido.
     *
     * @param uuid O UUID do professor.
     * @return {@code true} se o professor existir, {@code false} caso contrário.
     */
    boolean existsByUuid(UUID uuid);

    /**
     * Exclui um professor baseado no UUID fornecido.
     *
     * @param uuid O UUID do professor a ser excluído.
     */
    void deleteByUuid(UUID uuid);
}
