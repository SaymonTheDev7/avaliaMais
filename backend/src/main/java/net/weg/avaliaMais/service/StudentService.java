package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;

    public StudentResponseDTO addStudent(StudentPostRequestDTO studentPostRequestDTO) {
        List<Course> allCourses = courseRepository.findAll();
        Course currentCourse = allCourses.stream().filter(course -> course.getUuid().equals(studentPostRequestDTO.currentCourseId())).findFirst().orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        if (studentRepository.existsByEmail(studentPostRequestDTO.email())) {
            throw new RuntimeException("Já existe um aluno com este e-mail");
        }
        List<ClassSchool> allClasses = classRepository.findAll();
        Student studentSave = studentPostRequestDTO.converter(allClasses, allCourses);
        studentSave.setClassIds(List.of());
        studentSave = studentRepository.save(studentSave);
        return studentSave.toDto();
    }



    public StudentResponseDTO updateStudentPerName(StudentPostRequestDTO studentPostRequestDTO) {
        Student existingStudent = studentRepository.findByUsername(studentPostRequestDTO.username()).orElseThrow(() -> new RuntimeException("Student not found"));
        if (!courseRepository.existsById(studentPostRequestDTO.currentCourseId())) {
            throw new RuntimeException("Course not found");
        }
        List<ClassSchool> allClasses = classRepository.findAll();
        List<ClassSchool> classList = allClasses.stream().filter(classSchool -> studentPostRequestDTO.classIds().contains(classSchool.getUuid())).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        existingStudent.setClassIds(classList);
        existingStudent.setWorkloadWeek(studentPostRequestDTO.workloadWeek());
        existingStudent.setWorkShift(studentPostRequestDTO.workShift());
        Student updatedStudent = studentRepository.save(existingStudent);
        return updatedStudent.toDto();
    }

    public void deleteStudentByUUID(UUID uuid) {
        if (!studentRepository.existsByUuid(uuid)) {
            throw new RuntimeException("Student not found");
        }
        studentRepository.deleteByUuid(uuid);
    }

    public StudentResponseDTO findStudentByUsername(String username) {
        return studentRepository.findByUsername(username).map(StudentResponseDTO::new).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Page<StudentResponseDTO> findAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.map(StudentResponseDTO::new);
    }
}
