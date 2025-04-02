package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.EventPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.EventResponseDTO;
import net.weg.avaliaMais.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping("/add")
    public ResponseEntity<EventResponseDTO> addEvent(@RequestBody EventPostRequestDTO eventPostRequestDTO) {
        EventResponseDTO eventResponseDTO = eventService.addEvent(eventPostRequestDTO);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @PutMapping("update/{uuid}")
    public ResponseEntity<EventResponseDTO> updateEventPerUUID(@PathVariable UUID uuid, @RequestBody EventPostRequestDTO eventPostRequestDTO) {
        EventResponseDTO eventResponseDTO = eventService.updateEventPerUUID(uuid, eventPostRequestDTO);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @GetMapping("get/{uuid}")
    public ResponseEntity<EventResponseDTO> findEventPerUUID(@PathVariable UUID uuid) {
        EventResponseDTO eventResponseDTO = eventService.findEventPerUUID(uuid);
        return ResponseEntity.ok(eventResponseDTO);
    }

    @GetMapping("findAll"
    )
    public ResponseEntity<Page<EventResponseDTO>> findAllEvents(@RequestParam int page, @RequestParam int size) {
        Page<EventResponseDTO> events = eventService.findAllEvents(page, size);
        return ResponseEntity.ok(events);
    }

    public ResponseEntity<String> deleteEventPerUUID(@PathVariable UUID uuid) {
        String response = eventService.deleteEventPerUUID(uuid);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/events/advanced-filtration")
    @Operation(summary = "Filtragem avançada de eventos", description = "Filtra eventos com base nos parâmetros de nome, data, status e etapa")
    @Tag(name = "Events", description = "Operações relacionadas com a busca de eventos com filtragem avançada")
    @ApiResponse(responseCode = "200", description = "Eventos filtrados retornados com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhum evento encontrado para os filtros informados")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<EventResponseDTO>> findAllEventsSpecification(
            @RequestParam(required = false) @Parameter(description = "Nome do evento para filtro", required = false) String name,
            @RequestParam(required = false) @Parameter(description = "Data do evento para filtro", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) @Parameter(description = "Status do evento para filtro", required = false) String status,
            @RequestParam(required = false) @Parameter(description = "Etapa do evento para filtro", required = false) String step,
            Pageable pageable) {

        Page<EventResponseDTO> events = eventService.findAllEventsSpecification(name, date, status, step, pageable);

        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(events);
    }


}
