package net.weg.avaliaMais.service.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.TeacherUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.model.user.Teacher;
import net.weg.avaliaMais.repository.user.TeacherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final AuthUserRepository authUserRepository;

    /**
     * Adiciona um novo professor ao sistema.
     */
    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO dto) {
        AuthUser authUser = authUserRepository.findById(dto.authUserUuid())
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado"));

        Teacher teacher = dto.toEntity(authUser);
        teacher = teacherRepository.save(teacher);

        return new TeacherResponseDTO(teacher);
    }

    /**
     * Atualiza os dados de um professor existente.
     */
    @Transactional
    public TeacherResponseDTO updateTeacher(UUID uuid, TeacherUpdateRequestDTO dto) {
        Teacher teacher = teacherRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        if (dto.email() != null) teacher.setEmail(dto.email());
        if (dto.workShift() != null) teacher.setWorkShift(dto.workShift());
        if (dto.workloadWeek() != null) teacher.setWorkloadWeek(dto.workloadWeek());
        if (dto.professionalArea() != null) teacher.setProfessionalArea(dto.professionalArea());

        if (dto.authUserUuid() != null) {
            AuthUser authUser = authUserRepository.findById(dto.authUserUuid())
                    .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado"));
            teacher.setAuthUser(authUser);
        }

        teacher = teacherRepository.save(teacher);
        return new TeacherResponseDTO(teacher);
    }

    /**
     * Remove um professor com base em seu UUID.
     */
    @Transactional
    public void deleteTeacherByUUID(UUID uuid) {
        if (!teacherRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Professor não encontrado");
        }
        teacherRepository.deleteByUuid(uuid);
    }

    /**
     * Busca um professor específico pelo UUID.
     */
    public TeacherResponseDTO findByUuid(UUID uuid) {
        return teacherRepository.findById(uuid)
                .map(TeacherResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
    }

    /**
     * Lista todos os professores com paginação.
     */
    public Page<TeacherResponseDTO> findAllTeachers(int page, int size) {
        if (page < 0) page = 0;
        if (size > 50) size = 50;
        Pageable pageable = PageRequest.of(page, size);
        return teacherRepository.findAll(pageable).map(TeacherResponseDTO::new);
    }
}
