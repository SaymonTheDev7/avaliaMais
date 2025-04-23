package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.model.user.PedagogicalAdvisor;

import java.util.UUID;

/**
 * DTO para representar os dados necessários para a criação de um novo orientador pedagógico.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link PedagogicalAdvisor}.
 */
public record PedagogicalAdvisorPostRequestDTO(

        String email,
        String workShift,
        Double workloadWeek,
        UUID authUserUuid
) {

    /**
     * Converte o DTO para uma entidade {@link PedagogicalAdvisor}.
     *
     * @return Um objeto {@link PedagogicalAdvisor} baseado nos dados fornecidos.
     */
    public PedagogicalAdvisor converter(AuthUserRepository authUserRepository) {
        AuthUser authUser = authUserRepository.findById(authUserUuid)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        return PedagogicalAdvisor.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .authUser(authUser)
                .build();
    }
}
