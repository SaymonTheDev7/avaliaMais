package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Course;

import java.util.UUID;

/**
 * DTO de resposta para um curso.
 * Contém os dados de um curso específico a serem retornados para o cliente.
 */
public record CourseResponseDTO(

        /**
         * UUID do curso.
         * Identificador único para o curso.
         */
        UUID uuid,

        /**
         * Nome do curso.
         * O nome do curso oferecido.
         */
        String nameCourse,

        /**
         * Localização de início e fim do curso.
         * O local onde o curso começa e termina.
         */
        String startAndEndLocation,



/**
         * Tipo de curso.
         * O tipo de curso (ex: presencial, online).
         */
        String typeCourse,

        /**
         * Turno do curso.
         * O turno em que o curso é oferecido (ex: manhã, tarde, noite).
         */
        String shift,

        /**
         * Carga horária total do curso.
         * A carga horária total dedicada ao curso.
         */
        Double workloadCourse,

        /**
         * Tempo de duração das aulas do curso.
         * O tempo individual de duração de cada aula do curso.
         */
        Double time

) {

    /**
     * Construtor que converte uma entidade {@link Course} em um DTO de resposta {@link CourseResponseDTO}.
     *
     * @param ActualCourse O curso {@link Course} que será convertido para o DTO.
     */
    public CourseResponseDTO(Course ActualCourse) {
        this(
                ActualCourse.getUuid(),
                ActualCourse.getNameCourse(),
                ActualCourse.getStartAndEndLocation(),
                ActualCourse.getTypeCourse(),
                ActualCourse.getShift(),
                ActualCourse.getWorkloadCourse(),
                ActualCourse.getTime()
        );
    }
}
