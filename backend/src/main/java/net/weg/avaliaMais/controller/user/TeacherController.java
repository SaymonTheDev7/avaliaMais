package net.weg.avaliaMais.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.response.TeacherResponseDTO;
import net.weg.avaliaMais.service.user.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller responsável por gerenciar as operações de CRUD para os professores.
 *
 * Esta classe fornece endpoints para:
 * - Criar (POST) um novo professor
 * - Atualizar (PATCH) os dados de um professor
 * - Deletar (DELETE) um professor
 * - Consultar (GET) um professor por nome de usuário ou obter todos os professores
 */
@RestController
@RequestMapping("users/teacher") // Base URL para os endpoints dessa classe
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService; // Serviço para manipulação de dados de professores

    /**
     * Cria um novo professor.
     *
     * @param teacherPostRequestDTO Objeto contendo os dados do novo professor a ser criado.
     * @return Resposta com os dados do professor criado.
     */
    @PostMapping("/add")
    public ResponseEntity<TeacherResponseDTO> addTeacher(@RequestBody @Valid TeacherPostRequestDTO teacherPostRequestDTO) {
        TeacherResponseDTO response = teacherService.addTeacher(teacherPostRequestDTO); // Chama o serviço para adicionar o professor
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // Retorna resposta com status 201 CREATED
    }

    /**
     * Atualiza os dados de um professor existente.
     *
     * @param teacherPostRequestDTO Objeto contendo os dados atualizados do professor.
     * @return Resposta com os dados do professor atualizado.
     */
    /**
     * Deleta um professor utilizando o UUID do professor.
     *
     * @param uuid Identificador único (UUID) do professor a ser deletado.
     * @return Resposta HTTP indicando que a operação foi bem-sucedida.
     */
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<Void> deleteTeacherPerUUID(@PathVariable UUID uuid) {
        teacherService.deleteTeacherByUUID(uuid); // Chama o serviço para deletar o professor
        return ResponseEntity.ok().build(); // Retorna resposta com status 200 OK
    }

    /**
     * Encontra um professor pelo nome de usuário.
     *
     * @param username Nome de usuário do professor a ser encontrado.
     * @return Resposta com os dados do professor encontrado, ou erro 404 se não encontrado.
     */

    /**
     * Retorna uma lista paginada de todos os professores.
     *
     * @param page Número da página para a consulta paginada.
     * @return Resposta com a página de professores.
     */
    @GetMapping("/find-all/teachers")
    public ResponseEntity<Page<TeacherResponseDTO>> findAllTeachers(@RequestParam int page) {
        Page<TeacherResponseDTO> teacherResponseDTOs = teacherService.findAllTeachers(page, 4);
        return ResponseEntity.ok(teacherResponseDTOs);
    }

    @GetMapping("/find-all/classes")
    public ResponseEntity<Page<TeacherResponseDTO>> findAllClasses(@RequestParam int page) {
        Page<TeacherResponseDTO> teacherResponseDTOs = teacherService.findAllTeachers(page, 4);
        return ResponseEntity.ok(teacherResponseDTOs);
    }

    @GetMapping("/advanced-filtration")
    @Operation(summary = "Buscar professores", description = "Busca professores por nome, email e curso")
    public ResponseEntity<Page<TeacherResponseDTO>> findAllTeachersSpecification(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String course,
            Pageable pageable) {
        return ResponseEntity.ok(teacherService.findAllTeachersSpecification(name, email, course, pageable));
    }
}
