package net.weg.avaliaMais.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.model.dto.response.SupervisorResponseDTO;
import net.weg.avaliaMais.service.SupervisorService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllPedagogicalTechniques(@RequestParam int page) {
        Page<SupervisorResponseDTO> pedagogicalTechniques = supervisorService.findAllPedagogicalAdvisors(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
    }
}
