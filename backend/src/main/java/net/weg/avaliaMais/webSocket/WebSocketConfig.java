package net.weg.avaliaMais.webSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Configuração para WebSocket com STOMP.
 *
 * Esta classe configura o WebSocket no aplicativo, permitindo a comunicação em tempo real entre o servidor e os clientes.
 * Ela habilita o uso de STOMP (Simple Text Oriented Messaging Protocol) para o envio de mensagens.
 *
 * <p>O WebSocket é utilizado para comunicação bidirecional em tempo real entre o servidor e o cliente.</p>
 *
 * <p>A configuração define dois principais aspectos:</p>
 * <ul>
 *     <li><b>Stomp Endpoints</b>: Os pontos finais onde os clientes podem se conectar ao servidor WebSocket.</li>
 *     <li><b>Message Broker</b>: O broker que gerencia o envio de mensagens aos clientes.</li>
 * </ul>
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Registra os pontos finais STOMP onde os clientes podem se conectar ao WebSocket.
     *
     * @param registry o registrador de endpoints STOMP.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // O cliente se conecta a este endpoint para iniciar a comunicação WebSocket
        registry.addEndpoint("/ws-chat").setAllowedOrigins("*"); // Permite conexões de qualquer origem
    }

    /**
     * Configura o broker de mensagens para o WebSocket.
     *
     * @param registry o registrador do broker de mensagens.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Habilita o broker simples para destinos que começam com "/topic" para enviar mensagens a todos os assinantes
        registry.enableSimpleBroker("/topic");

        // Define o prefixo para os destinos das mensagens enviadas pelo cliente ao servidor
        registry.setApplicationDestinationPrefixes("/app");
    }
}
