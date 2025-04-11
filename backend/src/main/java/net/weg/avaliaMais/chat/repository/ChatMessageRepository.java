package net.weg.avaliaMais.chat.repository;

import net.weg.avaliaMais.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repositório para a entidade {@link ChatMessage}.
 * Esta interface estende {@link JpaRepository} e oferece métodos personalizados
 * para buscar mensagens de chat enviadas e recebidas entre dois usuários.
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    /**
     * Retorna uma lista de mensagens enviadas de um usuário para outro.
     * A busca é feita com base no remetente e no destinatário.
     *
     * @param sender O nome do remetente.
     * @param receiver O nome do destinatário.
     * @return Lista de mensagens enviadas do remetente para o destinatário.
     */
    List<ChatMessage> findBySenderAndReceiver(String sender, String receiver);

    /**
     * Retorna uma lista de mensagens enviadas de um usuário para outro.
     * A busca é feita com base no destinatário e no remetente.
     *
     * @param receiver O nome do destinatário.
     * @param sender O nome do remetente.
     * @return Lista de mensagens enviadas do destinatário para o remetente.
     */
    List<ChatMessage> findByReceiverAndSender(String receiver, String sender);
}
