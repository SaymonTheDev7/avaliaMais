package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    List<ChatMessage> findBySenderAndReceiver(String sender, String receiver);
    List<ChatMessage> findByReceiverAndSender(String receiver, String sender);
}
