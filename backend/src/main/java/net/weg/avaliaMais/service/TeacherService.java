package net.weg.avaliaMais.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.TeacherRepository;
import net.weg.avaliaMais.repository.specification.TeacherSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public TeacherResponseDTO updateTeacherPerName(TeacherPostRequestDTO teacherPostRequestDTO) {
        Teacher existingTeacher = teacherRepository.findByUsername(teacherPostRequestDTO.username())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        existingTeacher.setWorkShift(teacherPostRequestDTO.workShift());
        existingTeacher.setWorkloadWeek(teacherPostRequestDTO.workloadWeek());
        existingTeacher.setProfessionalArea(teacherPostRequestDTO.professionalArea());
        if (teacherPostRequestDTO.classIds() != null) {
            List<ClassSchool> allClasses = classRepository.findAll();
            existingTeacher.setClassIds(new ArrayList<>(allClasses.stream()
                    .filter(classSchool -> teacherPostRequestDTO.classIds().contains(classSchool.getUuid()))
                    .toList()));
        }
        Teacher updatedTeacher = teacherRepository.save(existingTeacher);
        return updatedTeacher.toDto();
    }


    @Transactional
    public void deleteTeacherByUUID(UUID uuid) {
        if (!teacherRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Teacher not found");
        }
        teacherRepository.deleteByUuid(uuid);
    }

    public TeacherResponseDTO findTeacherByUsername(String username) {
        return teacherRepository.findByUsername(username)
                .map(TeacherResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
    }

    public Page<TeacherResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
        return teacherPage.map(TeacherResponseDTO::new);
    }

    public Page<ClassResponseDTO> findAllClasses(int page, int size) {
        Page<ClassSchool> classPage = classRepository.findAll(PageRequest.of(page, size));
        return classPage.map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassPerYear(Integer year, Pageable pageable) {
        Specification<ClassSchool> spec = TeacherSpecification.hasYear(year);
        return teacherRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassPerLocation(String location, Pageable pageable) {
        Specification<ClassSchool> spec = TeacherSpecification.hasLocation(location);
        return teacherRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassesByCourse(String nameCourse, Pageable pageable) {
        Specification<ClassSchool> spec = TeacherSpecification.hasCourse(nameCourse);
        return teacherRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassPerShift(String shift, Pageable pageable) {
        Specification<ClassSchool> spec = TeacherSpecification.hasShift(shift);
        return teacherRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> getByAdvancedFiltration(Integer year, String location, String course, String shift, Pageable pageable) {
        Specification<ClassSchool> filtros = where(null);

        if (year != null) {
            filtros = filtros.and(TeacherSpecification.hasYear(year));
        }
        if (location != null && !location.isEmpty()) {
            filtros = filtros.and(TeacherSpecification.hasLocation(location));
        }
        if (course != null && !course.isEmpty()) {
            filtros = filtros.and(TeacherSpecification.hasCourse(course));
        }
        if (shift != null && !shift.isEmpty()) {
            filtros = filtros.and(TeacherSpecification.hasShift(shift));
        }

        return teacherRepository.findAll(filtros, pageable).map(ClassResponseDTO::new);
    }
}
