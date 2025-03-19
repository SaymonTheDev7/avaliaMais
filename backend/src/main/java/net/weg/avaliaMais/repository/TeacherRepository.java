package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository <Teacher, Long> {

    Optional<Teacher> findByUsername(String username);

    boolean existsByUuid(UUID uuid);

    void deleteByUuid(UUID uuid);
}
