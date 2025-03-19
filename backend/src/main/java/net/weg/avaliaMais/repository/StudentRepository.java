package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository <Student, Long> {

    Optional<Student> findByUsername(String username);

    boolean existsByEmail(String email);

    void deleteByUuid(UUID uuid);

    boolean existsByUuid(UUID uuid);
}
