package net.weg.avaliaMais.model;
import jakarta.persistence.*;
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
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    @ManyToMany
    private List<Teacher> teachers;
    private String nameCourse;
    private String startAndEndLocation;
    private String typeCourse;
    private String shift;
    private Double workloadCourse;
    private Double time;
}
