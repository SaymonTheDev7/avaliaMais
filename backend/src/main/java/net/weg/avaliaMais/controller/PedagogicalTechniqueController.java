package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalAdvisor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalAdvisorResponseDTO;
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
    public ResponseEntity<PedagogicalTechniqueResponseDTO> addPedagogicalTechnique (@RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        return new ResponseEntity<>(pedagogicalTechniqueService.addPedagogicalTechnique(pedagogicalTechniquePostRequestDTO), HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> updatePedagogicalTechnique(@RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO updatedPedagogicalTechnique = pedagogicalTechniqueService.updatePedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return new ResponseEntity<>(updatedPedagogicalTechnique, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalTechniquePerUsername (@PathVariable String username) {
        return new ResponseEntity<>(pedagogicalTechniqueService.deletePedagogicalTechniquePerUsername(username), HttpStatus.OK);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> findPedagogicalTechniquePerUsername (@PathVariable String username) {
        PedagogicalTechnique pedagogicalTechnique = pedagogicalTechniqueService.findPedagogicalTechniquePerUsername(username);
        return new ResponseEntity<>(new PedagogicalTechniqueResponseDTO(pedagogicalTechnique), HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findAllPedagogicalTechniques(@RequestParam int page) {
        return new ResponseEntity<>(pedagogicalTechniqueService.findAllPedagogicalTechniques(page, 4), HttpStatus.OK);
    }
}
