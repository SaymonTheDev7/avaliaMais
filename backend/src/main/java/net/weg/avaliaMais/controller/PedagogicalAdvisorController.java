package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.PedagogicalAdvisorService;
import net.weg.avaliaMais.service.PedagogicalTechniqueService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users/pedagogical-advisor")
@RequiredArgsConstructor
public class PedagogicalAdvisorController {

    private final PedagogicalAdvisorService pedagogicalAdvisorService;
    private final PedagogicalTechniqueService pedagogicalTechniqueService;

    @Operation(summary = "Add a new pedagogical advisor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pedagogical Advisor created",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PedagogicalAdvisorResponseDTO.class)))
    })
    @PostMapping("/add")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor(
            @RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO response = pedagogicalAdvisorService.addPedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Update an existing pedagogical advisor")
    @PatchMapping("/update")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> updatePedagogicalAdvisor(
            @RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO updatedPedagogicalAdvisor = pedagogicalAdvisorService.updatePedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalAdvisor);
    }

    @Operation(summary = "Delete a pedagogical advisor by username")
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalAdvisorPerUsername(@PathVariable String username) {
        String response = pedagogicalAdvisorService.deletePedagogicalAdvisorPerUsername(username);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Find a pedagogical advisor by username or email")
    @GetMapping("/find/{username}/{email}")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> findPedagogicalAdvisorPerUsernameOrEmail(
            @PathVariable String username, @PathVariable String email) {
        PedagogicalAdvisorResponseDTO pedagogicalAdvisor = pedagogicalAdvisorService.findPedagogicalAdvisorPerUsernameOrEmail(username, email);
        return pedagogicalAdvisor == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(pedagogicalAdvisor);
    }

    @Operation(summary = "Find all pedagogical advisors")
    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Page<PedagogicalAdvisorResponseDTO> pedagogicalAdvisors = pedagogicalAdvisorService.findAllPedagogicalAdvisors(page, 4);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }
}
