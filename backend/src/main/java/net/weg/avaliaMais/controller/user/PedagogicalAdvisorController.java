package net.weg.avaliaMais.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.user.PedagogicalAdvisorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users/pedagogical-advisor")
@RequiredArgsConstructor
public class PedagogicalAdvisorController {

    private final PedagogicalAdvisorService pedagogicalAdvisorService;

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



    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 4);
        Page<PedagogicalAdvisorResponseDTO> pedagogicalAdvisors = pedagogicalAdvisorService.findAllPedagogicalAdvisors(pageable);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }

    @GetMapping("/pedagogical-advisors")
    @Operation(summary = "Buscar conselheiros pedagógicos", description = "Busca conselheiros pedagógicos por nome e email")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisorsSpecificatiom(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        return ResponseEntity.ok(pedagogicalAdvisorService.findAllPedagogicalAdvisorSpecification(name, email, pageable));
    }

}
