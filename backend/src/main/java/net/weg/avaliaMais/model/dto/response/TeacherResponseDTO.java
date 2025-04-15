package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.List;
import java.util.UUID;

/**
 * DTO de resposta para um professor.
 * <p>
 * Contém os dados relevantes de um professor a serem retornados para o cliente.
 *
 * @param uuid             UUID do professor. Identificador único.
 * @param name             Nome de usuário do professor (proveniente do AuthUser).
 * @param email            Email institucional ou de contato do professor.
 * @param workShift        Turno de trabalho do professor (ex: manhã, tarde, noite).
 * @param workloadWeek     Carga horária semanal do professor.
 * @param classIds         Lista de UUIDs das turmas associadas ao professor.
 * @param professionalArea Área profissional de atuação do professor.
 */
public record TeacherResponseDTO(
        UUID uuid,
        String name,
        String email,
        String workShift,
        Double workloadWeek,
        List<UUID> classIds,
        String professionalArea
) {

    /**
     * Construtor que converte uma entidade {@link Teacher} em um DTO de resposta {@link TeacherResponseDTO}.
     *
     * @param actualTeacher A entidade {@link Teacher} que será convertida para o DTO.
     */
    public TeacherResponseDTO(Teacher actualTeacher) {
        this(
                actualTeacher.getUuid(),
                actualTeacher.getAuthUser().getUsername(),
                actualTeacher.getEmail(),
                actualTeacher.getWorkShift(),
                actualTeacher.getWorkloadWeek(),
                actualTeacher.getClassIds().stream().map(ClassSchool::getUuid).toList(),
                actualTeacher.getProfessionalArea()
        );
    }
}
