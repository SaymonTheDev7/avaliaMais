package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.SupervisorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;

<<<<<<< HEAD
    @Operation(summary = "Find all Pedagogical Advisors", description = "Retrieve all pedagogical advisors with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of pedagogical advisors"),
            @ApiResponse(responseCode = "400", description = "Invalid request parameters")
    })
=======
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

    @GetMapping("/find/class")
    public ResponseEntity<SupervisorResponseDTO> findClassPerShift(@RequestParam String workShift) {
        return ResponseEntity.ok(supervisorService.findClassPerShift(workShift));
    }


>>>>>>> 621fc38809b22b7904290100618ec88d5a60329c
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

    @Operation(summary = "Find Classes", description = "Retrieve classes based on optional filters (year, course, shift, location) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of classes")
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
        Page<ClassResponseDTO> classes = supervisorService.findClasses(year, course, shift, location, pageable);
        return ResponseEntity.ok(classes);
    }

    @Operation(summary = "Find Pedagogical Advisors", description = "Search for pedagogical advisors based on optional filters (name, email) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of pedagogical advisors")
    })
    @GetMapping("/pedagogical-advisors")
    public ResponseEntity<Page<PedagogicalAdvisorResponseDTO>> findPedagogicalAdvisors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalAdvisorResponseDTO> advisors = supervisorService.findPedagogicalAdvisor(name, email, pageable);
        return ResponseEntity.ok(advisors);
    }

    @Operation(summary = "Find Pedagogical Techniques", description = "Search for pedagogical techniques based on optional filters (name, email) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of pedagogical techniques")
    })
    @GetMapping("/pedagogical-techniques")
    public ResponseEntity<Page<PedagogicalTechniqueResponseDTO>> findPedagogicalTechniques(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PedagogicalTechniqueResponseDTO> techniques = supervisorService.findPedagogicalTechnique(name, email, pageable);
        return ResponseEntity.ok(techniques);
    }

    @Operation(summary = "Find Teachers", description = "Search for teachers based on optional filters (name, email, course) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of teachers")
    })
    @GetMapping("/teachers")
    public ResponseEntity<Page<TeacherResponseDTO>> findTeachers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<TeacherResponseDTO> teachers = supervisorService.findTeachers(name, email, course, pageable);
        return ResponseEntity.ok(teachers);
    }

    @Operation(summary = "Find Students", description = "Search for students based on optional filters (name, email, classUuid, course) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of students")
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
        Page<StudentResponseDTO> students = supervisorService.findStudents(name, email, classUuid, course, pageable);
        return ResponseEntity.ok(students);
    }

    @Operation(summary = "Find Courses", description = "Search for courses based on optional filters (name, shift, type) with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the filtered list of courses")
    })
    @GetMapping("/courses")
    public ResponseEntity<Page<CourseResponseDTO>> findCourses(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponseDTO> courses = supervisorService.findCourses(name, shift, type, pageable);
        return ResponseEntity.ok(courses);
    }
}
