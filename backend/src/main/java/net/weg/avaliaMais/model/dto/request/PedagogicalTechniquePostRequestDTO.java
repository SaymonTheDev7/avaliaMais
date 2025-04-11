package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.model.user.PedagogicalTechnique;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;

import java.util.UUID;

public record PedagogicalTechniquePostRequestDTO(

        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        UUID authUserUuid
) {
    public PedagogicalTechnique converter(AuthUserRepository authUserRepository) {

        AuthUser authUser = authUserRepository.findById(authUserUuid)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return PedagogicalTechnique.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .authUser(authUser)
                .build();
    }
}
