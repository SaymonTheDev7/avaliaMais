package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.model.user.PedagogicalAdvisor;
import net.weg.avaliaMais.repository.specification.PedagogicalAdvisorSpecification;
import net.weg.avaliaMais.repository.user.PedagogicalAdvisorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.Specification.where;

/**
 * Serviço responsável por operações relacionadas ao usuário do tipo {@link PedagogicalAdvisor}.
 * Inclui funcionalidades de cadastro e busca com ou sem filtros.
 */
@Service
@RequiredArgsConstructor
public class PedagogicalAdvisorService {

    /** Repositório para persistência e consulta de orientadores pedagógicos. */
    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;

    /**
     * Adiciona um novo orientador pedagógico ao sistema.
     *
     * @param dto objeto {@link PedagogicalAdvisorPostRequestDTO} contendo os dados do novo orientador.
     * @return um {@link PedagogicalAdvisorResponseDTO} representando o orientador salvo.
     */
    public PedagogicalAdvisorResponseDTO addPedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO dto) {
        PedagogicalAdvisor savedAdvisor = pedagogicalAdvisorRepository.save(dto.converter());
        return savedAdvisor.toDto();
    }

    /**
     * Retorna todos os orientadores pedagógicos de forma paginada, sem filtros.
     *
     * @param pageable objeto {@link Pageable} contendo informações de paginação.
     * @return uma página de {@link PedagogicalAdvisorResponseDTO}.
     */
    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors(Pageable pageable) {
        return pedagogicalAdvisorRepository.findAll(pageable).map(PedagogicalAdvisorResponseDTO::new);
    }

    /**
     * Retorna os orientadores pedagógicos de forma paginada, com filtros opcionais por nome e e-mail.
     *
     * @param name     filtro opcional para o nome.
     * @param email    filtro opcional para o e-mail.
     * @param pageable objeto {@link Pageable} contendo informações de paginação.
     * @return uma página de {@link PedagogicalAdvisorResponseDTO} com os resultados filtrados.
     */
    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisorSpecification(String name, String email, Pageable pageable) {
        Specification<PedagogicalAdvisor> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalAdvisorSpecification.hasEmail(email));

        return pedagogicalAdvisorRepository.findAll(filtros, pageable).map(PedagogicalAdvisorResponseDTO::new);
    }
}
