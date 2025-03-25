package net.weg.avaliaMais.repository;

import io.micrometer.observation.ObservationFilter;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface PedagogicalTechniqueRepository extends JpaRepository<PedagogicalTechnique, UUID>, JpaSpecificationExecutor<PedagogicalTechnique> {

    Optional<PedagogicalTechnique> findByUsername(String username);

}
