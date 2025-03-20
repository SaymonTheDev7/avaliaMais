package net.weg.avaliaMais.controller;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.PedagogicalTechniqueResponseDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<StudentResponseDTO> addStudent (@RequestBody @Valid StudentPostRequestDTO studentPostRequestDTO) {
        return new ResponseEntity<>(studentService.addStudent(studentPostRequestDTO), HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<StudentResponseDTO> updateStudentPerName(@RequestBody @Valid StudentPostRequestDTO studentPostRequestDTO) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentPerName(studentPostRequestDTO);
        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteStudentPerUUID (@PathVariable UUID uuid) {
        studentService.deleteStudentByUUID(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/username/{username}")
    public ResponseEntity<StudentResponseDTO> findStudentPerUsername (@PathVariable String username) {
        return new ResponseEntity<>(studentService.findStudentByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<Page<StudentResponseDTO>> findAllStudents(@RequestParam int page) {
        return new ResponseEntity<>(studentService.findAllStudents(page, 4), HttpStatus.OK);
    }
}
