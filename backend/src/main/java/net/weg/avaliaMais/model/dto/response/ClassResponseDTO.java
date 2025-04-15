package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Course;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * DTO de resposta para uma turma.
 * <p>
 * Este DTO é utilizado para retornar informações detalhadas de uma turma
 * ao cliente, como parte de uma resposta da API.
 * Ele encapsula os dados relevantes de uma instância de {@link ClassSchool}.
 *
 * @param uuid             Identificador único da turma.
 * @param nameClass        Nome da turma.
 * @param year             Ano letivo da turma.
 * @param workloadClass    Carga horária total da turma.
 * @param location         Local onde a turma realiza suas aulas.
 * @param time             Duração das aulas da turma.
 * @param quantityStudents Quantidade de estudantes na turma.
 * @param shift            Turno (ex: manhã, tarde ou noite) da turma.
 * @param courseUuid       Identificador único do curso associado à turma.
 * @param courseName       Nome do curso ao qual a turma está vinculada.
 * @param studentIds       Lista de UUIDs dos estudantes matriculados na turma.
 * @param teacherIds       Lista de UUIDs dos professores da turma.
 */
public record ClassResponseDTO(
        UUID uuid,
        String nameClass,
        Integer year,
        Double workloadClass,
        String location,
        String time,
        Integer quantityStudents,
        String shift,
        UUID courseUuid,
        String courseName,
        List<UUID> studentIds,
        List<UUID> teacherIds
) {

    /**
     * Construtor que converte uma entidade {@link ClassSchool} para um {@link ClassResponseDTO}.
     * <p>
     * Esse construtor extrai e transforma os dados da entidade {@link ClassSchool}
     * para preencher os campos deste DTO de forma adequada.
     *
     * @param actualClassSchool Instância de {@link ClassSchool} que será convertida.
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
                actualClassSchool.getStudents()
                        .stream()
                        .map(student -> student.getUuid())
                        .collect(Collectors.toList()),
                actualClassSchool.getTeachers()
                        .stream()
                        .map(teacher -> teacher.getUuid())
                        .collect(Collectors.toList())
        );
    }
}
