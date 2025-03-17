package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.PedagogicalAdvisor;

import java.util.UUID;

public record PedagogicalAdvisorResponseDTO(
    UUID uuid,
    String username,
    String password,
    String email,
    String workShift,
    Double workloadWeek
) {

    public PedagogicalAdvisorResponseDTO (PedagogicalAdvisor ActualPedagogicalAdvisor) {
        this(ActualPedagogicalAdvisor.getUuid(), ActualPedagogicalAdvisor.getUsername(), ActualPedagogicalAdvisor.getPassword(), ActualPedagogicalAdvisor.getEmail(), ActualPedagogicalAdvisor.getWorkShift(), ActualPedagogicalAdvisor.getWorkloadWeek());
    }
}
