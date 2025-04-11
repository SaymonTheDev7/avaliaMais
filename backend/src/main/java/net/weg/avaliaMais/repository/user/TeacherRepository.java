package net.weg.avaliaMais.repository.user;

import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.user.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
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
     * Verifica se um professor existe com base no UUID fornecido.
     *
     * @param uuid O UUID do professor.
     * @return {@code true} se o professor existir, {@code false} caso contrário.
     */
    boolean existsByUuid(UUID uuid);

    Optional<Teacher> findByAuthUserUuid(UUID uuid);

    /**
     * Exclui um professor baseado no UUID fornecido.
     *
     * @param uuid O UUID do professor a ser excluído.
     */
    void deleteByUuid(UUID uuid);
}
