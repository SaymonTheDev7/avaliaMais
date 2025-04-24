package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.user.Student;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Entidade que representa uma turma escolar.
 * Armazena informações sobre a turma, como o nome, ano, carga horária, localização,
 * quantidade de estudantes, turno e a associação com os cursos, alunos e professores.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassSchool {

    /**
     * Identificador único da turma.
     * Gerado automaticamente no banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Curso associado a esta turma.
     * Representa o curso ao qual a turma pertence.
     */
    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.MERGE})
    private Course course;

    /**
     * Lista de estudantes associados a esta turma.
     * Representa os alunos matriculados na turma.
     */
    @ManyToMany(cascade = {CascadeType.ALL, CascadeType.MERGE})
    private List<Student> students;

    /**
     * Lista de professores associados a esta turma.
     * Representa os docentes responsáveis pela turma.
     */
    @ManyToMany(cascade = {CascadeType.ALL, CascadeType.MERGE})
    private List<Teacher> teachers;

    /**
     * Nome da turma.
     * O nome identificador da turma.
     * Não pode ser nulo e deve ser único.
     */
    @Column(nullable = false, unique = true)
    private String nameClass;

    /**
     * Ano de referência da turma.
     * Indica o ano em que a turma foi formada.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private Integer year;

    /**
     * Carga horária da turma.
     * A quantidade total de horas que a turma tem.
     * Não pode ser nula.
     */
    @Column(nullable = false)
    private Double workloadClass;

    /**
     * Localização da turma.
     * Onde as aulas da turma são ministradas.
     * Não pode ser nula.
     */
    @Column(nullable = false)
    private String location;

    /**
     * Tempo dedicado às aulas.
     * A quantidade de tempo, em horas, que as aulas da turma ocupam.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String time;

    /**
     * Quantidade de estudantes matriculados na turma.
     * Não pode ser nula.
     */
    @Column(nullable = false)
    private Integer quantityStudents;

    /**
     * Turno da turma.
     * O turno em que as aulas acontecem (ex.: manhã, tarde, noite).
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String shift;

    /**
     * Converte a entidade de turma para um DTO de resposta.
     * O DTO contém informações detalhadas sobre a turma, incluindo os IDs do curso, alunos e professores.
     *
     * @return O DTO de resposta contendo os detalhes da turma.
     */
    public ClassResponseDTO toDto() {
        return new ClassResponseDTO(
                this.uuid,
                this.nameClass,
                this.year,
                this.workloadClass,
                this.location,
                this.time,
                this.quantityStudents,
                this.shift,
                this.course.getUuid(),
                this.course.getNameCourse(),
                this.students.stream().map(Student::getUuid).collect(Collectors.toList()),
                this.teachers.stream().map(Teacher::getUuid).collect(Collectors.toList())
        );
    }
}
