package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.PedagogicalTechniquePostRequestDTO;
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
@RequestMapping("users/pedagogical-techniques")
@RequiredArgsConstructor
@Tag(name = "Pedagogical Techniques", description = "API para gerenciamento de técnicas pedagógicas")
public class PedagogicalTechniqueController {

    private final PedagogicalTechniqueService pedagogicalTechniqueService;
    private final ClassService classService;
    private final PedagogicalAdvisorService pedagogicalAdvisorService;
    private final TeacherService teacherService;
    private final StudentService studentService;
    private final CourseService courseService;
    private final SupervisorService supervisorService;
    private final EventService eventService;


    @PostMapping("/add")
    @Operation(summary = "Adicionar uma técnica pedagógica", description = "Adiciona uma nova técnica pedagógica ao sistema.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> addPedagogicalTechnique(
            @RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO response = pedagogicalTechniqueService.addPedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    @Operation(summary = "Atualizar uma técnica pedagógica", description = "Atualiza uma técnica pedagógica existente.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> updatePedagogicalTechnique(
            @RequestBody @Valid PedagogicalTechniquePostRequestDTO pedagogicalTechniquePostRequestDTO) {
        PedagogicalTechniqueResponseDTO updatedPedagogicalTechnique = pedagogicalTechniqueService.updatePedagogicalTechnique(pedagogicalTechniquePostRequestDTO);
        return ResponseEntity.ok(updatedPedagogicalTechnique);
    }

    @DeleteMapping("/delete/{username}")
    @Operation(summary = "Excluir uma técnica pedagógica", description = "Remove uma técnica pedagógica pelo nome de usuário.")
    public ResponseEntity<String> deletePedagogicalTechniquePerUsername(@PathVariable String username) {
        String response = pedagogicalTechniqueService.deletePedagogicalTechniquePerUsername(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/{username}")
    @Operation(summary = "Buscar técnica pedagógica por usuário", description = "Retorna uma técnica pedagógica baseada no nome de usuário.")
    public ResponseEntity<PedagogicalTechniqueResponseDTO> findPedagogicalTechniquePerUsername(@PathVariable String username) {
        PedagogicalTechniqueResponseDTO pedagogicalTechnique = pedagogicalTechniqueService.findPedagogicalTechniquePerUsername(username);
        return pedagogicalTechnique == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(pedagogicalTechnique);
    }

    @GetMapping("/find/all")
    @Operation(summary = "Listar todas as técnicas pedagógicas", description = "Retorna uma lista paginada de todas as técnicas pedagógicas.")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findAllPedagogicalTechniques(
            @RequestParam(defaultValue = "0") int page) {
        Page<PedagogicalTechniqueResponseDTO> pedagogicalTechniques = pedagogicalTechniqueService.findAllPedagogicalTechniques(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
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