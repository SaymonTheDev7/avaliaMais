package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;

import java.util.List;
import java.util.UUID;

/**
 * Entidade que representa um aluno no sistema.
 * Estende a classe {@link User} e contém informações relacionadas às classes que o aluno frequenta,
 * bem como o curso atual em que está matriculado.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
public class Student extends User {

    /**
     * Lista de classes às quais o aluno está matriculado.
     * Mapeado pela propriedade "students" na classe {@link ClassSchool}.
     */
    @ManyToMany(mappedBy = "students")
    private List<ClassSchool> classIds;

    /**
     * O curso atual em que o aluno está matriculado.
     */
    @ManyToOne
    @JoinColumn(name = "current_course_id")
    private Course currentCourse;  // Novo atributo para o curso atual do aluno

    /**
     * Converte a instância atual de {@link Student} para um objeto do tipo {@link StudentResponseDTO}.
     * Este método é utilizado para retornar os dados do aluno em um formato adequado para resposta de API.
     *
     * @return um {@link StudentResponseDTO} contendo os dados do aluno.
     */
    public StudentResponseDTO toDto() {
        return new StudentResponseDTO(
                this.getUuid(),
                this.getUsername(),
                this.getEmail(),
                this.getWorkShift(),
                this.getWorkloadWeek(),
                this.getClassIds(),
                this.currentCourse != null ? this.currentCourse.getUuid() : null  // Adicionando o ID do curso atual no DTO
        );
    }

    /**
     * Retorna a lista de classes nas quais o aluno está matriculado.
     *
     * @return a lista de classes do aluno.
     */
    public List<ClassSchool> getClassesIds() {
        return classIds;
    }
}
