package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.user.Student;

import java.util.List;
import java.util.UUID;

/**
 * DTO de resposta para um estudante.
 * <p>
 * Contém os dados de um estudante a serem retornados para o cliente.
 *
 * @param uuid            UUID do estudante. Identificador único.
 * @param name            Nome de usuário do estudante (geralmente o username da autenticação).
 * @param email           Email do estudante.
 * @param workShift       Turno de estudo do estudante (ex: manhã, tarde, noite).
 * @param workloadWeek    Carga horária semanal do estudante.
 * @param classIds        Lista de turmas ({@link ClassSchool}) em que o estudante está matriculado.
 * @param currentCourseId UUID do curso atual do estudante, caso esteja matriculado em algum.
 */
public record StudentResponseDTO(
        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek,
        List<ClassSchool> classIds,
        UUID currentCourseId
) {

    /**
     * Construtor que converte uma entidade {@link Student} em um DTO de resposta {@link StudentResponseDTO}.
     *
     * @param actualStudent A entidade {@link Student} que será convertida para o DTO.
     */
    public StudentResponseDTO(Student actualStudent) {
        this(
                actualStudent.getUuid(),
                actualStudent.getAuthUser().getUsername(),
                actualStudent.getEmail(),
                actualStudent.getWorkShift(),
                actualStudent.getWorkloadWeek(),
                actualStudent.getClassIds(),
                actualStudent.getCurrentCourse() != null ? actualStudent.getCurrentCourse().getUuid() : null
        );
    }
}
