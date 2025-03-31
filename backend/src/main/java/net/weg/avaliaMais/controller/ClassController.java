package net.weg.avaliaMais.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.ClassPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.ClassUpdateRequestDTO;
import net.weg.avaliaMais.model.dto.response.ClassResponseDTO;
import net.weg.avaliaMais.service.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    /**
     * @param classPostRequestDTO
     * @return
     */
    @PostMapping("/add")
    @Operation(summary = "Adicionar classe", description = "Cria e retorna uma nova classe")
    @Tag(name = "Classes", description = "Operações relacionadas com a criação de classes")
    @ApiResponse(responseCode = "201", description = "Classe criada com sucesso", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<ClassResponseDTO> addClass(
            @RequestBody @Valid @Parameter(description = "Dados da classe a ser criada", required = true, content = @Content(schema = @Schema(implementation = ClassPostRequestDTO.class))) ClassPostRequestDTO classPostRequestDTO) {
        ClassResponseDTO response = classService.addClass(classPostRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/update")
    @Operation(summary = "Atualizar classe", description = "Atualiza e retorna uma classe existente")
    @Tag(name = "Classes", description = "Operações relacionadas com a atualização de classes")
    @ApiResponse(responseCode = "200", description = "Classe atualizada com sucesso", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<ClassResponseDTO> updateClass(
            @RequestBody @Valid @Parameter(description = "Dados da classe a ser atualizada", required = true, content = @Content(schema = @Schema(implementation = ClassUpdateRequestDTO.class))) ClassUpdateRequestDTO classUpdateRequestDTO) {
        ClassResponseDTO response = classService.updateClass(classUpdateRequestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{nameClass}")
    @Operation(summary = "Deletar classe", description = "Remove uma classe com base no nome fornecido")
    @Tag(name = "Classes", description = "Operações relacionadas com a remoção de classes")
    @ApiResponse(responseCode = "200", description = "Classe deletada com sucesso")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<String> deleteClassPerName(
            @PathVariable @Parameter(description = "Nome da classe a ser deletada", required = true) String nameClass) {
        classService.deleteClassPerName(nameClass);
        return ResponseEntity.ok("Turma deletada com sucesso");
    }

    @GetMapping("/find/{nameClass}")
    @Operation(summary = "Buscar classe", description = "Busca uma classe pelo nome fornecido")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Classe encontrada com sucesso", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "404", description = "Classe não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<ClassResponseDTO> findClassPerName(
            @PathVariable @Parameter(description = "Nome da classe a ser buscada", required = true) String nameClass) {
        ClassResponseDTO response = classService.findClassPerName(nameClass);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/all")
    @Operation(summary = "Listar todas as classes", description = "Retorna uma lista paginada de todas as classes")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Lista de classes retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findAllClasses(
            @RequestParam @Parameter(description = "Número da página", required = true) int page) {
        Page<ClassResponseDTO> response = classService.findAllClasses(page, 4);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/year")
    @Operation(summary = "Buscar classes por ano", description = "Retorna uma lista paginada de classes filtradas pelo ano informado")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Lista de classes retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhuma classe encontrada para o ano informado")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findByYear(
            @RequestParam @Parameter(description = "Ano da turma a ser buscada", required = true) Integer year,
            Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerYear(year, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/location")
    @Operation(summary = "Buscar classes por localização", description = "Retorna uma lista paginada de classes filtradas pela localização informada")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Lista de classes retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhuma classe encontrada para a localização informada")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findByLocation(@RequestParam @Parameter(description = "Localização da turma a ser buscada", required = true) String location,
                                                                 Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerLocation(location, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/course")
    @Operation(summary = "Buscar classes por curso", description = "Retorna uma lista paginada de classes filtradas pelo curso informado")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Lista de classes retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhuma classe encontrada para o curso informado")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findByCourse(
            @RequestParam @Parameter(description = "Curso da turma a ser buscada", required = true) String course,
            Pageable pageable) {

        Page<ClassResponseDTO> classes = classService.findClassesByCourse(course, pageable);

        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/shift")
    @Operation(summary = "Buscar classes por turno", description = "Retorna uma lista paginada de classes filtradas pelo turno informado")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes")
    @ApiResponse(responseCode = "200", description = "Lista de classes retornada com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhuma classe encontrada para o turno informado")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findByShift(
            @RequestParam @Parameter(description = "Turno da turma a ser buscada", required = true) String shift,
            Pageable pageable) {
        Page<ClassResponseDTO> classes = classService.findClassPerShift(shift, pageable);
        if (classes.hasContent()) {
            return new ResponseEntity<>(classes, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/advanced-filtration")
    @Operation(summary = "Filtragem avançada de classes", description = "Filtra classes com base nos parâmetros de ano, localização, curso e turno")
    @Tag(name = "Classes", description = "Operações relacionadas com a busca de classes com filtragem avançada")
    @ApiResponse(responseCode = "200", description = "Classes filtradas retornadas com sucesso", content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "204", description = "Nenhuma classe encontrada para os filtros informados")
    @ApiResponse(responseCode = "400", description = "Erro na requisição")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Page<ClassResponseDTO>> findByFiltros(
            @RequestParam(required = false) @Parameter(description = "Ano da turma para filtro", required = false) Integer year,
            @RequestParam(required = false) @Parameter(description = "Localização da turma para filtro", required = false) String location,
            @RequestParam(required = false) @Parameter(description = "Curso da turma para filtro", required = false) String course,
            @RequestParam(required = false) @Parameter(description = "Turno da turma para filtro", required = false) String shift,
            Pageable pageable) {
        return null;
    }
}