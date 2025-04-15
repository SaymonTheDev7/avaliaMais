package net.weg.avaliaMais.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;

import java.util.List;

/**
 * Representa um Professor no sistema.
 * Esta classe herda de {@link User} e contém informações específicas sobre o professor.
 * O professor possui o método {@link #toDto()} para converter os dados da entidade em um DTO de resposta.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Teacher extends User {

    /**
     * Lista de turmas associadas ao professor.
     * Representa as turmas nas quais o professor leciona.
     */
    @ManyToMany(mappedBy = "teachers")
    private List<ClassSchool> classIds;

    /**
     * Área profissional do professor.
     * Indica a especialização ou área de atuação do professor.
     */
    private String professionalArea;

    /**
     * Converte a entidade Teacher para um DTO de resposta.
     * O DTO contém informações detalhadas sobre o professor, incluindo os IDs das turmas, área profissional e carga horária.
     *
     * @return Um {@link TeacherResponseDTO} contendo as informações detalhadas do professor.
     */
    public TeacherResponseDTO toDto() {
        return new TeacherResponseDTO(
                this.getUuid(),
                this.getAuthUser().getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.classIds.stream().map(ClassSchool::getUuid).toList(),
                this.professionalArea
        );
    }
}
