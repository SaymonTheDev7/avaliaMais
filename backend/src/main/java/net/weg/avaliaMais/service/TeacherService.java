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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
        return teacherRepository.findByUsername(username).map(TeacherResponseDTO::new).orElseThrow(() -> new RuntimeException("Teacher not found"));
    }

    public Page<TeacherResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
        return teacherPage.map(TeacherResponseDTO::new);
    }

}
