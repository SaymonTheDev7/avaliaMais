package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.user.SupervisorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller responsável pelos endpoints utilizados pelo Supervisor
 * para consultar dados como: estudantes, professores, turmas, cursos e demais usuários.
 */
@RestController
@RequestMapping("/users/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

    // ==================== PEDAGOGICAL ADVISORS ====================

    @Operation(summary = "Buscar orientadores pedagógicos", description = "Filtrar orientadores por nome e email com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de orientadores pedagógicos retornada com sucesso")
    })
    @GetMapping("/pedagogical-advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findPedagogicalAdvisors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findPedagogicalAdvisor(name, email, pageable));
    }

    // ==================== PEDAGOGICAL TECHNIQUES ====================

    @Operation(summary = "Buscar técnicas pedagógicas", description = "Filtrar técnicas por nome e email com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de técnicas pedagógicas retornada com sucesso")
    })
    @GetMapping("/pedagogical-techniques")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findPedagogicalTechniques(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findPedagogicalTechniques(name, email, pageable));
    }

    // ==================== PROFESSORES ====================

    @Operation(summary = "Buscar professores", description = "Filtrar professores por nome, email e curso com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de professores retornada com sucesso")
    })
    @GetMapping("/teachers")
    public ResponseEntity<Page<TeacherResponseDTO>> findTeachers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findTeachers(name, email, course, pageable));
    }

    // ==================== ALUNOS ====================

    @Operation(summary = "Buscar alunos", description = "Filtrar alunos por nome, email, turma (UUID) e curso com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso")
    })
    @GetMapping("/students")
    public ResponseEntity<Page<StudentResponseDTO>> findStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UUID classUuid,
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findStudents(name, email, classUuid, course, pageable));
    }

    // ==================== TURMAS ====================

    @Operation(summary = "Buscar turmas", description = "Filtrar turmas por ano, curso, turno e localização com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de turmas retornada com sucesso")
    })
    @GetMapping("/classes")
    public ResponseEntity<Page<ClassResponseDTO>> findClasses(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findClasses(year, course, shift, location, pageable));
    }

    // ==================== CURSOS ====================

    @Operation(summary = "Buscar cursos", description = "Filtrar cursos por nome, turno e tipo com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de cursos retornada com sucesso")
    })
    @GetMapping("/courses")
    public ResponseEntity<Page<CourseResponseDTO>> findCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(supervisorService.findCourses(name, shift, type, pageable));
    }

    // ==================== TODOS OS SUPERVISORES ====================

    @Operation(summary = "Buscar todos os supervisores", description = "Retorna todos os supervisores com paginação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de supervisores retornada com sucesso")
    })
    @GetMapping("/supervisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllSupervisors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(supervisorService.findAllSupervisors(page, size));
    }
}
