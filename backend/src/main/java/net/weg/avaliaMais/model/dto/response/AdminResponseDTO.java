package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.Admin;

import java.util.UUID;

public record AdminResponseDTO(
        UUID uuid,
        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek,
        UUID authUserUuid
) {

    public AdminResponseDTO(Admin actualAdmin) {
        this(
                actualAdmin.getUuid(),
                actualAdmin.getAuthUser().getUsername(),
                actualAdmin.getAuthUser().getPassword(),
                actualAdmin.getEmail(),
                actualAdmin.getWorkShift(),
                actualAdmin.getWorkloadWeek(),
                actualAdmin.getAuthUser().getUuid()
                );
    }

}
