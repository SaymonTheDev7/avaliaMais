package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/users/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final PedagogicalTechniqueService pedagogicalTechniqueService;
    private final ClassService classService;
    private final PedagogicalAdvisorService pedagogicalAdvisorService;
    private final TeacherService teacherService;
    private final StudentService studentService;
    private final CourseService courseService;
    private final SupervisorService supervisorService;
    private final EventService eventService;

    @GetMapping("/find/advisor")
    public ResponseEntity<SupervisorResponseDTO> findPedagogicalAdvisorPerUsernameOrEmail(
            @RequestParam String username, @RequestParam String email) {
        return ResponseEntity.ok(supervisorService.findPedagogicalAdvisorPerUsernameOrEmail(username, email));
    }

    @GetMapping("/find/technique")
    public ResponseEntity<SupervisorResponseDTO> findPedagogicalTechniquePerUsernameOrEmail(
            @RequestParam String username, @RequestParam String email) {
        return ResponseEntity.ok(supervisorService.findPedagogicalTechniquePerUsernameOrEmail(username, email));
    }

    @GetMapping("/find/teacher")
    public ResponseEntity<SupervisorResponseDTO> findTeacherPerUsernameOrEmail(
            @RequestParam String username, @RequestParam String email) {
        return ResponseEntity.ok(supervisorService.findTeacherPerUsernameOrEmail(username, email));
    }

    @GetMapping("/find/student")
    public ResponseEntity<SupervisorResponseDTO> findStudentPerUsernameOrEmail(
            @RequestParam String username, @RequestParam String email) {
        return ResponseEntity.ok(supervisorService.findStudentPerUsernameOrEmail(username, email));
    }

    @GetMapping("/find/supervisor")
    public ResponseEntity<SupervisorResponseDTO> findSupervisorPerUsernameOrEmail(
            @RequestParam String username, @RequestParam String email) {
        return ResponseEntity.ok(supervisorService.findSupervisorPerUsernameOrEmail(username, email));
    }

    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Page<SupervisorResponseDTO> pedagogicalAdvisors = supervisorService.findAllPedagogicalAdvisors(page, 4);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }

    @Operation(summary = "Find all Pedagogical Techniques", description = "Retrieve all pedagogical techniques with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of pedagogical techniques")
    })
    @GetMapping("/find/all/techniques")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllPedagogicalTechniques(@RequestParam int page) {
        Page<SupervisorResponseDTO> pedagogicalTechniques = supervisorService.findAllPedagogicalTechniques(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
    }

    @Operation(summary = "Find all Classes", description = "Retrieve all classes with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of classes")
    })
    @GetMapping("/find/all/classes")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllClasses(@RequestParam int page) {
        Page<SupervisorResponseDTO> classes = supervisorService.findAllClasses(page, 4);
        return ResponseEntity.ok(classes);
    }

    @Operation(summary = "Find all Courses", description = "Retrieve all courses with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of courses")
    })
    @GetMapping("/find/all/courses")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllCourses(@RequestParam int page) {
        Page<SupervisorResponseDTO> courses = supervisorService.findAllCourses(page, 4);
        return ResponseEntity.ok(courses);
    }

    @Operation(summary = "Find all Teachers", description = "Retrieve all teachers with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of teachers")
    })
    @GetMapping("/find/all/teachers")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllTeachers(@RequestParam int page) {
        Page<SupervisorResponseDTO> teachers = supervisorService.findAllTeachers(page, 4);
        return ResponseEntity.ok(teachers);
    }

    @Operation(summary = "Find all Students", description = "Retrieve all students with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of students")
    })
    @GetMapping("/find/all/students")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllStudents(@RequestParam int page) {
        Page<SupervisorResponseDTO> students = supervisorService.findAllStudents(page, 4);
        return ResponseEntity.ok(students);
    }

    @Operation(summary = "Find all Supervisors", description = "Retrieve all supervisors with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of supervisors")
    })
    @GetMapping("/find/all/supervisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllSupervisors(@RequestParam int page) {
        Page<SupervisorResponseDTO> supervisors = supervisorService.findAllSupervisors(page, 4);
        return ResponseEntity.ok(supervisors);
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
