package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalAdvisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PedagogicalAdvisorRepository extends JpaRepository<PedagogicalAdvisor, UUID>, JpaSpecificationExecutor<PedagogicalAdvisor> {

    Optional<PedagogicalAdvisor> findByUsername(String username);

    Optional<PedagogicalAdvisor> findByUsernameOrEmail(String username, String email);

    Optional<PedagogicalAdvisor> findByWorkShift(String workShift);

    Page<PedagogicalAdvisor> findAll(Pageable pageable);

}
