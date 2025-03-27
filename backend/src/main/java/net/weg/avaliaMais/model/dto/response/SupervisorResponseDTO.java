package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Supervisor;

import java.util.UUID;

public record SupervisorResponseDTO(

        UUID uuid,
        String name,
        String email

) {

    public SupervisorResponseDTO(Supervisor actualSupervisor) {
        this(actualSupervisor.getUuid(),
                actualSupervisor.getUsername(),
                actualSupervisor.getEmail());
    }
}
