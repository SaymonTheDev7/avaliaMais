package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.model.user.PedagogicalAdvisor;
import net.weg.avaliaMais.repository.specification.*;
import net.weg.avaliaMais.repository.user.PedagogicalAdvisorRepository;
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

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors(Pageable pageable) {
        return pedagogicalAdvisorRepository.findAll(pageable).map(PedagogicalAdvisorResponseDTO::new);
    }


    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisorSpecification(String name, String email, Pageable pageable) {
        Specification<PedagogicalAdvisor> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasEmail(email));

        return pedagogicalAdvisorRepository.findAll(filtros, pageable).map(PedagogicalAdvisorResponseDTO::new);
    }

}