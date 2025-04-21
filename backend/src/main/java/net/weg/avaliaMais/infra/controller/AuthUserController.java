package net.weg.avaliaMais.infra.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.service.AuthUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador responsável por lidar com operações relacionadas aos usuários autenticados (AuthUser).
 * Disponibiliza endpoint para listar todos os usuários.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthUserController {

    private final AuthUserService authUserService;

    /**
     * Retorna uma lista com todos os usuários cadastrados no sistema.
     *
     * @return Lista de objetos {@link AuthUser}.
     */
    @Operation(
            summary = "Lista todos os usuários autenticados",
            description = "Este endpoint retorna uma lista de todos os usuários registrados no sistema.",
            tags = {"AuthUser"}
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de usuários retornada com sucesso",
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = AuthUser.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno no servidor",
                    content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json")
            )
    })
    @GetMapping("/getAll")
    public List<AuthUser> getAll() {
        return authUserService.getAllUsers();
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Void> deleteUserByUsername (@PathVariable String username) {
        authUserService.deleteUserByUsername(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
