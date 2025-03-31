package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Student;

import java.util.List;
import java.util.UUID;

/**
 * DTO de resposta para o estudante.
 * Contém as informações necessárias para representar um estudante em uma resposta.
 */
public record StudentResponseDTO(

        /**
         * UUID do estudante.
         * Identificador único do estudante.
         */
        UUID uuid,

        /**
         * Nome do estudante.
         * Nome completo do estudante.
         */
        String name,

        /**
         * Endereço de e-mail do estudante.
         * O e-mail associado ao estudante.
         */
        String email,

        /**
         * Turno de trabalho do estudante.
         * Indica o período em que o estudante trabalha (ex: manhã, tarde, noite).
         */
        String workShift,

        /**
         * Carga horária semanal do estudante.
         * O total de horas trabalhadas pelo estudante por semana.
         */
        Double workloadWeek,

        /**
         * Lista de turmas associadas ao estudante.
         * Lista de turmas em que o estudante está matriculado.
         */
        List<ClassSchool> classIds,

        /**
         * ID do curso atual do estudante.
         * O identificador único do curso no qual o estudante está matriculado.
         */
        UUID currentCourseId

) {

    /**
     * Construtor que aceita todos os parâmetros para inicializar o DTO {@link StudentResponseDTO}.
     *
     * @param uuid Identificador único do estudante.
     * @param name Nome do estudante.
     * @param email E-mail do estudante.
     * @param workShift Turno de trabalho do estudante.
     * @param workloadWeek Carga horária semanal do estudante.
     * @param classIds Lista de turmas associadas ao estudante.
     * @param currentCourseId ID do curso atual do estudante.
     */
    public StudentResponseDTO(UUID uuid, String name, String email, String workShift, Double workloadWeek, List<ClassSchool> classIds, UUID currentCourseId) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.workShift = workShift;
        this.workloadWeek = workloadWeek;
        this.classIds = classIds;
        this.currentCourseId = currentCourseId;
    }

    /**
     * Construtor que converte um objeto {@link Student} para um DTO {@link StudentResponseDTO}.
     *
     * @param actualStudent O objeto {@link Student} a ser convertido.
     */
    public StudentResponseDTO(Student actualStudent) {
        this(
                actualStudent.getUuid(),
                actualStudent.getUsername(),
                actualStudent.getEmail(),
                actualStudent.getWorkShift(),
                actualStudent.getWorkloadWeek(),
                actualStudent.getClassIds(),
                actualStudent.getCurrentCourse() != null ? actualStudent.getCurrentCourse().getUuid() : null  // Adicionando o ID do curso atual
        );
    }
}
