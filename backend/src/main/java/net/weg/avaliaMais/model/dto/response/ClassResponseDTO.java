package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * DTO de resposta para uma turma.
 * Contém os dados de uma turma específica a serem retornados para o cliente.
 */
public record ClassResponseDTO(

        /**
         * UUID da turma.
         * Identificador único para a turma.
         */
        UUID uuid,

        /**
         * Nome da turma.
         * Nome descritivo da turma.
         */
        String nameClass,

        /**
         * Ano da turma.
         * O ano em que a turma foi criada ou a qual pertence.
         */
        Integer year,

        /**
         * Carga horária total da turma.
         * A carga horária total dedicada a esta turma.
         */
        Double workloadClass,

        /**
         * Localização da turma.
         * O local onde as aulas da turma ocorrem.
         */
        String location,

        /**
         * Tempo de duração das aulas da turma.
         * O tempo individual de duração de cada aula.
         */
        Double time,

        /**
         * Quantidade de estudantes na turma.
         * O número total de estudantes matriculados na turma.
         */
        Integer quantityStudents,

        /**
         * Turno da turma.
         * O turno em que a turma acontece (ex: manhã, tarde, noite).
         */
        String shift,

        /**
         * UUID do curso associado à turma.
         * Identificador único do curso associado à turma.
         */
        UUID courseUuid,

        /**
         * Nome do curso associado à turma.
         * O nome do curso que a turma pertence.
         */
        String courseName,

        /**
         * Lista de UUIDs dos estudantes na turma.
         * Identificadores únicos dos estudantes matriculados na turma.
         */
        List<UUID> studentIds,

        /**
         * Lista de UUIDs dos professores na turma.
         * Identificadores únicos dos professores que ministram aulas na turma.
         */
        List<UUID> teacherIds

) {

    /**
     * Construtor que converte uma entidade {@link ClassSchool} em um DTO de resposta {@link ClassResponseDTO}.
     *
     * @param actualClassSchool A turma {@link ClassSchool} que será convertida para o DTO.
     */
    public ClassResponseDTO(ClassSchool actualClassSchool) {
        this(
                actualClassSchool.getUuid(),
                actualClassSchool.getNameClass(),
                actualClassSchool.getYear(),
                actualClassSchool.getWorkloadClass(),
                actualClassSchool.getLocation(),
                actualClassSchool.getTime(),
                actualClassSchool.getQuantityStudents(),
                actualClassSchool.getShift(),
                actualClassSchool.getCourse().getUuid(),
                actualClassSchool.getCourse().getNameCourse(),
                actualClassSchool.getStudents().stream().map(student -> student.getUuid()).collect(Collectors.toList()),
                actualClassSchool.getTeachers().stream().map(teacher -> teacher.getUuid()).collect(Collectors.toList())
        );
    }

}
