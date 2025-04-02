package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalAdvisorPostRequestDTO;
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
@RequestMapping("users/pedagogical-advisor")
@RequiredArgsConstructor
public class PedagogicalAdvisorController {

    private final PedagogicalTechniqueService pedagogicalTechniqueService;
    private final ClassService classService;
    private final PedagogicalAdvisorService pedagogicalAdvisorService;
    private final TeacherService teacherService;
    private final StudentService studentService;
    private final CourseService courseService;
    private final SupervisorService supervisorService;
    private final EventService eventService;


    @Operation(summary = "Add a new pedagogical advisor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pedagogical Advisor created",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PedagogicalAdvisorResponseDTO.class)))
    })
    @PostMapping("/add")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> addPedagogicalAdvisor(
            @RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO response = pedagogicalAdvisorService.addPedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Update an existing pedagogical advisor")
    @PatchMapping("/update")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> updatePedagogicalAdvisor(
            @RequestBody @Valid PedagogicalAdvisorPostRequestDTO pedagogicalAdvisorPostRequestDTO) {
        PedagogicalAdvisorResponseDTO updatedPedagogicalAdvisor = pedagogicalAdvisorService.updatePedagogicalAdvisor(pedagogicalAdvisorPostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalAdvisor);
    }

    @Operation(summary = "Delete a pedagogical advisor by username")
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deletePedagogicalAdvisorPerUsername(@PathVariable String username) {
        String response = pedagogicalAdvisorService.deletePedagogicalAdvisorPerUsername(username);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Find a pedagogical advisor by username or email")
    @GetMapping("/find/{username}/{email}")
    public ResponseEntity<PedagogicalAdvisorResponseDTO> findPedagogicalAdvisorPerUsernameOrEmail(
            @PathVariable String username, @PathVariable String email) {
        PedagogicalAdvisorResponseDTO pedagogicalAdvisor = pedagogicalAdvisorService.findPedagogicalAdvisorPerUsernameOrEmail(username, email);
        return pedagogicalAdvisor == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(pedagogicalAdvisor);
    }

    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 4);
        Page<PedagogicalAdvisorResponseDTO> pedagogicalAdvisors = pedagogicalAdvisorService.findAllPedagogicalAdvisors(pageable);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }

    @GetMapping("/classes")
    @Operation(summary = "Buscar turmas", description = "Busca turmas com filtros opcionais")
    public ResponseEntity<Page<ClassResponseDTO>> findClasses(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String location,
            Pageable pageable) {
        return ResponseEntity.ok(classService.findClasses(year, course, shift, location, pageable));
    }

    @GetMapping("/pedagogical-advisors")
    @Operation(summary = "Buscar conselheiros pedagógicos", description = "Busca conselheiros pedagógicos por nome e email")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findPedagogicalAdvisors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        return ResponseEntity.ok(pedagogicalAdvisorService.findPedagogicalAdvisor(name, email, pageable));
    }

    @GetMapping("/pedagogical-techniques")
    @Operation(summary = "Buscar técnicas pedagógicas", description = "Busca técnicas pedagógicas por nome e email")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findPedagogicalTechniques(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        return ResponseEntity.ok(pedagogicalTechniqueService.findPedagogicalTechnique(name, email, pageable));
    }

    @GetMapping("/teachers")
    @Operation(summary = "Buscar professores", description = "Busca professores por nome, email e curso")
    public ResponseEntity<Page<TeacherResponseDTO>> findTeachers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String course,
            Pageable pageable) {
        return ResponseEntity.ok(teacherService.findTeachers(name, email, course, pageable));
    }

    @GetMapping("/students")
    @Operation(summary = "Buscar alunos", description = "Busca alunos por nome, email, turma e curso")
    public ResponseEntity<Page<StudentResponseDTO>> findStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UUID classUuid,
            @RequestParam(required = false) String course,
            Pageable pageable) {
        return ResponseEntity.ok(studentService.findStudents(name, email, classUuid, course, pageable));
    }

    @GetMapping("/courses")
    @Operation(summary = "Buscar cursos", description = "Busca cursos por nome, turno e tipo")
    public ResponseEntity<Page<CourseResponseDTO>> findCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String type,
            Pageable pageable) {
        return ResponseEntity.ok(courseService.findCourses(name, shift, type, pageable));
    }

    @GetMapping("/supervisors")
    @Operation(summary = "Buscar supervisores", description = "Busca supervisores por nome e email")
    public ResponseEntity<Page<SupervisorResponseDTO>> findSupervisors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {
        return ResponseEntity.ok(supervisorService.findSupervisors(name, email, pageable));
    }

    @GetMapping("/events")
    @Operation(summary = "Buscar eventos", description = "Busca eventos por nome, data, status e etapa")
    public ResponseEntity<Page<EventResponseDTO>> findEvents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String step,
            Pageable pageable) {
        return ResponseEntity.ok(eventService.findEvents(name, date, status, step, pageable));
    }

}
