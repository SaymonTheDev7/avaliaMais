package net.weg.avaliaMais.chat.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.chat.model.ChatMessage;
import net.weg.avaliaMais.chat.repository.ChatMessageRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.Header;

import java.time.LocalDateTime;

/**
 * Controlador WebSocket responsável por receber mensagens do chat
 * e transmiti-las para todos os clientes conectados.
 */
@Controller
@RequiredArgsConstructor
@Tag(name = "WebSocket - Chat", description = "Comunicação em tempo real via WebSocket para troca de mensagens.")
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;

    /**
     * Recebe mensagens do WebSocket enviadas para o destino "/app/chat" e as encaminha
     * para o tópico "/topic/messages". As mensagens também são salvas no banco de dados.
     *
     * Este método não é um endpoint REST, mas é documentado para referência no Swagger.
     *
     * @param message Objeto da mensagem enviada pelo cliente
     * @param sessionId ID da sessão WebSocket do remetente
     * @return A mensagem recebida, com timestamp adicionado
     */
    @Operation(
            summary = "Envia mensagem via WebSocket",
            description = """
            Este endpoint é ativado automaticamente quando uma mensagem é enviada para o WebSocket em `/app/chat`.

            - As mensagens são transmitidas para todos os clientes conectados no tópico `/topic/messages`.
            - Cada mensagem é registrada no banco de dados com um carimbo de data/hora.
            """,
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Mensagem enviada com sucesso",
                            content = @Content(schema = @Schema(implementation = ChatMessage.class))
                    )
            }
    )
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(
            @Parameter(description = "Mensagem enviada pelo cliente", required = true)
            @Payload ChatMessage message,

            @Parameter(description = "ID da sessão WebSocket do usuário")
            @Header("simpSessionId") String sessionId) {

        message.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(message);
        System.out.println("Mensagem recebida de sessão: " + sessionId);
        return message;
    }
}
