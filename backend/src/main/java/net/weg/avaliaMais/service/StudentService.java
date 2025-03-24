package net.weg.avaliaMais.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import net.weg.avaliaMais.repository.specification.StudentSpecification;
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
public class StudentService {

    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;

    public StudentResponseDTO addStudent(StudentPostRequestDTO studentPostRequestDTO) {
        List<ClassSchool> allClasses = classRepository.findAll();
        Student studentSave = studentPostRequestDTO.converter(allClasses);
        if (studentSave.getClassIds() == null) {
            studentSave.setClassIds(List.of());
        }
        studentSave = studentRepository.save(studentSave);
        return studentSave.toDto();
    }

    public StudentResponseDTO updateStudentPerName(StudentPostRequestDTO studentPostRequestDTO) {
        Student existingStudent = studentRepository.findByUsername(studentPostRequestDTO.username())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        existingStudent.setWorkShift(studentPostRequestDTO.workShift());
        existingStudent.setWorkloadWeek(studentPostRequestDTO.workloadWeek());
        if (studentPostRequestDTO.classIds() != null) {
            List<ClassSchool> allClasses = classRepository.findAll();
            existingStudent.setClassIds(new ArrayList<>(allClasses.stream()
                    .filter(classSchool -> studentPostRequestDTO.classIds().contains(classSchool.getUuid()))
                    .toList()));
        }
        Student updatedStudent = studentRepository.save(existingStudent);
        return updatedStudent.toDto();
    }

    @Transactional
    public void deleteStudentByUUID(UUID uuid) {
        if (!studentRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Student not found");
        }
        studentRepository.deleteByUuid(uuid);
    }

    public StudentResponseDTO findStudentByUsername(String username) {
        return studentRepository.findByUsername(username)
                .map(StudentResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Page<StudentResponseDTO> findAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.map(StudentResponseDTO::new);
    }
}