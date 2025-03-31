package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;

import java.util.List;
import java.util.UUID;

/**
 * DTO de resposta para o professor.
 * Contém as informações necessárias para representar um professor em uma resposta.
 */
public record TeacherResponseDTO(

        /**
         * UUID do professor.
         * Identificador único do professor.
         */
        UUID uuid,

        /**
         * Nome do professor.
         * Nome completo do professor.
         */
        String name,

        /**
         * Endereço de e-mail do professor.
         * O e-mail associado ao professor.
         */
        String email,

        /**
         * Turno de trabalho do professor.
         * O turno em que o professor trabalha (ex: manhã, tarde, noite).
         */
        String workShift,

        /**
         * Carga horária semanal do professor.
         * A quantidade de horas que o professor trabalha por semana.
         */
        Double workloadWeek,

        /**
         * Lista de UUIDs das turmas associadas ao professor.
         * As turmas nas quais o professor está envolvido.
         */
        List<UUID> classIds,

        /**
         * Área profissional do professor.
         * A área de especialização do professor (ex: matemática, física, etc.).
         */
        String professionalArea
) {

    /**
     * Construtor que converte um objeto {@link Teacher} para um DTO {@link TeacherResponseDTO}.
     *
     * @param actualTeacher O objeto {@link Teacher} a ser convertido.
     */
    public TeacherResponseDTO(Teacher actualTeacher) {
        this(
                actualTeacher.getUuid(),
                actualTeacher.getUsername(),
                actualTeacher.getEmail(),
                actualTeacher.getWorkShift(),
                actualTeacher.getWorkloadWeek(),
                actualTeacher.getClassIds().stream().map(ClassSchool::getUuid).toList(),
                actualTeacher.getProfessionalArea()
        );
    }
}
