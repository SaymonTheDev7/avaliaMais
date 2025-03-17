package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.repository.PedagogicalAdvisorRepository;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class PedagogicalAdvisorService {

    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;

    public PedagogicalAdvisorResponseDTO addPedagogicalAdvisor (PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisor pedagogicalAdvisorSave = pedagogicalAdvisorRepository.save(pedagogicalAdvisorPostRequestDTO.converter());
        return pedagogicalAdvisorSave.toDto();
    }
}
