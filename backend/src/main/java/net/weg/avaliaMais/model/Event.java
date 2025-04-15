package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.user.Teacher;

import java.util.List;
import java.util.UUID;

/**
 * Entidade que representa um evento dentro do sistema.
 * Armazena informações sobre o evento, como nome, descrição, status, etapa,
 * data e as associações com turmas, professores e cursos.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    /**
     * Identificador único do evento.
     * Gerado automaticamente no banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    /**
     * Nome do evento.
     * Nome que descreve o evento de forma concisa.
     */
    private String name;

    /**
     * Descrição do evento.
     * Detalhes sobre o evento, explicando seu propósito e contexto.
     */
    private String description;

    /**
     * Status do evento.
     * Indica o estado atual do evento (por exemplo, "Em andamento", "Pendente", etc.).
     */
    private String status;

    /**
     * Etapa do evento.
     * Define a fase atual do evento (por exemplo, "Pré-conselho da Turma", "Feedback Final").
     */
    private String step;

    /**
     * Data do evento.
     * A data programada ou realizada para o evento.
     */
    private String date;

    /**
     * Lista de turmas associadas a este evento.
     * Representa as turmas que participam do evento.
     */
    @ManyToMany
    @JoinTable(name = "event_classes",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "class_id"))
    private List<ClassSchool> classes;

    /**
     * Lista de professores associados a este evento.
     * Representa os docentes envolvidos ou convidados para o evento.
     */
    @ManyToMany
    @JoinTable(name = "event_teachers",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private List<Teacher> teachers;

    /**
     * Lista de cursos associados a este evento.
     * Representa os cursos que têm relação com o evento.
     */
    @ManyToMany
    @JoinTable(name = "event_courses",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Course> courses;
}
