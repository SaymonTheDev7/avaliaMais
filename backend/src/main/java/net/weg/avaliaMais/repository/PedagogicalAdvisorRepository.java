package net.weg.avaliaMais.repository;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;
public interface PedagogicalAdvisorRepository extends JpaRepository<PedagogicalAdvisor, UUID>, JpaSpecificationExecutor<PedagogicalAdvisor> {
    Optional<PedagogicalAdvisor> findByUsername(String username);
    void deleteByUsername(String username);

    Optional<PedagogicalAdvisor> findByUsernameOrEmail(String username, String email);
    Optional<PedagogicalAdvisor> findByYear(Integer year);
    Optional<PedagogicalAdvisor> findByLocation(String location);
    Optional<PedagogicalAdvisor> findByNameCourse(String nameCourse);
    Optional<PedagogicalAdvisor> findByTypeCourse(String typeCourse);
    Optional<PedagogicalAdvisor> findByNameClass(String nameClass);
    Optional<PedagogicalAdvisor> findByShift(String shift);
    Page<PedagogicalAdvisor> findAll(String type, Pageable pageable);
}
