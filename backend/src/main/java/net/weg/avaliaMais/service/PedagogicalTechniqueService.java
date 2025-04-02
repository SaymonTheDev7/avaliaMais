package net.weg.avaliaMais.service;

import jakarta.persistence.EntityNotFoundException;
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

import java.time.LocalDate;
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
    private final SupervisorRepository supervisorRepository;
    private final EventRepository eventRepository;

    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique(PedagogicalTechniquePostRequestDTO dto) {
        return pedagogicalTechniqueRepository.save(dto.converter()).toDto();
    }

    public PedagogicalTechniqueResponseDTO updatePedagogicalTechnique(PedagogicalTechniquePostRequestDTO dto) {
        PedagogicalTechnique technique = pedagogicalTechniqueRepository.findByUsername(dto.username())
                .orElseThrow(() -> new EntityNotFoundException("Técnico pedagógico não encontrado"));

        technique.setPassword(dto.password());
        technique.setEmail(dto.email());
        technique.setWorkShift(dto.workShift());
        technique.setWorkloadWeek(dto.workloadWeek());
        return pedagogicalTechniqueRepository.save(technique).toDto();
    }

    public String deletePedagogicalTechniquePerUsername(String username) {
        return pedagogicalTechniqueRepository.findByUsername(username).map(technique -> {
            pedagogicalTechniqueRepository.delete(technique);
            return "Técnico Pedagógico deletado com sucesso";
        }).orElse("Técnico Pedagógico não encontrado");
    }

    public PedagogicalTechniqueResponseDTO findPedagogicalTechniquePerUsername(String username) {
        return pedagogicalTechniqueRepository.findByUsername(username)
                .map(PedagogicalTechnique::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Técnico Pedagógico não encontrado: " + username));
    }

    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        return pedagogicalTechniqueRepository.findAll(PageRequest.of(page, size)).map(PedagogicalTechniqueResponseDTO::new);
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors(int page, int size) {
        return pedagogicalAdvisorRepository.findAll(PageRequest.of(page, size)).map(PedagogicalAdvisorResponseDTO::new);
    }

    private <T> Specification<T> defaultSpecification() {
        return where(null);
    }

    public Page<PedagogicalTechniqueResponseDTO> findPedagogicalTechnique(String name, String email, Pageable pageable) {
        Specification<PedagogicalTechnique> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasEmail(email));

        return pedagogicalTechniqueRepository.findAll(filtros, pageable).map(PedagogicalTechniqueResponseDTO::new);
    }

}
