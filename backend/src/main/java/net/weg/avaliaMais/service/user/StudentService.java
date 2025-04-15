package net.weg.avaliaMais.service.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.user.StudentRepository;
import net.weg.avaliaMais.repository.specification.ClassSpecification;
import net.weg.avaliaMais.repository.specification.StudentSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

/**
 * Serviço responsável pela lógica de negócios relacionada à entidade {@link Student}.
 * Realiza operações de cadastro, remoção, listagem e filtragem de estudantes.
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    /** Repositório de estudantes. */
    private final StudentRepository studentRepository;

    /** Repositório de turmas. */
    private final ClassRepository classRepository;

    /** Repositório de cursos. */
    private final CourseRepository courseRepository;

    /**
     * Adiciona um novo estudante ao sistema.
     *
     * @param studentPostRequestDTO objeto com os dados do estudante a ser cadastrado.
     * @return {@link StudentResponseDTO} com os dados do estudante salvo.
     */
    public StudentResponseDTO addStudent(StudentPostRequestDTO studentPostRequestDTO) {
        List<ClassSchool> allClasses = classRepository.findAll();
        List<Course> allCourses = courseRepository.findAll();
        Student studentSave = studentPostRequestDTO.converter(allClasses, allCourses);
        studentSave = studentRepository.save(studentSave);
        return studentSave.toDto();
    }

    /**
     * Remove um estudante com base no UUID informado.
     *
     * @param uuid identificador único do estudante.
     * @throws RuntimeException se o estudante não for encontrado.
     */
    @Transactional
    public void deleteStudentByUUID(UUID uuid) {
        if (!studentRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Student not found");
        }
        studentRepository.deleteByUuid(uuid);
    }

    /**
     * Lista todos os estudantes de forma paginada.
     *
     * @param page número da página (começa em 0).
     * @param size quantidade de elementos por página (máximo de 50).
     * @return página de {@link StudentResponseDTO}.
     */
    public Page<StudentResponseDTO> findAllStudents(int page, int size) {
        if (page < 0) {
            page = 0;
        }
        if (size > 50) {
            size = 50;
        }
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.map(StudentResponseDTO::new);
    }

    /**
     * Lista as turmas de um estudante com filtros opcionais (ano, curso, turno, local).
     *
     * @param studentUuid UUID do estudante.
     * @param year        filtro opcional por ano.
     * @param course      filtro opcional por curso.
     * @param shift       filtro opcional por turno.
     * @param location    filtro opcional por local.
     * @param pageable    paginação.
     * @return página de {@link ClassResponseDTO}.
     */
    public Page<ClassResponseDTO> findStudentClasses(UUID studentUuid, Integer year, String course, String shift, String location, Pageable pageable) {
        Specification<ClassSchool> filtros = where(null);

        if (year != null) {
            filtros = filtros.and(ClassSpecification.hasYear(year));
        }
        if (course != null && !course.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasCourse(course));
        }
        if (shift != null && !shift.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasShift(shift));
        }
        if (location != null && !location.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasLocation(location));
        }

        filtros = filtros.and((root, query, criteriaBuilder) ->
                criteriaBuilder.isMember(studentUuid, root.get("students"))
        );

        return classRepository.findAll(filtros, pageable).map(ClassResponseDTO::new);
    }

    /**
     * Lista todos os estudantes com filtros opcionais (nome, e-mail, turma, curso).
     *
     * @param name      filtro por nome.
     * @param email     filtro por e-mail.
     * @param classUuid filtro por UUID da turma.
     * @param course    filtro por curso.
     * @param pageable  paginação.
     * @return página de {@link StudentResponseDTO} filtrada.
     */
    public Page<StudentResponseDTO> findAllStudentsSpecification(String name, String email, UUID classUuid, String course, Pageable pageable) {
        Specification<Student> filtros = where(null);
        if (name != null) filtros = filtros.and(StudentSpecification.hasName(name));
        if (email != null) filtros = filtros.and(StudentSpecification.hasEmail(email));
        if (classUuid != null) filtros = filtros.and(StudentSpecification.hasClass(classUuid));
        if (course != null) filtros = filtros.and(StudentSpecification.hasCourse(course));

        return studentRepository.findAll(filtros, pageable).map(StudentResponseDTO::new);
    }
}
