package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.service.PedagogicalTechniqueService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users/pedagogical-techniques")
@RequiredArgsConstructor
public class PedagogicalTechniqueController {

    private final PedagogicalTechniqueService pedagogicalTechniqueService;

    @PostMapping("/add")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> addPedagogicalTechnique(
            @RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO response = pedagogicalTechniqueService.addPedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> updatePedagogicalTechnique(@RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO updatedPedagogicalTechnique = pedagogicalTechniqueService.updatePedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalTechnique);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalTechniquePerUsername(@PathVariable String username) {
        String response = pedagogicalTechniqueService.deletePedagogicalTechniquePerUsername(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> findPedagogicalTechniquePerUsername(@PathVariable String username) {
        PedagogicalTechniqueResponseDTO pedagogicalTechnique = pedagogicalTechniqueService.findPedagogicalTechniquePerUsername(username);
        return pedagogicalTechnique == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(pedagogicalTechnique);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findAllPedagogicalTechniques(@RequestParam int page) {
        Page<PedagogicalTechniqueResponseDTO> pedagogicalTechniques = pedagogicalTechniqueService.findAllPedagogicalTechniques(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
    }
}
