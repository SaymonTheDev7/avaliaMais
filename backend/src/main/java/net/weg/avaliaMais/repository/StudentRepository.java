package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository <Student, Long> {
}
