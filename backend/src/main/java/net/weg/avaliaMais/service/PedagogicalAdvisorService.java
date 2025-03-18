package net.weg.avaliaMais.service;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.repository.PedagogicalAdvisorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class PedagogicalAdvisorService {

    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;

    public PedagogicalAdvisorResponseDTO addPedagogicalAdvisor (PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisor pedagogicalAdvisorSave = pedagogicalAdvisorRepository.save(pedagogicalAdvisorPostRequestDTO.converter());
        return pedagogicalAdvisorSave.toDto();
    }

    public PedagogicalAdvisorResponseDTO updatePedagogicalAdvisor(PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisor existingPedagogicalAdvisor = pedagogicalAdvisorRepository.findByUsername(pedagogicalAdvisorPostRequestDTO.username()).orElseThrow(() -> new RuntimeException("Orientador não encontrado"));
        existingPedagogicalAdvisor.setPassword(pedagogicalAdvisorPostRequestDTO.password());
        existingPedagogicalAdvisor.setEmail(pedagogicalAdvisorPostRequestDTO.email());
        existingPedagogicalAdvisor.setWorkShift(pedagogicalAdvisorPostRequestDTO.workShift());
        existingPedagogicalAdvisor.setWorkloadWeek(pedagogicalAdvisorPostRequestDTO.workloadWeek());
        PedagogicalAdvisor updatedPedagogicalAdvisor = pedagogicalAdvisorRepository.save(existingPedagogicalAdvisor);
        return updatedPedagogicalAdvisor.toDto();
    }


    public String deletePedagogicalAdvisorPerUsername (String username) {
        if (pedagogicalAdvisorRepository.findByUsername(username).isPresent()) {
            pedagogicalAdvisorRepository.delete(pedagogicalAdvisorRepository.findByUsername(username).get());
            return "Orientador deletado com sucesso";
        }
        return "Orientador não encontrado";
    }

    public PedagogicalAdvisor findPedagogicalAdvisorPerUsername(String username) {
        return pedagogicalAdvisorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Orientador não encontrado: " + username));
    }

    public Page<PedagogicalAdvisorResponseDTO> findAllPedagogicalAdvisors (int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisor> pedagogicalAdvisorPage = pedagogicalAdvisorRepository.findAll(pageable);
        return pedagogicalAdvisorPage.map(PedagogicalAdvisorResponseDTO::new);
    }
}
