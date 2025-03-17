package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
import net.weg.avaliaMais.service.PedagogicalAdvisorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("users/pedagogical-advisor")
@RequiredArgsConstructor
public class PedagogicalAdvisorController {

    private final PedagogicalAdvisorService pedagogicalAdvisorService;

    @PostMapping("/add")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor (@RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        return new ResponseEntity<>(pedagogicalAdvisorService.addPedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO), HttpStatus.CREATED);
    }
}
