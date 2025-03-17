package net.weg.avaliaMais.model.dto.request;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
public record PedagogicalAdvisorPostRequestDTO(

        String username,
        String password,
        String email,
        String workShift,
        Double workloadWeek
) {

    public PedagogicalAdvisor converter() {
        return PedagogicalAdvisor.builder().username(username).password(password).email(email).workShift(workShift).workloadWeek(workloadWeek).build();
    }
}
