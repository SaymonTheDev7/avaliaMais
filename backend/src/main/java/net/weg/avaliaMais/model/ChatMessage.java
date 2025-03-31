package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidade que representa uma mensagem de chat.
 * Armazena informações sobre o remetente, destinatário, conteúdo da mensagem
 * e o timestamp da mensagem.
 */
@Entity
@Data
@Table(name = "chat_messages")
public class ChatMessage {

    /**
     * Identificador único da mensagem.
     * Gerado automaticamente no banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Remetente da mensagem.
     * Nome ou identificador do usuário que enviou a mensagem.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String sender;

    /**
     * Destinatário da mensagem.
     * Nome ou identificador do usuário que receberá a mensagem.
     * Não pode ser nulo.
     */
    @Column(nullable = false)
    private String receiver;

    /**
     * Conteúdo da mensagem.
     * O texto da mensagem enviada, armazenado como um campo de texto.
     * Não pode ser nulo.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * Timestamp da mensagem.
     * A data e hora em que a mensagem foi criada.
     * Este campo é preenchido automaticamente com o horário atual no momento da criação.
     */
    @Column(nullable = false)
    private LocalDateTime timestamp;

<<<<<<< HEAD
    /**
     * Construtor padrão que inicializa o timestamp com o horário atual.
     */
    public ChatMessage() {
=======
    @PrePersist
    public void prePersist() {
>>>>>>> 621fc38809b22b7904290100618ec88d5a60329c
        this.timestamp = LocalDateTime.now();
    }
}
