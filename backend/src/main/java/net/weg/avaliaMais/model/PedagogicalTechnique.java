package net.weg.avaliaMais.model;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedagogicalTechnique extends User {

    public PedagogicalTechnique(UUID uuid, String username, String password, String email, String workShift, Double workloadWeek) {
        super(uuid, username, password, email, workShift, workloadWeek);
    }
}
