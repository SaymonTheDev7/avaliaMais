package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.repository.PedagogicalTechniqueRepository;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class PedagogicalTechniqueService {

    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;

    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique (PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechnique pedagogicalTechnique = pedagogicalTechniqueRepository.save(pedagogicalTechniquePostRequestDTO.converter());
        return pedagogicalTechnique.toDto();
    }
}
