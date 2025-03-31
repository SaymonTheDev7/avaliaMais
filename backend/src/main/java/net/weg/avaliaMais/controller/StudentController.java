package net.weg.avaliaMais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users/student")
@RequiredArgsConstructor
@Tag(name = "Student Controller", description = "Gerencia operações relacionadas a estudantes")
public class StudentController {

    private final StudentService studentService;

    @Operation(summary = "Adicionar um novo estudante", description = "Cria e retorna um novo estudante com base nos dados fornecidos")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Estudante criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PostMapping("/add")
    public ResponseEntity<StudentResponseDTO> addStudent(@RequestBody @Valid StudentPostRequestDTO studentPostRequestDTO) {
        StudentResponseDTO response = studentService.addStudent(studentPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Atualizar estudante pelo nome", description = "Atualiza as informações de um estudante com base no nome fornecido")
    @PatchMapping("/update")
    public ResponseEntity<StudentResponseDTO> updateStudentPerName(@RequestBody @Valid StudentPostRequestDTO studentPostRequestDTO) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentPerName(studentPostRequestDTO);
        return ResponseEntity.ok(studentResponseDTO);
    }

    @Operation(summary = "Deletar estudante pelo UUID", description = "Remove um estudante do sistema com base no UUID")
    @Transactional
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteStudentPerUUID(@PathVariable UUID uuid) {
        studentService.deleteStudentByUUID(uuid);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Buscar estudante pelo username", description = "Retorna um estudante com base no username fornecido")
    @GetMapping("/find/username/{username}")
    public ResponseEntity<StudentResponseDTO> findStudentPerUsername(@PathVariable String username) {
        StudentResponseDTO studentResponseDTO = studentService.findStudentByUsername(username);
        return studentResponseDTO == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(studentResponseDTO);
    }

    @Operation(summary = "Buscar todos os estudantes", description = "Retorna uma lista paginada de todos os estudantes")
    @GetMapping("/find/all")
    public ResponseEntity<Page<StudentResponseDTO>> findAllStudents(@RequestParam int page) {
        Page<StudentResponseDTO> studentResponseDTOs = studentService.findAllStudents(page, 4);
        return ResponseEntity.ok(studentResponseDTOs);
    }

    @Operation(summary = "Buscar turmas de um estudante", description = "Retorna as turmas associadas a um estudante específico")
    @GetMapping("/{studentUuid}/classes")
    public ResponseEntity<Page<ClassResponseDTO>> findStudentClasses(
            @PathVariable UUID studentUuid,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ClassResponseDTO> studentClasses = studentService.findStudentClasses(studentUuid, year, course, shift, location, pageable);
        return ResponseEntity.ok(studentClasses);
    }
}
