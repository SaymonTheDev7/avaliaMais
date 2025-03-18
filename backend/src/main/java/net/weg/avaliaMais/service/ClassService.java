package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import net.weg.avaliaMais.repository.TeacherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public ClassResponseDTO addClass(ClassPostRequestDTO classPostRequestDTO) {
        List<Course> allCourses = courseRepository.findAll();
        List<Student> allStudents = studentRepository.findAll();
        List<Teacher> allTeachers = teacherRepository.findAll();
        ClassSchool classSchoolSave = classPostRequestDTO.converter(allCourses, allStudents, allTeachers);
        classSchoolSave = classRepository.save(classSchoolSave);
        return classSchoolSave.toDto();
    }

    public ClassResponseDTO updateClass(ClassPostRequestDTO classPostRequestDTO) {
        ClassSchool classSchoolToUpdate = classRepository.findById(classPostRequestDTO.courseUuid())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        classSchoolToUpdate.setNameClass(classPostRequestDTO.nameClass());
        classSchoolToUpdate.setQuantityStudents(classPostRequestDTO.quantityStudents());
        classSchoolToUpdate.setShift(classPostRequestDTO.shift());
        classSchoolToUpdate.setTime(classPostRequestDTO.time());
        List<Student> updatedStudents = studentRepository.findAll().stream()
                .filter(student -> classPostRequestDTO.studentIds().contains(student.getUuid()))
                .toList();
        classSchoolToUpdate.setStudents(updatedStudents);
        classSchoolToUpdate = classRepository.save(classSchoolToUpdate);
        return classSchoolToUpdate.toDto();
    }

    public void deleteClassPerName(String nameClass) {
        if (classRepository.findByNameClass(nameClass).isEmpty()) throw new RuntimeException("Class not found");
        classRepository.deleteByNameClass(nameClass);
    }

    public ClassResponseDTO findClassPerName(String nameClass) {
        return classRepository.findByNameClass(nameClass).map(ClassResponseDTO::new).orElseThrow(() -> new RuntimeException("Class not found"));
    }



    public Page<ClassResponseDTO> findAllClasses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClassSchool> classPage = classRepository.findAll(pageable);
        return classPage.map(ClassResponseDTO::new);
    }
}
