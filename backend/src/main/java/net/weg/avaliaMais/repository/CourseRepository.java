package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
}
