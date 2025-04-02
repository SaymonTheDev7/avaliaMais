package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("users/pedagogical-techniques")
@RequiredArgsConstructor
@Tag(name = "Pedagogical Techniques", description = "API para gerenciamento de técnicas pedagógicas")
public class PedagogicalTechniqueController {

    private final PedagogicalTechniqueService pedagogicalTechniqueService;


    @PostMapping("/add")
    @Operation(summary = "Adicionar uma técnica pedagógica", description = "Adiciona uma nova técnica pedagógica ao sistema.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> addPedagogicalTechnique(
            @RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO response = pedagogicalTechniqueService.addPedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    @Operation(summary = "Atualizar uma técnica pedagógica", description = "Atualiza uma técnica pedagógica existente.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> updatePedagogicalTechnique(
            @RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO updatedPedagogicalTechnique = pedagogicalTechniqueService.updatePedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalTechnique);
    }

    @DeleteMapping("/delete/{username}")
    @Operation(summary = "Excluir uma técnica pedagógica", description = "Remove uma técnica pedagógica pelo nome de usuário.")
    public ResponseEntity<String> deletePedagogicalTechniquePerUsername(@PathVariable String username) {
        String response = pedagogicalTechniqueService.deletePedagogicalTechniquePerUsername(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/{username}")
    @Operation(summary = "Buscar técnica pedagógica por usuário", description = "Retorna uma técnica pedagógica baseada no nome de usuário.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> findPedagogicalTechniquePerUsername(@PathVariable String username) {
        PedagogicalTechniqueResponseDTO pedagogicalTechnique = pedagogicalTechniqueService.findPedagogicalTechniquePerUsername(username);
        return pedagogicalTechnique == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(pedagogicalTechnique);
    }

    @GetMapping("/find/all")
    @Operation(summary = "Listar todas as técnicas pedagógicas", description = "Retorna uma lista paginada de todas as técnicas pedagógicas.")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findAllPedagogicalTechniques(
            @RequestParam(defaultValue = "0") int page) {
        Page<PedagogicalTechniqueResponseDTO> pedagogicalTechniques = pedagogicalTechniqueService.findAllPedagogicalTechniques(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
    }


    @GetMapping("/advanced-filtration")
    @Operation(summary = "Buscar técnicas pedagógicas com filtros", description = "Permite buscar técnicas pedagógicas filtrando por nome e email.")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findAllPedagogicalTechniquesSpecification(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        Page<PedagogicalTechniqueResponseDTO> results = pedagogicalTechniqueService.findAllPedagogicalTechniqueSpecification(name, email, pageable);
        return ResponseEntity.ok(results);
    }

}