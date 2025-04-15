package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.repository.specification.PedagogicalTechniqueSpecification;
import net.weg.avaliaMais.repository.user.PedagogicalTechniqueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.Specification.where;

/**
 * Serviço responsável pelas operações relacionadas à entidade {@link PedagogicalTechnique}.
 * Inclui funcionalidades de cadastro, listagem e busca com filtros dinâmicos.
 */
@Service
@RequiredArgsConstructor
public class PedagogicalTechniqueService {

    /** Repositório para acesso aos dados das técnicas pedagógicas. */
    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;

    /** Repositório de usuários utilizado para associar a técnica a um usuário existente. */
    private final AuthUserRepository authUserRepository;

    /**
     * Cadastra uma nova técnica pedagógica no sistema.
     *
     * @param dto objeto {@link PedagogicalTechniquePostRequestDTO} com os dados da técnica.
     * @return um {@link PedagogicalTechniqueResponseDTO} com os dados da técnica salva.
     */
    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique(PedagogicalTechniquePostRequestDTO dto) {
        PedagogicalTechnique pedagogicalTechnique = dto.converter(authUserRepository);
        PedagogicalTechnique savedPedagogicalTechnique = pedagogicalTechniqueRepository.save(pedagogicalTechnique);
        return savedPedagogicalTechnique.toDto();
    }

    /**
     * Lista todas as técnicas pedagógicas de forma paginada.
     *
     * @param page número da página (inicia em 0).
     * @param size tamanho da página.
     * @return uma página de {@link PedagogicalTechniqueResponseDTO}.
     */
    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        return pedagogicalTechniqueRepository.findAll(PageRequest.of(page, size)).map(PedagogicalTechniqueResponseDTO::new);
    }

    /**
     * Cria uma especificação padrão nula, usada como base para compor filtros dinâmicos.
     *
     * @return uma especificação vazia.
     */
    private <T> Specification<T> defaultSpecification() {
        return where(null);
    }

    /**
     * Retorna as técnicas pedagógicas de forma paginada, com filtros opcionais por nome e e-mail do autor.
     *
     * @param name     filtro opcional para o nome.
     * @param email    filtro opcional para o e-mail.
     * @param pageable objeto {@link Pageable} com as configurações de paginação.
     * @return uma página de {@link PedagogicalTechniqueResponseDTO} filtrada.
     */
    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniqueSpecification(String name, String email, Pageable pageable) {
        Specification<PedagogicalTechnique> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasEmail(email));

        return pedagogicalTechniqueRepository.findAll(filtros, pageable).map(PedagogicalTechniqueResponseDTO::new);
    }
}
