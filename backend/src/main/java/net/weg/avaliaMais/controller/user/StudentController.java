package net.weg.avaliaMais.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.StudentPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.model.dto.response.StudentResponseDTO;
import net.weg.avaliaMais.service.user.StudentService;
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


    @Operation(summary = "Deletar estudante pelo UUID", description = "Remove um estudante do sistema com base no UUID")
    @Transactional
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteStudentPerUUID(@PathVariable UUID uuid) {
        studentService.deleteStudentByUUID(uuid);
        return ResponseEntity.ok().build();
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

    @GetMapping("/advanced-filtration")
    @Operation(summary = "Filtragem avançada de alunos", description = "Filtra alunos com base nos parâmetros fornecidos.")
    @Tag(name = "Students", description = "Operações relacionadas com a busca de alunos com filtragem avançada")
    @ApiResponse(responseCode = "200", description = "Alunos filtrados retornados com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhum aluno encontrado para os filtros informados")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<StudentResponseDTO>> findAllStudentsSpecification(
            @RequestParam(required = false) @Parameter(description = "Nome do aluno para filtro", required = false) String name,
            @RequestParam(required = false) @Parameter(description = "Email do aluno para filtro", required = false) String email,
            @RequestParam(required = false) @Parameter(description = "UUID da turma para filtro", required = false) UUID classUuid,
            @RequestParam(required = false) @Parameter(description = "Curso do aluno para filtro", required = false) String course,
            Pageable pageable) {

        Page<StudentResponseDTO> students = studentService.findAllStudentsSpecification(name, email, classUuid, course, pageable);

        return students.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(students);
    }
}
