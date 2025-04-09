package net.weg.avaliaMais.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.SupervisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.user.SupervisorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

    @PostMapping("/add")
    public ResponseEntity<SupervisorResponseDTO> addSupervisor(@RequestBody @Valid SupervisorPostRequestDTO dto) {
        SupervisorResponseDTO response = supervisorService.addSupervisor(dto);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/find/all")
    @Operation(summary = "Listar todos os supervisores", description = "Retorna uma lista paginada de supervisores")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllSupervisors(@RequestParam int page) {
        Page<SupervisorResponseDTO> supervisors = supervisorService.findAllSupervisors(page, 4);
        return ResponseEntity.ok(supervisors);
    }

    @GetMapping("/advanced-filtration")
    @Operation(summary = "Buscar supervisores com filtros", description = "Busca supervisores por nome e email")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllSupervisorsSpecification(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        Page<SupervisorResponseDTO> supervisors = supervisorService.findAllSupervisorsSpecification(name, email, pageable);
        return ResponseEntity.ok(supervisors);
    }

}
