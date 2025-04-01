package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Event;
import net.weg.avaliaMais.model.dto.request.EventPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.EventResponseDTO;
import net.weg.avaliaMais.repository.EventRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public EventResponseDTO createEvent(EventPostRequestDTO eventPostRequestDTO) {
        Event event = new Event();
        event.setName(eventPostRequestDTO.name());  // Correção aqui
        event.setDescription(eventPostRequestDTO.description());  // Correção aqui
        event.setDate(eventPostRequestDTO.date());  // Correção aqui
        event.setClasses(eventPostRequestDTO.classes());  // Correção aqui
        event.setTeachers(eventPostRequestDTO.teachers());  // Correção aqui
        event.setCourses(eventPostRequestDTO.courses());  // Correção aqui
        event.setStatus("Pendente");
        event.setStep("Pré-conselho da Turma"); // Exemplo de etapa inicial

        eventRepository.save(event);
        return new EventResponseDTO(event);
    }

    public EventResponseDTO updateEvent(UUID uuid, EventPostRequestDTO eventPostRequestDTO) {
        Event existingEvent = eventRepository.findByUuid(uuid);

        if (existingEvent == null) {
            throw new RuntimeException("Evento não encontrado");
        }

        existingEvent.setName(eventPostRequestDTO.name());  // Correção aqui
        existingEvent.setDescription(eventPostRequestDTO.description());  // Correção aqui
        existingEvent.setDate(eventPostRequestDTO.date());  // Correção aqui
        existingEvent.setClasses(eventPostRequestDTO.classes());  // Correção aqui
        existingEvent.setTeachers(eventPostRequestDTO.teachers());  // Correção aqui
        existingEvent.setCourses(eventPostRequestDTO.courses());  // Correção aqui
        existingEvent.setStatus(eventPostRequestDTO.status());  // Correção aqui
        existingEvent.setStep(eventPostRequestDTO.step());  // Correção aqui

        eventRepository.save(existingEvent);
        return new EventResponseDTO(existingEvent);
    }

    public EventResponseDTO getEventByUUID(UUID uuid) {
        Event event = eventRepository.findByUuid(uuid);
        if (event == null) {
            throw new RuntimeException("Evento não encontrado");
        }
        return new EventResponseDTO(event);
    }

    public List<EventResponseDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map(EventResponseDTO::new).toList();
    }
}
