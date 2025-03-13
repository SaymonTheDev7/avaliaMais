package net.weg.avaliaMais.model;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.UUID;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Teacher extends User {

    public Teacher(UUID uuid, String username, String password, String email, String workShift, Double workloadWeek) {
        super(uuid, username, password, email, workShift, workloadWeek);
    }

    private String professionalArea;
    @ManyToMany(mappedBy = "teachers")
    private List<Class> classes;
    @ManyToMany(mappedBy = "teachers")
    private List<Course> courses;
}
