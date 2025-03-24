package net.weg.avaliaMais.repository;

import io.micrometer.observation.ObservationFilter;
import net.weg.avaliaMais.model.ClassSchool;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClassRepository extends JpaRepository<ClassSchool, UUID> {

    void deleteByNameClass(String nameClass);

    Optional<ClassSchool> findByNameClass(String nameClass);
}
