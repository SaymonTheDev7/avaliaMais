package net.weg.avaliaMais.service.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.user.Teacher;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.user.TeacherRepository;
import net.weg.avaliaMais.repository.specification.TeacherSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

/**
 * Serviço responsável pelas operações de negócio relacionadas à entidade {@link Teacher}.
 * Oferece funcionalidades de cadastro, exclusão e busca com ou sem filtros.
 */
@Service
@RequiredArgsConstructor
public class TeacherService {

    /** Repositório de professores para operações no banco de dados. */
    private final TeacherRepository teacherRepository;

    /** Repositório de turmas utilizado para associar professores a turmas. */
    private final ClassRepository classRepository;

    /**
     * Adiciona um novo professor ao sistema com base nos dados fornecidos.
     *
     * @param teacherPostRequestDTO DTO contendo as informações do professor.
     * @return {@link TeacherResponseDTO} com os dados do professor salvo.
     */
    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO teacherPostRequestDTO) {
        List<ClassSchool> allClasses = classRepository.findAll();
        Teacher teacherSave = teacherPostRequestDTO.converter(allClasses);
        if (teacherSave.getClassIds() == null) {
            teacherSave.setClassIds(List.of());
        }
        teacherSave = teacherRepository.save(teacherSave);
        return teacherSave.toDto();
    }

    /**
     * Remove um professor do sistema com base em seu UUID.
     *
     * @param uuid identificador único do professor.
     * @throws RuntimeException caso o professor não seja encontrado.
     */
    @Transactional
    public void deleteTeacherByUUID(UUID uuid) {
        if (!teacherRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Teacher not found");
        }
        teacherRepository.deleteByUuid(uuid);
    }

    /**
     * Retorna todos os professores cadastrados, com suporte à paginação.
     *
     * @param page número da página.
     * @param size quantidade de elementos por página.
     * @return página de {@link TeacherResponseDTO}.
     */
    public Page<TeacherResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
        return teacherPage.map(TeacherResponseDTO::new);
    }

    /**
     * Retorna professores filtrados por nome, email ou curso, com suporte à paginação.
     *
     * @param name     filtro por nome (opcional).
     * @param email    filtro por email (opcional).
     * @param course   filtro por curso (opcional).
     * @param pageable objeto de paginação.
     * @return página de {@link TeacherResponseDTO} contendo os resultados filtrados.
     */
    public Page<TeacherResponseDTO> findAllTeachersSpecification(String name, String email, String course, Pageable pageable) {
        Specification<Teacher> filtros = where(null);
        if (name != null) filtros = filtros.and(TeacherSpecification.hasName(name));
        if (email != null) filtros = filtros.and(TeacherSpecification.hasEmail(email));
        if (course != null) filtros = filtros.and(TeacherSpecification.hasCourse(course));

        return teacherRepository.findAll(filtros, pageable).map(TeacherResponseDTO::new);
    }

}
