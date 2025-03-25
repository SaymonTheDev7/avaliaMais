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

    @GetMapping("/find/year")
    public ResponseEntity<Page<ClassResponseDTO>> findByYear(@RequestParam Integer year, Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerYear(year, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/location")
    public ResponseEntity<Page<ClassResponseDTO>> findByLocation(@RequestParam String location, Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerLocation(location, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/course")
    public ResponseEntity<Page<ClassResponseDTO>> findByCourse(@RequestParam String course, Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassesByCourse(course, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/shift")
    public ResponseEntity<Page<ClassResponseDTO>> findByShift(@RequestParam String shift, Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerShift(shift, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/advanced-filtration")
    public ResponseEntity<Page<ClassResponseDTO>> findByFiltros(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String shift,
            Pageable pageable) {

        Page<ClassResponseDTO> classes = classService.getByAdvancedFiltration(year, location, course, shift, pageable);

        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    
}