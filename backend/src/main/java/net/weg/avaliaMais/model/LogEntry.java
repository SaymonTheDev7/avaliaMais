package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

/**
 * Entidade que representa uma entrada de log no sistema.
 * Armazena informações sobre uma ação realizada no sistema, como o tipo de ação e uma mensagem detalhada.
 */
@Entity
@Table(name = "logs")
@Getter
@Setter
public class LogEntry {

    /**
     * Identificador único da entrada de log.
     * Gerado automaticamente no banco de dados utilizando UUID.
     */
    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    private String id;

    /**
     * Data e hora em que a entrada de log foi criada.
     * A data é definida automaticamente antes de persistir a entrada.
     */
    private LocalDateTime timestamp;

    /**
     * Tipo da ação registrada no log.
     * Descreve o tipo de operação que gerou o log (ex.: "CREATE", "UPDATE", "DELETE").
     */
    private String actionType;

    /**
     * Mensagem detalhada sobre a ação realizada.
     * Armazena informações adicionais ou detalhes sobre o que foi feito.
     */
    @Column(columnDefinition = "TEXT")
    private String message;

    /**
     * Método chamado antes de persistir a entrada de log.
     * Define automaticamente a data e hora de criação do log.
     */
    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}
