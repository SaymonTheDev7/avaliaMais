package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.PedagogicalAdvisor;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.UUID;

public record PedagogicalAdvisorResponseDTO(
        UUID uuid,
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek

) {
    public PedagogicalAdvisorResponseDTO(PedagogicalAdvisor advisor) {
        this(
                advisor.getUuid(),
                advisor.getAuthUser().getUsername(),
                advisor.getAuthUser().getPassword(),
                advisor.getEmail(),
                advisor.getWorkShift(),
                advisor.getWorkloadWeek()
        );
    }
}
