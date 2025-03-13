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
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    @OneToOne
    private Course nameCourse;
    @ManyToMany
    private List<Student> students;
    @ManyToMany
    private List<Teacher> teachers;
    private String nameClass;
    private Double workloadClass;
    private Double time;
    private Integer quantityStudents;
    private String shift;
}
