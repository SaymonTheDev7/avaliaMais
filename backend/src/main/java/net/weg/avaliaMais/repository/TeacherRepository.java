package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository <Teacher, UUID>, JpaSpecificationExecutor<ClassSchool> {

    Optional<Teacher> findByUsername(String username);

    boolean existsByUuid(UUID uuid);

    void deleteByUuid(UUID uuid);
}
