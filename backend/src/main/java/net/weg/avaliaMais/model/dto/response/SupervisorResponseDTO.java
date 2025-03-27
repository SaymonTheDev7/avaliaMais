package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Supervisor;

import java.util.UUID;

public record SupervisorResponseDTO(

        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek

) {

    public SupervisorResponseDTO(Supervisor actualSupervisor) {
        this(actualSupervisor.getUuid(),
                actualSupervisor.getUsername(),
                actualSupervisor.getEmail(),
                actualSupervisor.getWorkShift(),
                actualSupervisor.getWorkloadWeek());
    }

}
