package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Event;

/**
 * DTO de resposta para um evento.
 * <p>
 * Essa classe é responsável por transportar as informações de um evento
 * da camada de modelo para a camada de apresentação (API).
 *
 * @param name        Nome do evento.
 * @param description Descrição detalhada do evento.
 * @param status      Status atual do evento (ex: ativo, concluído, pendente).
 * @param step        Etapa atual do evento.
 * @param date        Data associada ao evento (formato textual, geralmente ISO ou customizado).
 */
public record EventResponseDTO(
        String name,
        String description,
        String status,
        String step,
        String date
) {

    /**
     * Construtor que converte uma entidade {@link Event} em um DTO de resposta {@link EventResponseDTO}.
     *
     * @param event A entidade {@link Event} que será convertida.
     */
    public EventResponseDTO(Event event) {
        this(
                event.getName(),
                event.getDescription(),
                event.getStatus(),
                event.getStep(),
                event.getDate()
        );
    }
}
