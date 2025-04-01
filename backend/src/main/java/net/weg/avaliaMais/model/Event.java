package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    private String name;
    private String description;
    private String status; // Ex: "Em andamento", "Pendente", etc.
    private String step; // Ex: "Pré-conselho da Turma", "Pré-conselho dos Professores", "Feedback Final"
    private String date; // Data do evento

    @ManyToMany
    @JoinTable(name = "event_classes",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "class_id"))
    private List<ClassSchool> classes;

    @ManyToMany
    @JoinTable(name = "event_teachers",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private List<Teacher> teachers;

    @ManyToMany
    @JoinTable(name = "event_courses",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Course> courses;
}