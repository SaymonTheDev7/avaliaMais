package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;

import java.util.List;

/**
 * Entidade que representa um professor no sistema.
 * Estende a classe {@link User} e herda os atributos e comportamentos de um usuário.
 *
 * A classe {@link Teacher} contém atributos adicionais como:
 * <ul>
 *   <li>Uma lista de turmas associadas ao professor ({@link #classIds}), através da relação Many-to-Many com a classe {@link ClassSchool}.</li>
 *   <li>Área profissional do professor ({@link #professionalArea}).</li>
 * </ul>
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Teacher extends User {

    /**
     * Lista de turmas (classes) associadas ao professor.
     * Relacionamento Many-to-Many com a entidade {@link ClassSchool}.
     */
    @ManyToMany(mappedBy = "teachers")
    private List<ClassSchool> classIds;

    /**
     * A área profissional do professor (ex: Matemática, História, etc.).
     */
    private String professionalArea;

    /**
     * Converte a entidade {@link Teacher} para um {@link TeacherResponseDTO}.
     *
     * @return Um objeto {@link TeacherResponseDTO} representando a entidade.
     */
    public TeacherResponseDTO toDto() {
        return new TeacherResponseDTO(
                this.getUuid(),
                this.getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.classIds.stream().map(ClassSchool::getUuid).toList(),
                this.professionalArea
        );
    }
}
