package net.weg.avaliaMais.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.response.*;
import net.weg.avaliaMais.service.PedagogicalAdvisorService;
import net.weg.avaliaMais.service.PedagogicalTechniqueService;
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

    @GetMapping("/find/all/advisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllPedagogicalAdvisors(@RequestParam int page) {
        Page<SupervisorResponseDTO> pedagogicalAdvisors = supervisorService.findAllPedagogicalAdvisors(page, 4);
        return ResponseEntity.ok(pedagogicalAdvisors);
    }

    @GetMapping("/find/all/techniques")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllPedagogicalTechniques(@RequestParam int page) {
        Page<SupervisorResponseDTO> pedagogicalTechniques = supervisorService.findAllPedagogicalTechniques(page, 4);
        return ResponseEntity.ok(pedagogicalTechniques);
    }

    @GetMapping("/find/all/classes")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllClasses(@RequestParam int page) {
        Page<SupervisorResponseDTO> classes = supervisorService.findAllClasses(page, 4);
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/find/all/courses")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllCourses(@RequestParam int page) {
        Page<SupervisorResponseDTO> courses = supervisorService.findAllCourses(page, 4);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/find/all/teachers")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllTeachers(@RequestParam int page) {
        Page<SupervisorResponseDTO> teachers = supervisorService.findAllTeachers(page, 4);
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/find/all/students")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllStudents(@RequestParam int page) {
        Page<SupervisorResponseDTO> students = supervisorService.findAllStudents(page, 4);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/find/all/supervisors")
    public ResponseEntity<Page<SupervisorResponseDTO>> findAllSupervisors(@RequestParam int page) {
        Page<SupervisorResponseDTO> supervisors = supervisorService.findAllSupervisors(page, 4);
        return ResponseEntity.ok(supervisors);
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
        Page<ClassResponseDTO> classes = supervisorService.findClasses(year, course, shift, location, pageable);
        return ResponseEntity.ok(classes);
    }

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

