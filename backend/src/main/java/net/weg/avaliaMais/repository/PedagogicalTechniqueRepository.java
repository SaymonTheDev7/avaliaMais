package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalTechnique;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PedagogicalTechniqueRepository extends JpaRepository<PedagogicalTechnique, Long> {

    Optional<PedagogicalTechnique> findByUsername(String username);
}
