package net.weg.avaliaMais.repository;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;
public interface PedagogicalAdvisorRepository extends JpaRepository<PedagogicalAdvisor, UUID>, JpaSpecificationExecutor<PedagogicalAdvisor> {
    Optional<PedagogicalAdvisor> findByUsername(String username);

    void deleteByUsername(String username);
}
