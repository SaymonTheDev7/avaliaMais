package net.weg.avaliaMais.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;

import java.util.List;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Student extends User {

    @ManyToMany(mappedBy = "students")
    private List<ClassSchool> classIds;

    @ManyToOne
    @JoinColumn(name = "current_course_id")
    private Course currentCourse;

    public StudentResponseDTO toDto() {
        return new StudentResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getClassIds(),
                this.currentCourse != null ? this.currentCourse.getUuid() : null
        );
    }
}
