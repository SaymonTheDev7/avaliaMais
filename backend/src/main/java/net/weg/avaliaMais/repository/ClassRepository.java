package net.weg.avaliaMais.repository;

import io.micrometer.observation.ObservationFilter;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Supervisor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClassRepository extends JpaRepository<ClassSchool, UUID>, JpaSpecificationExecutor<ClassSchool> {

    void deleteByNameClass(String nameClass);

    Optional<ClassSchool> findByNameClass(String nameClass);

}

