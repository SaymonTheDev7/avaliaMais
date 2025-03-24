package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.Student;
import net.weg.avaliaMais.model.Teacher;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.ClassUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.repository.ClassRepository;
import net.weg.avaliaMais.repository.CourseRepository;
import net.weg.avaliaMais.repository.StudentRepository;
import net.weg.avaliaMais.repository.TeacherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

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

    public ClassResponseDTO updateClass(ClassUpdateRequestDTO classUpdateRequestDTO) {
        ClassSchool classSchoolToUpdate = classRepository.findById(classUpdateRequestDTO.classUuid())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        classSchoolToUpdate.setNameClass(classUpdateRequestDTO.nameClass());
        classSchoolToUpdate.setWorkloadClass(classUpdateRequestDTO.workloadClass());
        classSchoolToUpdate.setTime(classUpdateRequestDTO.time());
        classSchoolToUpdate.setQuantityStudents(classUpdateRequestDTO.quantityStudents());
        classSchoolToUpdate.setShift(classUpdateRequestDTO.shift());

        List<Student> updatedStudents = studentRepository.findAll().stream()
                .filter(student -> classUpdateRequestDTO.studentIds().contains(student.getUuid()))
                .toList();
        classSchoolToUpdate.setStudents(updatedStudents);

        classSchoolToUpdate = classRepository.save(classSchoolToUpdate);
        return classSchoolToUpdate.toDto();
    }

    public void deleteClassPerName(String nameClass) {
        if (classRepository.findByNameClass(nameClass).isEmpty())
            throw new RuntimeException("Turma não encontrada");
        classRepository.deleteByNameClass(nameClass);
    }

    public ClassResponseDTO findClassPerName(String nameClass) {
        return classRepository.findByNameClass(nameClass).map(ClassResponseDTO::new).orElseThrow(() -> new RuntimeException("Turma não encontrada"));
    }

    public Page<ClassResponseDTO> findAllClasses(int page, int size) {
        Page<ClassSchool> classPage = classRepository.findAll(PageRequest.of(page, size));
        return classPage.map(ClassResponseDTO::new);
    }
}
