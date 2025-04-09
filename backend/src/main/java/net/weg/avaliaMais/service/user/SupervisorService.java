package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.SupervisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.model.user.Supervisor;
import net.weg.avaliaMais.repository.specification.*;
import net.weg.avaliaMais.repository.user.SupervisorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;


    public SupervisorResponseDTO addSupervisor(SupervisorPostRequestDTO dto) {
        Supervisor supervisor = dto.converter();
        supervisor = supervisorRepository.save(supervisor);
        return supervisor.toDto();
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
