package net.weg.avaliaMais.repository.user;

import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.user.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link Supervisor}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para consultas dinâmicas e complexas.
 */
@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, UUID>, JpaSpecificationExecutor<Supervisor> {

    Optional<Supervisor> findByAuthUserUuid(UUID uuid);

    Page<Supervisor> findAll(Pageable pageable);

}
