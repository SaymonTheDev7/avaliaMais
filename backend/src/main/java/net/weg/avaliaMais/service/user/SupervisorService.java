package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.SupervisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;
import net.weg.avaliaMais.model.user.Supervisor;
import net.weg.avaliaMais.repository.specification.SupervisorSpecification;
import net.weg.avaliaMais.repository.user.SupervisorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.Specification.where;

/**
 * Serviço responsável pela lógica de negócios relacionada à entidade {@link Supervisor}.
 * Permite operações de cadastro e consulta com ou sem filtros.
 */
@Service
@RequiredArgsConstructor
public class SupervisorService {

    /** Repositório para acesso aos dados de supervisores. */
    private final SupervisorRepository supervisorRepository;

    /**
     * Adiciona um novo supervisor ao sistema com base nos dados do DTO recebido.
     *
     * @param dto objeto com os dados do supervisor.
     * @return {@link SupervisorResponseDTO} com os dados do supervisor salvo.
     */
    public SupervisorResponseDTO addSupervisor(SupervisorPostRequestDTO dto) {
        Supervisor supervisor = dto.converter();
        supervisor = supervisorRepository.save(supervisor);
        return supervisor.toDto();
    }

    /**
     * Retorna todos os supervisores cadastrados de forma paginada.
     *
     * @param page número da página.
     * @param size tamanho da página.
     * @return página de {@link SupervisorResponseDTO}.
     */
    public Page<SupervisorResponseDTO> findAllSupervisors(int page, int size) {
        Page<Supervisor> supervisorPage = supervisorRepository.findAll(PageRequest.of(page, size));
        return supervisorPage.map(SupervisorResponseDTO::new);
    }

    /**
     * Retorna todos os supervisores filtrados por nome e/ou email, com paginação.
     *
     * @param name     filtro por nome (opcional).
     * @param email    filtro por email (opcional).
     * @param pageable objeto de paginação.
     * @return página de {@link SupervisorResponseDTO} com os resultados filtrados.
     */
    public Page<SupervisorResponseDTO> findAllSupervisorsSpecification(String name, String email, Pageable pageable) {
        Specification<Supervisor> filtros = where(null);
        if (name != null) filtros = filtros.and(SupervisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(SupervisorSpecification.hasEmail(email));

        return supervisorRepository.findAll(filtros, pageable).map(SupervisorResponseDTO::new);
    }

    /**
     * Retorna uma especificação padrão vazia.
     *
     * @param <T> tipo da entidade.
     * @return especificação nula.
     */
    private <T> Specification<T> defaultSpecification() {
        return where(null);
    }
}
