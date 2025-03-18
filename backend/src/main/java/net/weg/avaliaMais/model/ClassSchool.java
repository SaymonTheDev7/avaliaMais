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
    private Course uuid_course;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Student> students;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Teacher> teachers;

    private String nameClass;
    private Double workloadClass;
    private Double time;
    private Integer quantityStudents;
    private String shift;

    public ClassResponseDTO toDto() {
        return new ClassResponseDTO(
                this.uuid,
                this.nameClass,
                this.workloadClass,
                this.time,
                this.quantityStudents,
                this.shift,
                this.uuid_course.getUuid(),
                this.uuid_course.getNameCourse(),
                this.students.stream().map(Student::getUuid).collect(Collectors.toList()),
                this.teachers.stream().map(Teacher::getUuid).collect(Collectors.toList())
        );
    }


}
