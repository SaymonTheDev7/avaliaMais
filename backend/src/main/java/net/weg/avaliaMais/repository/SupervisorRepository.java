package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface SupervisorRepository extends JpaRepository<Supervisor, UUID>, JpaSpecificationExecutor<Supervisor> {

    Optional<Supervisor> findByUsername(String username);
    Optional<Supervisor> findByEmail(String email);
}
