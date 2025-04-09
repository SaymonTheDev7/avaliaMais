package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.Supervisor;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.UUID;

public record SupervisorResponseDTO(
        UUID uuid,
        String name,
        String email,
        UserRole userRole
) {

    public SupervisorResponseDTO(Supervisor actualSupervisor) {
        this(
                actualSupervisor.getUuid(),
                actualSupervisor.getAuthUser().getUsername(),
                actualSupervisor.getEmail(),
                actualSupervisor.getAuthUser().getRole()
        );
    }
}
