package net.weg.avaliaMais.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;

import java.util.List;

/**
 * Representa um Estudante no sistema.
 * Esta classe herda de {@link User} e contém informações específicas sobre o estudante, como a lista de turmas
 * em que o estudante está matriculado, o curso atual e as informações relacionadas ao usuário autenticado.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Student extends User {

    /**
     * Lista de turmas em que o estudante está matriculado.
     * Representa a associação entre o estudante e as turmas.
     */
    @ManyToMany(mappedBy = "students")
    private List<ClassSchool> classIds;

    /**
     * Curso atual do estudante.
     * Indica o curso ao qual o estudante está vinculado.
     */
    @ManyToOne
    @JoinColumn(name = "current_course_id")
    private Course currentCourse;

    /**
     * Converte a entidade de Estudante para um DTO de resposta.
     * O DTO contém informações sobre o estudante, incluindo o UUID, nome de usuário, e-mail, turno de trabalho,
     * carga horária semanal, as turmas em que o estudante está matriculado e o UUID do curso atual.
     *
     * @return Um {@link StudentResponseDTO} contendo as informações detalhadas do estudante.
     */
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
