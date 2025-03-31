package net.weg.avaliaMais.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ChatMessage;
import net.weg.avaliaMais.repository.ChatMessageRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.Header;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@Payload ChatMessage message, @Header("simpSessionId") String sessionId) {
        message.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(message);
        System.out.println("Mensagem recebida de sessão: " + sessionId);
        return message;
    }
}
