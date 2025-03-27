package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.*;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
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
public class PedagogicalAdvisorService {

    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;
    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final ClassRepository classRepository;
    private final SupervisorRepository supervisorRepository;

    public PedagogicalAdvisorResponseDTO addPedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisor pedagogicalAdvisorSave = pedagogicalAdvisorRepository.save(pedagogicalAdvisorPostRequestDTO.converter());
        return pedagogicalAdvisorSave.toDto();
    }

    public PedagogicalAdvisorResponseDTO updatePedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisor existingPedagogicalAdvisor = pedagogicalAdvisorRepository.findByUsername(pedagogicalAdvisorPostRequestDTO.username()).orElseThrow(() -> new RuntimeException("Orientador não encontrado"));
        existingPedagogicalAdvisor.setPassword(pedagogicalAdvisorPostRequestDTO.password());
        existingPedagogicalAdvisor.setEmail(pedagogicalAdvisorPostRequestDTO.email());
        existingPedagogicalAdvisor.setWorkShift(pedagogicalAdvisorPostRequestDTO.workShift());
        existingPedagogicalAdvisor.setWorkloadWeek(pedagogicalAdvisorPostRequestDTO.workloadWeek());
        PedagogicalAdvisor updatedPedagogicalAdvisor = pedagogicalAdvisorRepository.save(existingPedagogicalAdvisor);
        return updatedPedagogicalAdvisor.toDto();
    }

    public String deletePedagogicalAdvisorPerUsername (String username) {
        if (pedagogicalAdvisorRepository.findByUsername(username).isPresent()) {
            pedagogicalAdvisorRepository.delete(pedagogicalAdvisorRepository.findByUsername(username).get());
            return "Orientador deletado com sucesso";
        }
        return "Orientador não encontrado";
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors (int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> pedagogicalAdvisorPage = pedagogicalAdvisorRepository.findAll(pageable);
        return pedagogicalAdvisorPage.map(PedagogicalAdvisorResponseDTO::new);
    }

    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalTechnique> pedagogicalTechniquePage = pedagogicalTechniqueRepository.findAll(pageable);
        return pedagogicalTechniquePage.map(PedagogicalTechniqueResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findPedagogicalAdvisorPerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Coordenador/a pedagógico não encontrado com os dados: " + username + " " + email));
    }

    public PedagogicalAdvisorResponseDTO findPedagogicalTechniquePerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Técnico/a pedagógico não encontrado com os dados: " + username + " " + email));
    }

    public PedagogicalAdvisorResponseDTO findTeacherPerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com os dados: " + username + " " + email));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> teacherPage = pedagogicalAdvisorRepository.findAll(pageable);
        return teacherPage.map(PedagogicalAdvisorResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findStudentPerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com os dados: " + username + " " + email));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> studentPage = pedagogicalAdvisorRepository.findAll(pageable);
        return studentPage.map(PedagogicalAdvisorResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findSupervisorPerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado com os dados: " + username + " " + email));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllSupervisors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> supervisorPage = pedagogicalAdvisorRepository.findAll(pageable);
        return supervisorPage.map(PedagogicalAdvisorResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findClassPerName(String nameClass) {
        return pedagogicalAdvisorRepository.findByNameClass(nameClass)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + nameClass));
    }

    public PedagogicalAdvisorResponseDTO findClassPerYear(Integer year) {
        return pedagogicalAdvisorRepository.findByYear(year)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + year));
    }

    public PedagogicalAdvisorResponseDTO findClassPerLocation(String location) {
        return pedagogicalAdvisorRepository.findByLocation(location)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + location));
    }

    public PedagogicalAdvisorResponseDTO findClassPerShift(String shift) {
        return pedagogicalAdvisorRepository.findByShift(shift)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com os dados: " + shift));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllClasses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> classPage = pedagogicalAdvisorRepository.findAll(pageable);
        return classPage.map(PedagogicalAdvisorResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findCoursePerName(String nameCourse) {
        return pedagogicalAdvisorRepository.findByNameCourse(nameCourse)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com os dados: " + nameCourse));
    }

    public PedagogicalAdvisorResponseDTO findCoursePerType(String typeCourse) {
        return pedagogicalAdvisorRepository.findByTypeCourse(typeCourse)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com os dados: " + typeCourse));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> coursePage = pedagogicalAdvisorRepository.findAll(pageable);
        return coursePage.map(PedagogicalAdvisorResponseDTO::new);
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

    public Page<CourseResponseDTO> findCourses(String name, String shift, String type, Pageable pageable) {
        Specification<Course> filtros = where(null);
        if (name != null && !name.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasName(name));
        if (shift != null && !shift.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasShift(shift));
        if (type != null && !type.trim().isEmpty()) filtros = filtros.and(CourseSpecification.hasType(type));

        return courseRepository.findAll(filtros, pageable).map(CourseResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findSupervisors(String name, String email, Pageable pageable) {
        Specification<Supervisor> filtros = where(null);
        if (name != null) filtros = filtros.and(SupervisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(SupervisorSpecification.hasEmail(email));

        return supervisorRepository.findAll(filtros, pageable).map(SupervisorResponseDTO::new);
    }
}
