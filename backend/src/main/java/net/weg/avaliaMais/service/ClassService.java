package net.weg.avaliaMais.service;

import jakarta.transaction.Transactional;
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
import net.weg.avaliaMais.repository.specification.ClassSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassService {

    private final ClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public ClassResponseDTO addClass(ClassPostRequestDTO classPostRequestDTO) {
        List<Course> allCourses = courseRepository.findAll();
        List<Student> allStudents = studentRepository.findAll();
        List<Teacher> allTeachers = teacherRepository.findAll();

        // Verificar se o curso existe
        Course course = allCourses.stream()
                .filter(c -> c.getUuid().equals(classPostRequestDTO.courseUuid()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        // Verificar se os alunos existem
        List<Student> studentsList = classPostRequestDTO.studentIds().stream()
                .map(studentId -> allStudents.stream()
                        .filter(s -> s.getUuid().equals(studentId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + studentId)))
                .toList();

        // Verificar se os professores existem
        List<Teacher> teachersList = classPostRequestDTO.teacherIds().stream()
                .map(teacherId -> allTeachers.stream()
                        .filter(t -> t.getUuid().equals(teacherId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + teacherId)))
                .toList();

        // Converte e salva a classe
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

    public Page<ClassResponseDTO> findClassPerYear(Integer year, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasYear(year);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassPerLocation(String location, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasLocation(location);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassesByCourse(String nameCourse, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasCourse(nameCourse);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClassPerShift(String shift, Pageable pageable) {
        Specification<ClassSchool> spec = ClassSpecification.hasShift(shift);
        return classRepository.findAll(spec, pageable).map(ClassResponseDTO::new);
    }

    public Page<ClassResponseDTO> getByAdvancedFiltration(Integer year, String location, String course, String shift, Pageable pageable) {
        Specification<ClassSchool> filtros = where(null);

        if (year != null) {
            filtros = filtros.and(ClassSpecification.hasYear(year));
        }
        if (location != null && !location.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasLocation(location));
        }
        if (course != null && !course.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasCourse(course));
        }
        if (shift != null && !shift.isEmpty()) {
            filtros = filtros.and(ClassSpecification.hasShift(shift));
        }

        return classRepository.findAll(filtros, pageable).map(ClassResponseDTO::new);
    }

}
