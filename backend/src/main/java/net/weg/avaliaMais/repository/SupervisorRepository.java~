package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface SupervisorRepository extends JpaRepository<Supervisor, UUID>, JpaSpecificationExecutor<Supervisor> {
    Optional<Supervisor> findByUsernameOrEmail(String username, String email);

    Optional<Supervisor> findByShift(String workShift);
    Page<Supervisor> findAll(Pageable pageable);

}
