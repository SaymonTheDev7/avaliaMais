package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.PedagogicalTechnique;

import java.util.UUID;

public record PedagogicalTechniqueResponseDTO(
    UUID uuid,
    String username,
    String password,
    String email,
    String workShift,
    Double workloadWeek
) {

    public PedagogicalTechniqueResponseDTO (PedagogicalTechnique ActualPedagogicalTechnique) {
        this(ActualPedagogicalTechnique.getUuid(), ActualPedagogicalTechnique.getUsername(), ActualPedagogicalTechnique.getPassword(), ActualPedagogicalTechnique.getEmail(), ActualPedagogicalTechnique.getWorkShift(), ActualPedagogicalTechnique.getWorkloadWeek());
    }
}
