package net.weg.avaliaMais.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;

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
    @Column(nullable = false, unique = true)
    private String nameCourse;
    @Column(nullable = false)
    private String startAndEndLocation;
    @Column(nullable = false)
    private String typeCourse;
    @Column(nullable = false)
    private String shift;
    @Column(nullable = false)
    private Double workloadCourse;
    @Column(nullable = false)
    private Double time;

    public CourseResponseDTO toDto() {
        return new CourseResponseDTO(this.uuid, this.nameCourse, this.startAndEndLocation, this.typeCourse, this.shift, this.workloadCourse, this.time);
    }
}
