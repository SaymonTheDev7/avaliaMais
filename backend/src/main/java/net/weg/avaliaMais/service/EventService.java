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
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Serviço responsável pelas operações de negócio relacionadas à entidade {@link Event}.
 * Oferece funcionalidades de criação, atualização, exclusão e consulta de eventos.
 */
@Service
@RequiredArgsConstructor
public class EventService {

    /** Repositório de eventos para operações no banco de dados. */
    private final EventRepository eventRepository;

    /**
     * Adiciona um novo evento ao sistema com base nos dados fornecidos.
     *
     * @param eventPostRequestDTO DTO contendo as informações do evento.
     * @return {@link EventResponseDTO} com os dados do evento salvo.
     */
    public EventResponseDTO addEvent(EventPostRequestDTO eventPostRequestDTO) {
        Event event = new Event();
        event.setName(eventPostRequestDTO.name());
        event.setDescription(eventPostRequestDTO.description());
        event.setDate(eventPostRequestDTO.date());
        event.setClasses(eventPostRequestDTO.classes());
        event.setTeachers(eventPostRequestDTO.teachers());
        event.setCourses(eventPostRequestDTO.courses());
        event.setStatus("Pendente");
        event.setStep("Pré-conselho da Turma"); // Exemplo de etapa inicial

        eventRepository.save(event);
        return new EventResponseDTO(event);
    }

    /**
     * Atualiza os dados de um evento existente no sistema com base no UUID fornecido.
     *
     * @param uuid identificador único do evento.
     * @param eventPostRequestDTO DTO com os novos dados do evento.
     * @return {@link EventResponseDTO} com os dados do evento atualizado.
     * @throws RuntimeException caso o evento não seja encontrado.
     */
    public EventResponseDTO updateEventPerUUID(UUID uuid, EventPostRequestDTO eventPostRequestDTO) {
        Event existingEvent = eventRepository.findByUuid(uuid);

        if (existingEvent == null) {
            throw new RuntimeException("Evento não encontrado");
        }

        existingEvent.setName(eventPostRequestDTO.name());
        existingEvent.setDescription(eventPostRequestDTO.description());
        existingEvent.setDate(eventPostRequestDTO.date());
        existingEvent.setClasses(eventPostRequestDTO.classes());
        existingEvent.setTeachers(eventPostRequestDTO.teachers());
        existingEvent.setCourses(eventPostRequestDTO.courses());
        existingEvent.setStatus(eventPostRequestDTO.status());
        existingEvent.setStep(eventPostRequestDTO.step());

        eventRepository.save(existingEvent);
        return new EventResponseDTO(existingEvent);
    }

    /**
     * Retorna um evento específico com base no UUID fornecido.
     *
     * @param uuid identificador único do evento.
     * @return {@link EventResponseDTO} com os dados do evento.
     * @throws RuntimeException caso o evento não seja encontrado.
     */
    public EventResponseDTO findEventPerUUID(UUID uuid) {
        Event event = eventRepository.findByUuid(uuid);
        if (event == null) {
            throw new RuntimeException("Evento não encontrado");
        }
        return new EventResponseDTO(event);
    }

    /**
     * Retorna todos os eventos cadastrados, com suporte à paginação.
     *
     * @param page número da página.
     * @param size quantidade de elementos por página.
     * @return página de {@link EventResponseDTO} contendo os eventos.
     */
    public Page<EventResponseDTO> findAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> eventPage = eventRepository.findAll(pageable);
        return eventPage.map(EventResponseDTO::new);
    }

    /**
     * Exclui um evento do sistema com base no UUID fornecido.
     *
     * @param uuid identificador único do evento.
     * @return mensagem indicando o resultado da operação.
     */
    public String deleteEventPerUUID(UUID uuid) {
        Event event = eventRepository.findByUuid(uuid);
        if (event == null) {
            return "Evento não encontrado";
        }
        eventRepository.delete(event);
        return "Evento deletado com sucesso";
    }

    /**
     * Retorna eventos filtrados por nome, data, status e etapa, com suporte à paginação.
     *
     * @param name   filtro por nome do evento (opcional).
     * @param date   filtro por data do evento (opcional).
     * @param status filtro por status do evento (opcional).
     * @param step   filtro por etapa do evento (opcional).
     * @param pageable objeto de paginação.
     * @return página de {@link EventResponseDTO} contendo os eventos filtrados.
     */
    public Page<EventResponseDTO> findAllEventsSpecification(String name, LocalDate date, String status, String step, Pageable pageable) {
        Specification<Event> filters = Specification.where(null);
        if (name != null && !name.trim().isEmpty()) filters = filters.and(EventSpecification.hasName(name));
        if (date != null) filters = filters.and(EventSpecification.hasDate(date));
        if (status != null && !status.trim().isEmpty()) filters = filters.and(EventSpecification.hasStatus(status));
        if (step != null && !step.trim().isEmpty()) filters = filters.and(EventSpecification.hasStep(step));

        return eventRepository.findAll(filters, pageable).map(EventResponseDTO::new);
    }
}
