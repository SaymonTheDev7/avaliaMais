package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
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
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor (@RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        return new ResponseEntity<>(pedagogicalAdvisorService.addPedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO), HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> updatePedagogicalAdvisor(@RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO updatedPedagogicalAdvisor = pedagogicalAdvisorService.updatePedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return new ResponseEntity<>(updatedPedagogicalAdvisor, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalAdvisorPerUsername (@PathVariable String username) {
        return new ResponseEntity<>(pedagogicalAdvisorService.deletePedagogicalAdvisorPerUsername(username), HttpStatus.OK);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> findPedagogicalAdvisorPerUsername(@PathVariable String username) {
        PedagogicalAdvisor pedagogicalAdvisor = pedagogicalAdvisorService.findPedagogicalAdvisorPerUsername(username);
        return new ResponseEntity<>(new PedagogicalAdvisorResponseDTO(pedagogicalAdvisor), HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        return new ResponseEntity<>(pedagogicalAdvisorService.findAllPedagogicalAdvisors(page, 4), HttpStatus.OK);
    }
}
