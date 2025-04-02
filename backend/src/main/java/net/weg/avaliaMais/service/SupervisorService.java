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

import java.time.LocalDate;
import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;

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
