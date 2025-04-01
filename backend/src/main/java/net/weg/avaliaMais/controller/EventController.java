package net.weg.avaliaMais.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.EventPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.EventResponseDTO;
import net.weg.avaliaMais.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventResponseDTO> createEvent(@RequestBody EventPostRequestDTO eventPostRequestDTO) {
        EventResponseDTO eventResponseDTO = eventService.createEvent(eventPostRequestDTO);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @PutMapping("update/{uuid}")
    public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable UUID uuid, @RequestBody EventPostRequestDTO eventPostRequestDTO) {
        EventResponseDTO eventResponseDTO = eventService.updateEvent(uuid, eventPostRequestDTO);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @GetMapping("get/{uuid}")
    public ResponseEntity<EventResponseDTO> getEvent(@PathVariable UUID uuid) {
        EventResponseDTO eventResponseDTO = eventService.getEventByUUID(uuid);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @GetMapping("findAll"
    )
    public ResponseEntity<Page<EventResponseDTO>> findAllEvents(@RequestParam int page, @RequestParam int size) {
        Page<EventResponseDTO> events = eventService.findAllEvents(page, size);
        return ResponseEntity.ok(events);
    }

    public ResponseEntity<String> deleteEvent(@PathVariable UUID uuid) {
        String response = eventService.deleteByUUID(uuid);
        return ResponseEntity.ok(response);
    }
}
