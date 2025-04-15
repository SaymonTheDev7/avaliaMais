package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Course;

import java.util.UUID;

/**
 * DTO de resposta para um curso.
 * <p>
 * Esse DTO é utilizado para retornar os dados de um curso específico ao cliente.
 * Ele encapsula informações como nome, tipo, turno, carga horária e tempo de aula.
 *
 * @param uuid               Identificador único do curso.
 * @param nameCourse         Nome do curso.
 * @param startAndEndLocation Localização de início e fim do curso.
 * @param typeCourse         Tipo do curso (ex: presencial, online).
 * @param shift              Turno em que o curso é oferecido (ex: manhã, tarde, noite).
 * @param workloadCourse     Carga horária total do curso.
 * @param time               Tempo de duração de cada aula do curso.
 */
public record CourseResponseDTO(
        UUID uuid,
        String nameCourse,
        String startAndEndLocation,
        String typeCourse,
        String shift,
        Double workloadCourse,
        Double time
) {

    /**
     * Construtor que converte uma entidade {@link Course} para um {@link CourseResponseDTO}.
     * <p>
     * Este construtor extrai os dados da entidade {@link Course} e os adapta
     * para o formato de resposta que será enviado ao cliente.
     *
     * @param actualCourse Instância da entidade {@link Course} a ser convertida.
     */
    public CourseResponseDTO(Course actualCourse) {
        this(
                actualCourse.getUuid(),
                actualCourse.getNameCourse(),
                actualCourse.getStartAndEndLocation(),
                actualCourse.getTypeCourse(),
                actualCourse.getShift(),
                actualCourse.getWorkloadCourse(),
                actualCourse.getTime()
        );
    }
}
