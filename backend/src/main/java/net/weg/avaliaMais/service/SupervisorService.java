package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.*;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.repository.*;
import net.weg.avaliaMais.repository.specification.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;
    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;
    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final ClassRepository classRepository;

    public SupervisorResponseDTO findPedagogicalAdvisorPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Coordenador/a pedagógico não encontrado com os dados: " + username + " " + email));
    }

    public SupervisorResponseDTO findPedagogicalTechniquePerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Técnico/a pedagógico não encontrado com os dados: " + username + " " + email));
    }

    public Page<SupervisorResponseDTO> findAllPedagogicalAdvisors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> pedagogicalAdvisorPage = supervisorRepository.findAll(pageable);
        return pedagogicalAdvisorPage.map(SupervisorResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> pedagogicalTechniquePage = supervisorRepository.findAll(pageable);
        return pedagogicalTechniquePage.map(SupervisorResponseDTO::new);
    }

    public SupervisorResponseDTO findTeacherPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com os dados: " + username + " " + email));
    }

    public Page<SupervisorResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> teacherPage = supervisorRepository.findAll(pageable);
        return teacherPage.map(SupervisorResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> studentPage = supervisorRepository.findAll(pageable);
        return studentPage.map(SupervisorResponseDTO::new);
    }

    public SupervisorResponseDTO findStudentPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com os dados: " + username + " " + email));
    }
    
    public SupervisorResponseDTO findSupervisorPerUsernameOrEmail(String username, String email) {
        return supervisorRepository.findByUsernameOrEmail(username, email)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado com os dados: " + username + " " + email));
    }

    public Page<SupervisorResponseDTO> findAllSupervisors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> supervisorPage = supervisorRepository.findAll(pageable);
        return supervisorPage.map(SupervisorResponseDTO::new);
    }

    public SupervisorResponseDTO findClassPerShift(String workShift) {
        return supervisorRepository.findByShift(workShift)
                .map(SupervisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + workShift));
    }


    public Page<SupervisorResponseDTO> findAllClasses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> classPage = supervisorRepository.findAll(pageable);
        return classPage.map(SupervisorResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supervisor> coursePage = supervisorRepository.findAll(pageable);
        return coursePage.map(SupervisorResponseDTO::new);
    }

    public Page<ClassResponseDTO> findClasses(Integer year, String course, String shift, String location, Pageable pageable) {
        Specification<ClassSchool> filtros = where(null);
        if (year != null) filtros = filtros.and(ClassSpecification.hasYear(year));
        if (course != null) filtros = filtros.and(ClassSpecification.hasCourse(course));
        if (shift != null) filtros = filtros.and(ClassSpecification.hasShift(shift));
        if (location != null) filtros = filtros.and(ClassSpecification.hasLocation(location));

        return classRepository.findAll(filtros, pageable).map(ClassResponseDTO::new);
    }

    public Page<PedagogicalAdvisorResponseDTO> findPedagogicalAdvisor(String name, String email, Pageable pageable) {
        Specification<PedagogicalAdvisor> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasEmail(email));

        return pedagogicalAdvisorRepository.findAll(filtros, pageable).map(PedagogicalAdvisorResponseDTO::new);
    }

    public Page<PedagogicalTechniqueResponseDTO> findPedagogicalTechnique(String name, String email, Pageable pageable) {
        Specification<PedagogicalTechnique> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasEmail(email));

        return pedagogicalTechniqueRepository.findAll(filtros, pageable).map(PedagogicalTechniqueResponseDTO::new);
    }

    public Page<TeacherResponseDTO> findTeachers(String name, String email, String course, Pageable pageable) {
        Specification<Teacher> filtros = where(null);
        if (name != null) filtros = filtros.and(TeacherSpecification.hasName(name));
        if (email != null) filtros = filtros.and(TeacherSpecification.hasEmail(email));
        if (course != null) filtros = filtros.and(TeacherSpecification.hasCourse(course));

        return teacherRepository.findAll(filtros, pageable).map(TeacherResponseDTO::new);
    }

    public Page<StudentResponseDTO> findStudents(String name, String email, UUID classUuid, String course, Pageable pageable) {
        Specification<Student> filtros = where(null);
        if (name != null) filtros = filtros.and(StudentSpecification.hasName(name));
        if (email != null) filtros = filtros.and(StudentSpecification.hasEmail(email));
        if (classUuid != null) filtros = filtros.and(StudentSpecification.hasClass(classUuid));
        if (course != null) filtros = filtros.and(StudentSpecification.hasCourse(course));

        return studentRepository.findAll(filtros, pageable).map(StudentResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findSupervisors(String name, String email, Pageable pageable) {
        Specification<Supervisor> filtros = where(null);
        if (name != null) filtros = filtros.and(SupervisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(SupervisorSpecification.hasEmail(email));

        return supervisorRepository.findAll(filtros, pageable).map(SupervisorResponseDTO::new);
    }

    public Page<CourseResponseDTO> findCourses(String name, String shift, String type, Pageable pageable) {
        Specification<Course> filtros = where(null);
        if (name != null && !name.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasName(name));
        if (shift != null && !shift.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasShift(shift));
        if (type != null && !type.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasType(type));

        return courseRepository.findAll(filtros, pageable).map(CourseResponseDTO::new);
    }
}
