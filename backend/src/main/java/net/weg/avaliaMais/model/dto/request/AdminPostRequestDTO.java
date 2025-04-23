package net.weg.avaliaMais.model.dto.request;

import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.user.Admin;

import java.util.UUID;

public record AdminPostRequestDTO(

        String email,
        String workShift,
        Double workloadWeek,
        UUID authUserUuid
) {

    public Admin converter(AuthUserRepository authUserRepository) {
        AuthUser authUser = authUserRepository.findById(authUserUuid)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        return Admin.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .authUser(authUser)
                .build();
    }

}
