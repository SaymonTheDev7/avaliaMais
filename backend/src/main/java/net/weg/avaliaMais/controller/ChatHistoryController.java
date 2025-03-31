package net.weg.avaliaMais.controller;

import net.weg.avaliaMais.model.ChatMessage;
import net.weg.avaliaMais.repository.ChatMessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/chat")
public class ChatHistoryController {

    private final ChatMessageRepository chatMessageRepository;

    public ChatHistoryController(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory(@RequestParam String sender, @RequestParam String receiver) {
        List<ChatMessage> messagesSent = chatMessageRepository.findBySenderAndReceiver(sender, receiver);
        List<ChatMessage> messagesReceived = chatMessageRepository.findByReceiverAndSender(sender, receiver);
        List<ChatMessage> chatHistory = new ArrayList<>(messagesSent);
        chatHistory.addAll(messagesReceived);
        chatHistory.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
        return chatHistory;
    }
}
