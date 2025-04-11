package net.weg.avaliaMais.repository.user;

import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.model.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link PedagogicalTechnique}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para consultas dinâmicas e complexas.
 */
@Repository
public interface PedagogicalTechniqueRepository extends JpaRepository<PedagogicalTechnique, UUID>, JpaSpecificationExecutor<PedagogicalTechnique> {

    Optional<PedagogicalTechnique>findByAuthUserUuid(UUID uuid);

}
