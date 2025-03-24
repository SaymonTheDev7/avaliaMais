package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.service.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping("/add")
    public ResponseEntity<TeacherResponseDTO> addTeacher(@RequestBody @Valid TeacherPostRequestDTO teacherPostRequestDTO) {
        TeacherResponseDTO response = teacherService.addTeacher(teacherPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    public ResponseEntity<TeacherResponseDTO> updateTeacher(@RequestBody @Valid TeacherPostRequestDTO teacherPostRequestDTO) {
        TeacherResponseDTO teacherResponseDTO = teacherService.updateTeacherPerName(teacherPostRequestDTO);
        return ResponseEntity.ok(teacherResponseDTO);
    }

    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteTeacherPerUUID(@PathVariable UUID uuid) {
        teacherService.deleteTeacherByUUID(uuid);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<TeacherResponseDTO> findTeacherPerUsername(@PathVariable String username) {
        TeacherResponseDTO teacherResponseDTO = teacherService.findTeacherByUsername(username);
        return teacherResponseDTO == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(teacherResponseDTO);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<TeacherResponseDTO>> findAllTeachers(@RequestParam int page) {
        Page<TeacherResponseDTO> teacherResponseDTOs = teacherService.findAllTeachers(page, 4);
        return ResponseEntity.ok(teacherResponseDTOs);
    }

    @GetMapping("/find/year")
    public ResponseEntity<Page<ClassResponseDTO>> findByYear(@RequestParam Integer year, Pageable pageable) {
        Page<ClassResponseDTO> classes = teacherService.findClassPerYear(year, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/location")
    public ResponseEntity<Page<ClassResponseDTO>> findByLocation(@RequestParam String location, Pageable pageable) {
        Page<ClassResponseDTO> classes = teacherService.findClassPerLocation(location, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/course")
    public ResponseEntity<Page<ClassResponseDTO>> findByCourse(@RequestParam String course, Pageable pageable) {
        Page<ClassResponseDTO> classes = teacherService.findClassesByCourse(course, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/shift")
    public ResponseEntity<Page<ClassResponseDTO>> findByShift(@RequestParam String shift, Pageable pageable) {
        Page<ClassResponseDTO> classes = teacherService.findClassPerShift(shift, pageable);
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

        Page<ClassResponseDTO> classes = teacherService.getByAdvancedFiltration(year, location, course, shift, pageable);

        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
