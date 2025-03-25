package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.*;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
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
public class PedagogicalTechniqueService {

    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;
    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final ClassRepository classRepository;

    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique(PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechnique pedagogicalTechnique = pedagogicalTechniqueRepository.save(pedagogicalTechniquePostRequestDTO.converter());
        return pedagogicalTechnique.toDto();
    }

    public PedagogicalTechniqueResponseDTO updatePedagogicalTechnique(PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechnique existingPedagogicalTechnique = pedagogicalTechniqueRepository.findByUsername(pedagogicalTechniquePostRequestDTO.username()).orElseThrow(() -> new RuntimeException("Técnico pedagógico não encontrado"));
        existingPedagogicalTechnique.setPassword(pedagogicalTechniquePostRequestDTO.password());
        existingPedagogicalTechnique.setEmail(pedagogicalTechniquePostRequestDTO.email());
        existingPedagogicalTechnique.setWorkShift(pedagogicalTechniquePostRequestDTO.workShift());
        existingPedagogicalTechnique.setWorkloadWeek(pedagogicalTechniquePostRequestDTO.workloadWeek());
        PedagogicalTechnique updatedPedagogicalTechnique = pedagogicalTechniqueRepository.save(existingPedagogicalTechnique);
        return updatedPedagogicalTechnique.toDto();
    }


    public String deletePedagogicalTechniquePerUsername(String username) {
        if (pedagogicalTechniqueRepository.findByUsername(username).isPresent()) {
            pedagogicalTechniqueRepository.delete(pedagogicalTechniqueRepository.findByUsername(username).get());
            return "Técnico Pedagógico deletado com sucesso";
        }
        return "Técnico Pedagógico não encontrado";
    }

    public PedagogicalTechniqueResponseDTO findPedagogicalTechniquePerUsername(String username) {
        PedagogicalTechnique pedagogicalTechnique = pedagogicalTechniqueRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Técnico Pedagógico nao encontrado: " + username));
        return new PedagogicalTechniqueResponseDTO(pedagogicalTechnique);
    }

    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalTechnique> pedagogicalTechniquePage = pedagogicalTechniqueRepository.findAll(pageable);
        return pedagogicalTechniquePage.map(PedagogicalTechniqueResponseDTO::new);
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors (int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> pedagogicalAdvisorPage = pedagogicalAdvisorRepository.findAll(pageable);
        return pedagogicalAdvisorPage.map(PedagogicalAdvisorResponseDTO::new);
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
        if (name != null) filtros = filtros.and(CourseSpecification.hasName(name));
        if (shift != null) filtros = filtros.and(CourseSpecification.hasShift(shift));
        if (type != null) filtros = filtros.and(CourseSpecification.hasType(type));

        return courseRepository.findAll(filtros, pageable).map(CourseResponseDTO::new);
    }
}
