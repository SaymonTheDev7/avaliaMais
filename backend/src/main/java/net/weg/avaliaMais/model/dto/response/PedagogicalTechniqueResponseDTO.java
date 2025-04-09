package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.UUID;

public record PedagogicalTechniqueResponseDTO(
        UUID uuid,
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek,
        UserRole role
) {
    public PedagogicalTechniqueResponseDTO(PedagogicalTechnique actualTechnique) {
        this(
                actualTechnique.getUuid(),
                actualTechnique.getAuthUser().getUsername(),
                actualTechnique.getAuthUser().getPassword(),
                actualTechnique.getEmail(),
                actualTechnique.getWorkShift(),
                actualTechnique.getWorkloadWeek(),
                actualTechnique.getAuthUser().getRole()
        );
    }
}
