package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.ClassUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.service.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping("/add")
    public ResponseEntity<ClassResponseDTO> addClass(@RequestBody @Valid ClassPostRequestDTO classPostRequestDTO) {
        ClassResponseDTO response = classService.addClass(classPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    public ResponseEntity<ClassResponseDTO> updateClass(@RequestBody @Valid ClassUpdateRequestDTO classUpdateRequestDTO) {
        ClassResponseDTO response = classService.updateClass(classUpdateRequestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{nameClass}")
    public ResponseEntity<String> deleteClassPerName(@PathVariable String nameClass) {
        classService.deleteClassPerName(nameClass);
        return ResponseEntity.ok("Turma deletada com sucesso");
    }

    @GetMapping("/find/{nameClass}")
    public ResponseEntity<ClassResponseDTO> findClassPerName(@PathVariable String nameClass) {
        ClassResponseDTO response = classService.findClassPerName(nameClass);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<ClassResponseDTO>> findAllClasses(@RequestParam int page) {
        Page<ClassResponseDTO> response = classService.findAllClasses(page, 4);
        return ResponseEntity.ok(response);
    }
}