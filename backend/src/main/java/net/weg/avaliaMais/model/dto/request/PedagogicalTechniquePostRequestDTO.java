package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.model.PedagogicalTechnique;

public record PedagogicalTechniquePostRequestDTO (
    String username,
    String password,
    String email,
    String workShift,
    Double workloadWeek
) {

    public PedagogicalTechnique converter() {
        return PedagogicalTechnique.builder().username(username).password(password).email(email).workShift(workShift).workloadWeek(workloadWeek).build();
    }
}
