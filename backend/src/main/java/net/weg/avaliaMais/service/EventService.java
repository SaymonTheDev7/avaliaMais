package net.weg.avaliaMais.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.Event;
import net.weg.avaliaMais.model.dto.request.EventPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.EventResponseDTO;
import net.weg.avaliaMais.repository.EventRepository;
import net.weg.avaliaMais.repository.specification.EventSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
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

    public Page<EventResponseDTO> findAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> eventPage = eventRepository.findAll(pageable);
        return eventPage.map(EventResponseDTO::new);
    }

    public String deleteByUUID(UUID uuid) {
        Event event = eventRepository.findByUuid(uuid);
        if (event == null) {
            return "Evento não encontrado";
        }
        eventRepository.delete(event);
        return "Evento deletado com sucesso";
    }

    public Page<EventResponseDTO> findEvents(String name, LocalDate date, String status, String step, Pageable pageable) {
        Specification<Event> filters = Specification.where(null);
        if (name != null && !name.trim().isEmpty()) filters = filters.and(EventSpecification.hasName(name));
        if (date != null) filters = filters.and(EventSpecification.hasDate(date));
        if (status != null && !status.trim().isEmpty()) filters = filters.and(EventSpecification.hasStatus(status));
        if (step != null && !step.trim().isEmpty()) filters = filters.and(EventSpecification.hasStep(step));

        return eventRepository.findAll(filters, pageable).map(EventResponseDTO::new);
    }
}
