package net.weg.avaliaMais.service.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.StudentUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.user.StudentRepository;
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
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final AuthUserRepository authUserRepository;

    /**
     * Cadastra um novo estudante.
     *
     * @param dto dados para criação do estudante.
     * @return {@link StudentResponseDTO} com os dados do estudante salvo.
     */
    public StudentResponseDTO addStudent(StudentPostRequestDTO dto) {
        // Recupera o curso atual e o usuário autenticado
        Course currentCourse = courseRepository.findById(dto.currentCourseId())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        AuthUser authUser = authUserRepository.findById(dto.authUserUuid())
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado"));

        // Converte o DTO para a entidade Student
        Student student = dto.toEntity(currentCourse, authUser);

        // Salva o estudante no banco de dados
        student = studentRepository.save(student);

        // Retorna a resposta DTO
        return new StudentResponseDTO(student);
    }

    @Transactional
    public StudentResponseDTO updateStudent(UUID uuid, StudentUpdateRequestDTO dto) {
        Student student = studentRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));

        // Atualiza apenas os campos que não são nulos no DTO
        if (dto.email() != null) student.setEmail(dto.email());
        if (dto.workShift() != null) student.setWorkShift(dto.workShift());
        if (dto.workloadWeek() != null) student.setWorkloadWeek(dto.workloadWeek());

        if (dto.currentCourseId() != null) {
            Course course = courseRepository.findById(dto.currentCourseId())
                    .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
            student.setCurrentCourse(course);
        }

        if (dto.authUserUuid() != null) {
            AuthUser authUser = authUserRepository.findById(dto.authUserUuid())
                    .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado"));
            student.setAuthUser(authUser);
        }

        Student updated = studentRepository.save(student);
        return new StudentResponseDTO(updated);
    }

    /**
     * Remove um estudante com base no UUID.
     *
     * @param uuid UUID do estudante.
     */
    @Transactional
    public void deleteStudentByUUID(UUID uuid) {
        if (!studentRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Estudante não encontrado");
        }
        studentRepository.deleteByUuid(uuid);
    }

    /**
     * Busca um estudante pelo UUID.
     *
     * @param uuid UUID do estudante.
     * @return DTO com os dados do estudante.
     */
    public StudentResponseDTO findByUuid(UUID uuid) {
        return studentRepository.findById(uuid)
                .map(StudentResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));
    }


    /**
     * Retorna todos os estudantes com paginação.
     *
     * @param page número da página.
     * @param size tamanho da página (máx. 50).
     * @return página de {@link StudentResponseDTO}.
     */
    public Page<StudentResponseDTO> findAllStudents(int page, int size) {
        if (page < 0) page = 0;
        if (size > 50) size = 50;
        Pageable pageable = PageRequest.of(page, size);
        return studentRepository.findAll(pageable).map(StudentResponseDTO::new);
    }

    /**
     * Filtra estudantes com base em nome, e-mail, turma e curso.
     *
     * @param name      filtro por nome.
     * @param email     filtro por e-mail.
     * @param classUuid filtro por UUID da turma.
     * @param course    filtro por nome do curso.
     * @param pageable  paginação.
     * @return página de {@link StudentResponseDTO}.
     */
    public Page<StudentResponseDTO> findAllStudentsSpecification(String name, String email, UUID classUuid, String course, Pageable pageable) {
        Specification<Student> filtros = where(null);
        if (name != null && !name.isEmpty()) filtros = filtros.and(StudentSpecification.hasName(name));
        if (email != null && !email.isEmpty()) filtros = filtros.and(StudentSpecification.hasEmail(email));
        if (classUuid != null) filtros = filtros.and(StudentSpecification.hasClass(classUuid));
        if (course != null && !course.isEmpty()) filtros = filtros.and(StudentSpecification.hasCourse(course));
        return studentRepository.findAll(filtros, pageable).map(StudentResponseDTO::new);
    }
}
