package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.repository.PedagogicalTechniqueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PedagogicalTechniqueService {

    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;

    public PedagogicalTechniqueResponseDTO addPedagogicalTechnique(PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechnique pedagogicalTechnique = pedagogicalTechniqueRepository.save(pedagogicalTechniquePostRequestDTO.converter());
        return pedagogicalTechnique.toDto();
    }

    public PedagogicalTechniqueResponseDTO updatePedagogicalTechnique(PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechnique existingPedagogicalTechnique = pedagogicalTechniqueRepository.findByUsername(pedagogicalTechniquePostRequestDTO.username()).orElseThrow(() -> new RuntimeException("Técnico pedagógico não encontrado"));
        existingPedagogicalTechnique.setPassword(pedagogicalTechniquePostRequestDTO.password());
        existingPedagogicalTechnique.setEmail(pedagogicalTechniquePostRequestDTO.email());
        existingPedagogicalTechnique.setWorkShift(pedagogicalTechniquePostRequestDTO.workShift());
        existingPedagogicalTechnique.setWorkloadWeek(pedagogicalTechniquePostRequestDTO.workloadWeek());
        PedagogicalTechnique updatedPedagogicalTechnique = pedagogicalTechniqueRepository.save(existingPedagogicalTechnique);
        return updatedPedagogicalTechnique.toDto();
    }


    public String deletePedagogicalTechniquePerUsername(String username) {
        if (pedagogicalTechniqueRepository.findByUsername(username).isPresent()) {
            pedagogicalTechniqueRepository.delete(pedagogicalTechniqueRepository.findByUsername(username).get());
            return "Técnico Pedagógico deletado com sucesso";
        }
        return "Técnico Pedagógico não encontrado";
    }

    public PedagogicalTechnique findPedagogicalTechniquePerUsername(String username) {
        return pedagogicalTechniqueRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Técnico Pedagógico não encontrado: " + username));
    }

    public Page<PedagogicalTechniqueResponseDTO> findAllPedagogicalTechniques(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalTechnique> pedagogicalTechniquePage = pedagogicalTechniqueRepository.findAll(pageable);
        return pedagogicalTechniquePage.map(PedagogicalTechniqueResponseDTO::new);
    }
}
