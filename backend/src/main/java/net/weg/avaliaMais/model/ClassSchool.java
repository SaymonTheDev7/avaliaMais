package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassSchool {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne
    private Course course;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Student> students;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Teacher> teachers;

    @Column(nullable = false, unique = true)
    private String nameClass;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Double workloadClass;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Double time;

    @Column(nullable = false)
    private Integer quantityStudents;

    @Column(nullable = false)
    private String shift;

    public ClassResponseDTO toDto() {
        return new ClassResponseDTO(
                this.uuid,
                this.nameClass,
                this.year,
                this.workloadClass,
                this.location,
                this.time,
                this.quantityStudents,
                this.shift,
                this.course.getUuid(),
                this.course.getNameCourse(),
                this.students.stream().map(Student::getUuid).collect(Collectors.toList()),
                this.teachers.stream().map(Teacher::getUuid).collect(Collectors.toList())
        );
    }
}
