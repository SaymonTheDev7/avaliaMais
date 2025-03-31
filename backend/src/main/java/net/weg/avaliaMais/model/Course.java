package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;

import java.util.UUID;

/**
 * Entidade que representa um curso oferecido.
 * Armazena informações sobre o curso, como nome, localização, tipo, turno,
 * carga horária, e tempo dedicado ao curso.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    /**
     * Identificador único do curso.
     * Gerado automaticamente no banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Nome do curso.
     * O nome identificador do curso.
     * Não pode ser nulo e deve ser único.
     */
    @Column(nullable = false, unique = true)
    private String nameCourse;

    /**
     * Localização inicial e final do curso.
     * Indica onde o curso começa e termina.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String startAndEndLocation;

    /**
     * Tipo do curso.
     * O tipo de curso oferecido (ex.: presencial, online, híbrido).
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String typeCourse;

    /**
     * Turno do curso.
     * O turno em que o curso é oferecido (ex.: manhã, tarde, noite).
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String shift;

    /**
     * Carga horária do curso.
     * A quantidade total de horas dedicadas ao curso.
     * Não pode ser nula.
     */
    @Column(nullable = false)
    private Double workloadCourse;

    /**
     * Tempo dedicado ao curso.
     * A quantidade de tempo (em horas) que o curso ocupa por semana.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private Double time;

    /**
     * Converte a entidade de curso para um DTO de resposta.
     * O DTO contém informações detalhadas sobre o curso.
     *
     * @return O DTO de resposta contendo os detalhes do curso.
     */
    public CourseResponseDTO toDto() {
        return new CourseResponseDTO(this.uuid, this.nameCourse, this.startAndEndLocation, this.typeCourse, this.shift, this.workloadCourse, this.time);
    }
}
