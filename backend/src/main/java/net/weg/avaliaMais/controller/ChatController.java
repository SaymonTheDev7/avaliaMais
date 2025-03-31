package net.weg.avaliaMais.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.ChatMessage;
import net.weg.avaliaMais.repository.ChatMessageRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {


    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(message);
        return message;
    }
}
