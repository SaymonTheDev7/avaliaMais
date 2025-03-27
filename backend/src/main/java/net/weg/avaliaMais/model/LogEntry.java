package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
@Getter
@Setter
public class LogEntry {

    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    private String id;

    private LocalDateTime timestamp;

    private String actionType;

    @Column(columnDefinition = "TEXT")
    private String message;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}
