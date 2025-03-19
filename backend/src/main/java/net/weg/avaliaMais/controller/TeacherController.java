package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
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
    public TeacherResponseDTO addTeacher(TeacherPostRequestDTO teacherPostRequestDTO) {
        return teacherService.addTeacher(teacherPostRequestDTO);
    }

    @PatchMapping("/update")
    public ResponseEntity<TeacherResponseDTO> updateTeacher(@RequestBody @Valid TeacherPostRequestDTO teacherPostRequestDTO) {
        TeacherResponseDTO teacherResponseDTO = teacherService.updateTeacher(teacherPostRequestDTO);
        return new ResponseEntity<>(teacherResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteTeacherPerUUID (@PathVariable UUID uuid) {
        teacherService.deleteTeacherByUUID(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<TeacherResponseDTO> findTeacherPerUsername (@PathVariable String username) {
        return new ResponseEntity<>(teacherService.findTeacherByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<TeacherResponseDTO>> findAllTeachers(@RequestParam int page) {
        return new ResponseEntity<>(teacherService.findAllTeachers(page, 4), HttpStatus.OK);
    }
}
