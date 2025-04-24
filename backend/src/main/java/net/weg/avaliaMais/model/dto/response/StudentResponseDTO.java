package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.user.Student;

import java.util.UUID;

/**
 * DTO de resposta para um estudante.
 * <p>
 * Contém os dados de um estudante a serem retornados para o cliente.
 *
 * @param uuid            UUID do estudante. Identificador único.
 * @param email           Email do estudante.
 * @param workShift       Turno de estudo do estudante (ex: manhã, tarde, noite).
 * @param workloadWeek    Carga horária semanal do estudante.
 * @param currentCourseId UUID do curso atual do estudante.
 * @param authUserUuid    UUID do usuário autenticado associado.
 */
public record StudentResponseDTO(
        UUID uuid,
        String email,
        String workShift,
        Double workloadWeek,
        UUID currentCourseId,
        UUID authUserUuid
) {

    /**
     * Construtor que converte uma entidade {@link Student} em um DTO de resposta {@link StudentResponseDTO}.
     *
     * @param actualStudent A entidade {@link Student} que será convertida para o DTO.
     */
    public StudentResponseDTO(Student actualStudent) {
        this(
                actualStudent.getUuid(),
                actualStudent.getEmail(),
                actualStudent.getWorkShift(),
                actualStudent.getWorkloadWeek(),
                actualStudent.getCurrentCourse() != null ? actualStudent.getCurrentCourse().getUuid() : null,
                actualStudent.getAuthUser().getUuid()
        );
    }
}
