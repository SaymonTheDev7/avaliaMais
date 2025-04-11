package net.weg.avaliaMais.repository.user;

import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.model.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link Student}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para consultas dinâmicas e complexas.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, UUID>, JpaSpecificationExecutor<Student> {

    /**
     * Verifica se já existe um estudante com o e-mail informado.
     *
     * @param email O e-mail a ser verificado.
     * @return {@code true} se um estudante com o e-mail já existir, caso contrário {@code false}.
     */
    boolean existsByEmail(String email);

    Optional<Student> findByAuthUserUuid(UUID uuid);

    /**
     * Deleta um estudante pelo UUID.
     *
     * @param uuid O UUID do estudante a ser deletado.
     */
    void deleteByUuid(UUID uuid);

    /**
     * Verifica se existe um estudante com o UUID informado.
     *
     * @param uuid O UUID a ser verificado.
     * @return {@code true} se um estudante com o UUID existir, caso contrário {@code false}.
     */
    boolean existsByUuid(UUID uuid);
}
