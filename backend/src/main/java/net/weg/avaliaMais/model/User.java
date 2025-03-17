package net.weg.avaliaMais.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    private String username;
    private String password;
    private String email;
    private String workShift;
    private Double workloadWeek;

    public User(UUID uuid, String username, String password, String email, String workShift, Double workloadWeek) {
        this.uuid = uuid;
        this.username = username;
        this.password = password;
        this.email = email;
        this.workShift = workShift;
        this.workloadWeek = workloadWeek;
    }

}
