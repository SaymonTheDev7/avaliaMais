package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository <Teacher, Long> {
}
