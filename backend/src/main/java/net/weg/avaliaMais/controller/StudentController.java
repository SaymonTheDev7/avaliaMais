package net.weg.avaliaMais.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("users/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<StudentResponseDTO> addStudent (@RequestBody @Valid StudentPostRequestDTO studentPostRequestDTO) {
        return new ResponseEntity<>(studentService.addStudent(studentPostRequestDTO), HttpStatus.CREATED);
    }
}
