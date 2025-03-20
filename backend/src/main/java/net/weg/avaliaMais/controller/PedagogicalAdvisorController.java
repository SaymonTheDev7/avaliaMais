package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.service.PedagogicalAdvisorService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users/pedagogical-advisor")
@RequiredArgsConstructor
public class PedagogicalAdvisorController {

    private final PedagogicalAdvisorService pedagogicalAdvisorService;

    @PostMapping("/add")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor(
            @RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO response = pedagogicalAdvisorService.addPedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> updatePedagogicalAdvisor(@RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO updatedPedagogicalAdvisor = pedagogicalAdvisorService.updatePedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalAdvisor);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalAdvisorPerUsername(@PathVariable String username) {
        String response = pedagogicalAdvisorService.deletePedagogicalAdvisorPerUsername(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> findPedagogicalAdvisorPerUsername(@PathVariable String username) {
        PedagogicalAdvisor pedagogicalAdvisor = pedagogicalAdvisorService.findPedagogicalAdvisorPerUsername(username);
        return pedagogicalAdvisor == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(new PedagogicalAdvisorResponseDTO(pedagogicalAdvisor));
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Page<PedagogicalAdvisorResponseDTO> pedagogicalAdvisors = pedagogicalAdvisorService.findAllPedagogicalAdvisors(page, 4);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }
}
