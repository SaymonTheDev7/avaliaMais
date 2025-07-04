package net.weg.avaliaMais.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.model.dto.request.TeacherPostRequestDTO;
import net.weg.avaliaMais.model.dto.request.TeacherUpdateRequestDTO;
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
 * - Consultar (GET) um professor por UUID ou obter todos os professores
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
     * @param uuid Identificador único (UUID) do professor a ser atualizado.
     * @param teacherUpdateRequestDTO Objeto contendo os dados atualizados do professor.
     * @return Resposta com os dados do professor atualizado.
     */
    @PatchMapping("/update/{uuid}")
    public ResponseEntity<TeacherResponseDTO> updateTeacher(
            @PathVariable UUID uuid,
            @RequestBody @Valid TeacherUpdateRequestDTO teacherUpdateRequestDTO) {
        TeacherResponseDTO response = teacherService.updateTeacher(uuid, teacherUpdateRequestDTO); // Chama o serviço para atualizar o professor
        return ResponseEntity.ok(response); // Retorna resposta com status 200 OK
    }

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
     * Encontra um professor pelo UUID.
     *
     * @param uuid Identificador único (UUID) do professor a ser encontrado.
     * @return Resposta com os dados do professor encontrado, ou erro 404 se não encontrado.
     */
    @GetMapping("/find/{uuid}")
    public ResponseEntity<TeacherResponseDTO> findByUuid(@PathVariable UUID uuid) {
        TeacherResponseDTO response = teacherService.findByUuid(uuid); // Chama o serviço para buscar o professor
        return ResponseEntity.ok(response); // Retorna resposta com status 200 OK
    }

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

    /**
     * Busca professores filtrados por nome, email e curso com paginação.
     *
     * @param name Nome do professor a ser filtrado.
     * @param email Email do professor a ser filtrado.
     * @param course Curso do professor a ser filtrado.
     * @param pageable Parâmetros de paginação.
     * @return Resposta com os professores filtrados.
     */

}
