package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface SupervisorRepository extends JpaRepository<Supervisor, UUID>, JpaSpecificationExecutor<Supervisor> {
    Optional<Supervisor> findByUsernameOrEmail(String username, String email);
    Optional<Supervisor> findByYear(Integer year);
    Optional<Supervisor> findByLocation(String location);
    Optional<Supervisor> findByNameCourse(String nameCourse);
    Optional<Supervisor> findByTypeCourse(String typeCourse);
    Optional<Supervisor> findByNameClass(String nameClass);
    Optional<Supervisor> findByShift(String shift);
}
