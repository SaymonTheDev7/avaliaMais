package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.service.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping("/add")
    public ResponseEntity<ClassResponseDTO> addClass(@RequestBody @Valid ClassPostRequestDTO classPostRequestDTO) {
        return new ResponseEntity<>(classService.addClass(classPostRequestDTO), HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<ClassResponseDTO> updateClass(@RequestBody @Valid ClassPostRequestDTO classPostRequestDTO) {
        return new ResponseEntity<>(classService.updateClass(classPostRequestDTO), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{nameClass}")
    public ResponseEntity<String> deleteClassPerName(@PathVariable String nameClass) {
        classService.deleteClassPerName(nameClass);
        return new ResponseEntity<>("Class deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/find/{nameClass}")
    public ResponseEntity<ClassResponseDTO> findClassPerName(@PathVariable String nameClass) {
        return new ResponseEntity<>(classService.findClassPerName(nameClass), HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<ClassResponseDTO>> findAllClasses(@RequestParam int page) {
        return new ResponseEntity<>(classService.findAllClasses(page, 4), HttpStatus.OK);
    }
}
