package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.PedagogicalTechnique;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.PedagogicalTechniqueService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

    @GetMapping("/classes")
    public ResponseEntity<Page<ClassResponseDTO>> findClasses(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ClassResponseDTO> classes = pedagogicalTechniqueService.findClasses(year, course, shift, location, pageable);
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/pedagogical-advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findPedagogicalAdvisors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisorResponseDTO> advisors = pedagogicalTechniqueService.findPedagogicalAdvisor(name, email, pageable);
        return ResponseEntity.ok(advisors);
    }

    @GetMapping("/pedagogical-techniques")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findPedagogicalTechniques(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalTechniqueResponseDTO> techniques = pedagogicalTechniqueService.findPedagogicalTechnique(name, email, pageable);
        return ResponseEntity.ok(techniques);
    }

    @GetMapping("/teachers")
    public ResponseEntity<Page<TeacherResponseDTO>> findTeachers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<TeacherResponseDTO> teachers = pedagogicalTechniqueService.findTeachers(name, email, course, pageable);
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/students")
    public ResponseEntity<Page<StudentResponseDTO>> findStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UUID classUuid,
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<StudentResponseDTO> students = pedagogicalTechniqueService.findStudents(name, email, classUuid, course, pageable);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/courses")
    public ResponseEntity<Page<CourseResponseDTO>> findCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponseDTO> courses = pedagogicalTechniqueService.findCourses(name, shift, type, pageable);
        return ResponseEntity.ok(courses);
    }
}