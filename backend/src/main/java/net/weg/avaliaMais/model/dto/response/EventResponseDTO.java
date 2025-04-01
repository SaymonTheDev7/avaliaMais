package net.weg.avaliaMais.model.dto.response;

import net.weg.avaliaMais.model.Event;

public record EventResponseDTO(
        String name,
        String description,
        String status,
        String step,
        String date
) {
    public EventResponseDTO(Event event) {
        this(event.getName(), event.getDescription(), event.getStatus(), event.getStep(), event.getDate());
    }
}
