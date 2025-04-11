package net.weg.avaliaMais.service.user;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.repository.specification.*;
import net.weg.avaliaMais.repository.user.PedagogicalTechniqueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class PedagogicalTechniqueService {

    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;
    private final AuthUserRepository authUserRepository;


    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique(PedagogicalTechniquePostRequestDTO dto) {
        PedagogicalTechnique pedagogicalTechnique = dto.converter(authUserRepository);
        PedagogicalTechnique savedPedagogicalTechnique = pedagogicalTechniqueRepository.save(pedagogicalTechnique);
        return savedPedagogicalTechnique.toDto();
    }




    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        return pedagogicalTechniqueRepository.findAll(PageRequest.of(page, size)).map(PedagogicalTechniqueResponseDTO::new);
    }

    private <T> Specification<T> defaultSpecification() {
        return where(null);
    }

    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniqueSpecification(String name, String email, Pageable pageable) {
        Specification<PedagogicalTechnique> filtros = where(null);
        if (name != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasName(name));
        if (email != null) filtros = filtros.and(PedagogicalTechniqueSpecification.hasEmail(email));

        return pedagogicalTechniqueRepository.findAll(filtros, pageable).map(PedagogicalTechniqueResponseDTO::new);
    }

}
