package net.weg.avaliaMais.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.*;
import net.weg.avaliaMais.model.dto.request.SupervisorPostRequestDTO;
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
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;


    public SupervisorResponseDTO addSupervisor(SupervisorPostRequestDTO dto) {
        return supervisorRepository.save(dto.converter()).toDto();
    }

    public SupervisorResponseDTO updateSupervisor(SupervisorPostRequestDTO dto) {
        Supervisor supervisor = supervisorRepository.findByUsername(dto.username())
                .orElseThrow(() -> new EntityNotFoundException("Supervisor não encontrado"));

        supervisor.setPassword(dto.password());
        supervisor.setEmail(dto.email());
        supervisor.setWorkShift(dto.workShift());
        supervisor.setWorkloadWeek(dto.workloadWeek());
        return supervisorRepository.save(supervisor).toDto();
    }

    public String deleteSupervisorPerUsername(String username) {
        return supervisorRepository.findByUsername(username).map(supervisor -> {
            supervisorRepository.delete(supervisor);
            return "Supervisor deletado com sucesso";
        }).orElse("Supervisor não encontrado");
    }

    public SupervisorResponseDTO findSupervisorPerUsername(String username) {
        return supervisorRepository.findByUsername(username)
                .map(Supervisor::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Supervisor não encontrado: " + username));
    }


    private <T> Specification<T> defaultSpecification() {
        return where(null);
    }

    public Page<SupervisorResponseDTO> findAllSupervisors(int page, int size) {
        Page<Supervisor> supervisorPage = supervisorRepository.findAll(PageRequest.of(page, size));
        return supervisorPage.map(SupervisorResponseDTO::new);
    }

    public Page<SupervisorResponseDTO> findAllSupervisorsSpecification(String name, String email, Pageable pageable) {
        Specification<Supervisor> filtros = where(null);
        if (name != null) filtros = filtros.and(SupervisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(SupervisorSpecification.hasEmail(email));

        return supervisorRepository.findAll(filtros, pageable).map(SupervisorResponseDTO::new);
    }

}
