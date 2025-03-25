package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID>, JpaSpecificationExecutor<Course> {

    Course findByNameCourse(String nameCourse);  // Buscar curso pelo nome (único)

    List<Course> findAllByNameCourse(String nameCourse);  // Buscar todos os cursos com o mesmo nome

    Course findByUuid(UUID uuid);  // Buscar curso por UUID
}
