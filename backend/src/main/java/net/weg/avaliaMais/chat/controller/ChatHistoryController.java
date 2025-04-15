package net.weg.avaliaMais.chat.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import net.weg.avaliaMais.chat.model.ChatMessage;
import net.weg.avaliaMais.chat.repository.ChatMessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

/**
 * Controlador REST responsável por fornecer o histórico de mensagens entre dois usuários.
 */
@RestController
@RequestMapping("/chat")
@Tag(name = "Chat", description = "Operações relacionadas ao histórico de mensagens")
public class ChatHistoryController {

    private final ChatMessageRepository chatMessageRepository;

    public ChatHistoryController(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    /**
     * Retorna o histórico de mensagens trocadas entre dois usuários.
     *
     * @param sender   Nome do remetente
     * @param receiver Nome do destinatário
     * @return Lista de mensagens ordenadas por data e hora
     */
    @GetMapping("/history")
    @Operation(
            summary = "Buscar histórico de chat",
            description = "Retorna todas as mensagens trocadas entre um remetente e um destinatário, ordenadas por data/hora.",
            parameters = {
                    @Parameter(name = "sender", description = "Nome do remetente", required = true),
                    @Parameter(name = "receiver", description = "Nome do destinatário", required = true)
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Histórico de mensagens retornado com sucesso",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ChatMessage.class))
                    )
            }
    )
    public List<ChatMessage> getChatHistory(@RequestParam String sender, @RequestParam String receiver) {
        List<ChatMessage> messagesSent = chatMessageRepository.findBySenderAndReceiver(sender, receiver);
        List<ChatMessage> messagesReceived = chatMessageRepository.findByReceiverAndSender(sender, receiver);
        List<ChatMessage> chatHistory = new ArrayList<>(messagesSent);
        chatHistory.addAll(messagesReceived);
        chatHistory.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
        return chatHistory;
    }
}