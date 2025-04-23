package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link Course}.
 * Esta interface estende {@link JpaRepository} e {@link JpaSpecificationExecutor},
 * oferecendo métodos para realizar operações de CRUD e consultas dinâmicas
 * com base em especificações.
 */
public interface CourseRepository extends JpaRepository<Course, UUID>, JpaSpecificationExecutor<Course> {

    /**
     * Encontra um curso pelo nome do curso. O nome do curso é único.
     *
     * @param nameCourse O nome do curso a ser buscado.
     * @return O curso correspondente ao nome fornecido.
     */
    Optional<Course> findByNameCourse(String nameCourse);


    /**
     * Encontra todos os cursos com o mesmo nome do curso.
     *
     * @param nameCourse O nome do curso a ser buscado.
     * @return Uma lista de cursos com o mesmo nome.
     */
    List<Course> findAllByNameCourse(String nameCourse);

    /**
     * Encontra um curso com base no UUID.
     *
     * @param uuid O UUID do curso a ser buscado.
     * @return O curso correspondente ao UUID fornecido.
     */
    Course findByUuid(UUID uuid);
}
