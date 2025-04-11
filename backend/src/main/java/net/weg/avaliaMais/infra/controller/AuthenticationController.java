package net.weg.avaliaMais.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.dto.request.AuthenticationRequestDTO;
import net.weg.avaliaMais.infra.model.dto.response.LoginResponseDTO;
import net.weg.avaliaMais.infra.model.dto.request.RegisterResponseDTO;
import net.weg.avaliaMais.infra.security.TokenService;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuthUserRepository authUserRepository;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationRequestDTO authenticationRequestDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationRequestDTO.username(), authenticationRequestDTO.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((AuthUser) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterResponseDTO registerResponseDTO) {
        if (authUserRepository.findByUsername(registerResponseDTO.username()) != null) {
            return ResponseEntity.badRequest().body("Usuário já existe!");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerResponseDTO.password());
        AuthUser user = AuthUser.builder()
                .username(registerResponseDTO.username())
                .password(encryptedPassword)
                .role(registerResponseDTO.role())
                .build();

        authUserRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
