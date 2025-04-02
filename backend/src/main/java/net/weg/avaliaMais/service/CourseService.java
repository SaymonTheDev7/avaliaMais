package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.specification.CourseSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    /**
     * Adiciona um novo curso com base nos dados fornecidos.
     *
     * <p>Este método recebe os dados do curso através de um {@link CoursePostRequestDTO}, valida se o nome do curso
     * já existe no banco de dados e, se não existir, cria e salva o novo curso.</p>
     *
     * @param coursePostRequestDTO Objeto contendo os dados do curso a ser criado.
     * @return Um objeto {@link CourseResponseDTO} com os dados do curso recém-criado.
     * @throws IllegalArgumentException Se já existir um curso com o mesmo nome fornecido.
     */
    public CourseResponseDTO addCourse(CoursePostRequestDTO coursePostRequestDTO) {
        if (courseRepository.findByNameCourse(coursePostRequestDTO.nameCourse()) != null) {
            throw new IllegalArgumentException("Já existe um curso com o nome fornecido");
        }
        Course courseSave = courseRepository.save(coursePostRequestDTO.converter());
        return courseSave.toDto();
    }

    /**
     * Atualiza os dados de um curso existente com base no nome fornecido.
     *
     * <p>Este método permite atualizar um curso já existente, verificando se o curso com o nome fornecido
     * existe no banco de dados. Caso exista, os dados são atualizados com as informações fornecidas no
     * {@link CoursePostRequestDTO} e o curso é salvo novamente no repositório.</p>
     *
     * @param nameCourse O nome do curso a ser atualizado.
     * @param coursePostRequestDTO Objeto contendo os novos dados do curso.
     * @return Um objeto {@link CourseResponseDTO} com os dados do curso atualizado.
     * @throws RuntimeException Se o curso com o nome fornecido não for encontrado.
     */
    public CourseResponseDTO updateCoursePerName(String nameCourse, CoursePostRequestDTO coursePostRequestDTO) {
        Course course = courseRepository.findByNameCourse(nameCourse);
        if (course == null) {
            throw new RuntimeException("Curso não encontrado");
        }
        course.setNameCourse(coursePostRequestDTO.nameCourse());
        course.setStartAndEndLocation(coursePostRequestDTO.startAndEndLocation());
        course.setTypeCourse(coursePostRequestDTO.typeCourse());
        course.setShift(coursePostRequestDTO.shift());
        course.setWorkloadCourse(coursePostRequestDTO.workloadCourse());
        course.setTime(coursePostRequestDTO.time());
        courseRepository.save(course);
        return course.toDto();
    }

    /**
     * Deleta um curso com base no nome fornecido.
     *
     * <p>Este método busca um curso pelo nome no banco de dados. Se o curso for encontrado, ele é deletado.
     * Caso contrário, retorna uma mensagem informando que o curso não foi encontrado.</p>
     *
     * @param nameCourse O nome do curso a ser deletado.
     * @return Uma mensagem indicando se o curso foi deletado com sucesso ou se não foi encontrado.
     */
    public String deleteCoursePerName(String nameCourse) {
        List<Course> courses = courseRepository.findAllByNameCourse(nameCourse);
        if (courses.isEmpty()) {
            return "Curso não encontrado";
        }
        courseRepository.delete(courses.get(0));
        return "Curso deletado com sucesso";
    }

    /**
     * Busca um curso com base no UUID fornecido.
     *
     * <p>Este método pesquisa o curso no banco de dados utilizando o UUID fornecido. Se o curso for encontrado,
     * ele é convertido para um DTO e retornado. Caso o curso não seja encontrado, retorna {@code null}.</p>
     *
     * @param uuid O UUID do curso a ser buscado.
     * @return O DTO do curso encontrado ou {@code null} caso o curso não exista.
     */
    public CourseResponseDTO findCoursePerUuid(UUID uuid) {
        Course course = courseRepository.findByUuid(uuid);
        return course == null ? null : course.toDto();
    }

    /**
     * Busca um curso com base no nome fornecido.
     *
     * <p>Este método pesquisa o curso no banco de dados utilizando o nome fornecido. Se o curso for encontrado,
     * ele é convertido para um DTO e retornado. Caso o nome do curso seja inválido ou o curso não seja encontrado,
     * retorna {@code null}.</p>
     *
     * @param nameCourse O nome do curso a ser buscado.
     * @return O DTO do curso encontrado ou {@code null} caso o curso não exista.
     * @throws IllegalArgumentException Se o nome do curso for {@code null} ou vazio.
     */
    public CourseResponseDTO findCoursePerName(String nameCourse) {
        if (nameCourse == null || nameCourse.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do curso não pode ser vazio");
        }
        Course course = courseRepository.findByNameCourse(nameCourse);
        return course == null ? null : course.toDto();
    }

    /**
     * Retorna uma lista paginada de todos os cursos disponíveis.
     *
     * <p>Este método recupera uma lista de cursos a partir do banco de dados, paginando os resultados com base nos parâmetros
     * de página e tamanho fornecidos. Os cursos recuperados são então convertidos para DTOs e retornados.</p>
     *
     * @param page O número da página para a consulta.
     * @param size O número de cursos por página.
     * @return Uma página de objetos {@link CourseResponseDTO} contendo os cursos solicitados.
     */
    public Page<CourseResponseDTO> findAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> coursePage = courseRepository.findAll(pageable);
        return coursePage.map(CourseResponseDTO::new);
    }

    public Page<CourseResponseDTO> findCourses(String name, String shift, String type, Pageable pageable) {
        Specification<Course> filtros = where(null);
        if (name != null) filtros = filtros.and(CourseSpecification.hasName(name));
        if (shift != null) filtros = filtros.and(CourseSpecification.hasShift(shift));
        if (type != null) filtros = filtros.and(CourseSpecification.hasType(type));

        return courseRepository.findAll(filtros, pageable).map(CourseResponseDTO::new);
    }
}
