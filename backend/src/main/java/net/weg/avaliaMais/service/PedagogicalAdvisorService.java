package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.*;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.repository.*;
import net.weg.avaliaMais.repository.specification.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class PedagogicalAdvisorService {

    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;

    public PedagogicalAdvisorResponseDTO addPedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO dto) {
        PedagogicalAdvisor savedAdvisor = pedagogicalAdvisorRepository.save(dto.converter());
        return savedAdvisor.toDto();
    }

    public PedagogicalAdvisorResponseDTO updatePedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO dto) {
        PedagogicalAdvisor advisor = pedagogicalAdvisorRepository.findByUsername(dto.username())
                .orElseThrow(() -> new RuntimeException("Orientador não encontrado"));
        advisor.setPassword(dto.password());
        advisor.setEmail(dto.email());
        advisor.setWorkShift(dto.workShift());
        advisor.setWorkloadWeek(dto.workloadWeek());
        return pedagogicalAdvisorRepository.save(advisor).toDto();
    }

    public String deletePedagogicalAdvisorPerUsername(String username) {
        return pedagogicalAdvisorRepository.findByUsername(username).map(advisor -> {
            pedagogicalAdvisorRepository.delete(advisor);
            return "Orientador deletado com sucesso";
        }).orElse("Orientador não encontrado");
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors(Pageable pageable) {
        return pedagogicalAdvisorRepository.findAll(pageable).map(PedagogicalAdvisorResponseDTO::new);
    }

    public PedagogicalAdvisorResponseDTO findPedagogicalAdvisorPerUsernameOrEmail(String username, String email) {
        return pedagogicalAdvisorRepository.findByUsernameOrEmail(username, email)
                .map(PedagogicalAdvisorResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Orientador não encontrado"));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisorSpecification(String name, String email, Pageable pageable) {
        Specification<PedagogicalAdvisor> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasEmail(email));

        return pedagogicalAdvisorRepository.findAll(filtros, pageable).map(PedagogicalAdvisorResponseDTO::new);
    }

}