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

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;

    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO teacherPostRequestDTO) {
        List<ClassSchool> allClasses =classRepository.findAll();
        Teacher teacherSave = teacherPostRequestDTO.converter(allClasses);
        if (teacherSave.getClassIds() == null) {
            teacherSave.setClassIds(List.of());
        }
        teacherSave = teacherRepository.save(teacherSave);
        return teacherSave.toDto();
    }

    @Transactional
    public void deleteTeacherByUUID(UUID uuid) {
        if (!teacherRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Teacher not found");
        }
        teacherRepository.deleteByUuid(uuid);
    }
    public Page<TeacherResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
        return teacherPage.map(TeacherResponseDTO::new);
    }

    public Page<TeacherResponseDTO> findAllTeachersSpecification(String name, String email, String course, Pageable pageable) {
        Specification<Teacher> filtros = where(null);
        if (name != null) filtros = filtros.and(TeacherSpecification.hasName(name));
        if (email != null) filtros = filtros.and(TeacherSpecification.hasEmail(email));
        if (course != null) filtros = filtros.and(TeacherSpecification.hasCourse(course));

        return teacherRepository.findAll(filtros, pageable).map(TeacherResponseDTO::new);
    }

}
