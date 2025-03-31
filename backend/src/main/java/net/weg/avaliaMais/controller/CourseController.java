package net.weg.avaliaMais.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.CoursePostRequestDTO;
import net.weg.avaliaMais.model.dto.response.CourseResponseDTO;
import net.weg.avaliaMais.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
@Tag(name = "Course", description = "Operações relacionadas aos cursos")
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/add")
    @Operation(summary = "Adicionar um curso", description = "Cria um novo curso com os dados fornecidos")
    @ApiResponse(responseCode = "201", description = "Curso criado com sucesso", content = @Content(schema = @Schema(implementation = CourseResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    public ResponseEntity<CourseResponseDTO> addCourse(@RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        CourseResponseDTO response = courseService.addCourse(coursePostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{nameCourse}")
    @Operation(summary = "Atualizar um curso pelo nome", description = "Atualiza um curso existente com base no nome fornecido")
    @ApiResponse(responseCode = "200", description = "Curso atualizado com sucesso")
    @ApiResponse(responseCode = "404", description = "Curso não encontrado")
    public ResponseEntity<CourseResponseDTO> updateCoursePerName(@PathVariable String nameCourse, @RequestBody @Valid CoursePostRequestDTO coursePostRequestDTO) {
        CourseResponseDTO response = courseService.updateCoursePerName(nameCourse, coursePostRequestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{nameCourse}")
    @Operation(summary = "Deletar um curso pelo nome", description = "Remove um curso com base no nome fornecido")
    @ApiResponse(responseCode = "200", description = "Curso deletado com sucesso")
    @ApiResponse(responseCode = "404", description = "Curso não encontrado")
    public ResponseEntity<String> deleteCoursePerName(@PathVariable String nameCourse) {
        String response = courseService.deleteCoursePerName(nameCourse);
        if (response.equals("Curso não encontrado")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByName/{nameCourse}")
    @Operation(summary = "Buscar curso pelo nome", description = "Retorna um curso com base no nome fornecido")
    @ApiResponse(responseCode = "200", description = "Curso encontrado com sucesso", content = @Content(schema = @Schema(implementation = CourseResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Curso não encontrado")
    public ResponseEntity<CourseResponseDTO> findCoursePerName(@PathVariable String nameCourse) {
        CourseResponseDTO course = courseService.findCoursePerName(nameCourse);
        return course == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(course);
    }

    @GetMapping("/findByUuid/{uuid}")
    @Operation(summary = "Buscar curso pelo UUID", description = "Retorna um curso com base no UUID fornecido")
    @ApiResponse(responseCode = "200", description = "Curso encontrado com sucesso", content = @Content(schema = @Schema(implementation = CourseResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Curso não encontrado")
    public ResponseEntity<CourseResponseDTO> findCoursePerUuid(@PathVariable UUID uuid) {
        CourseResponseDTO course = courseService.findCoursePerUuid(uuid);
        return course == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(course);
    }

    @GetMapping("/findAll")
    @Operation(summary = "Listar todos os cursos", description = "Retorna uma lista paginada de todos os cursos")
    @ApiResponse(responseCode = "200", description = "Lista de cursos retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    public ResponseEntity<Page<CourseResponseDTO>> findAllCourses(@RequestParam int page, @RequestParam int size) {
        Page<CourseResponseDTO> courses = courseService.findAllCourses(page, size);
        return ResponseEntity.ok(courses);
    }
}
