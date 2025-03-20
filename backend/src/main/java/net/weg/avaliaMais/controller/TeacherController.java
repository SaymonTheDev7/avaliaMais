package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.service.TeacherService;
import org.springframework.data.domain.Page;
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
}
