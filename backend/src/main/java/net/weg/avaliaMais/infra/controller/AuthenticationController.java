package net.weg.avaliaMais.infra.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.dto.request.AuthenticationRequestDTO;
import net.weg.avaliaMais.infra.model.dto.response.LoginResponseDTO;
import net.weg.avaliaMais.infra.model.dto.request.RegisterResponseDTO;
import net.weg.avaliaMais.infra.security.TokenService;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import net.weg.avaliaMais.repository.user.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuthUserRepository authUserRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final SupervisorRepository supervisorRepository;
    private final PedagogicalTechniqueRepository pedagogicalTechniqueRepository;
    private final PedagogicalAdvisorRepository pedagogicalAdvisorRepository;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO authenticationRequestDTO,
                                                  HttpServletResponse response) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
                authenticationRequestDTO.username(),
                authenticationRequestDTO.password()
        );

        var auth = authenticationManager.authenticate(usernamePassword);
        var user = (AuthUser) auth.getPrincipal();
        var token = tokenService.generateToken(user);

        var cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60); // 1 hora
        cookie.setSecure(false); // true se for https
        cookie.setDomain("localhost"); // ou não setar isso em dev
        response.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponseDTO(token, user.getRole()));
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

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        AuthUser user = (AuthUser) auth.getPrincipal();

        return switch (user.getRole()) {
            case STUDENT, REPRESENTATIVE -> {
                var student = studentRepository.findByAuthUserUuid(user.getUuid());
                yield ResponseEntity.ok(student);
            }
            case TEACHER -> {
                var teacher = teacherRepository.findByAuthUserUuid(user.getUuid());
                yield ResponseEntity.ok(teacher);
            }
            case SUPERVISOR -> {
                var supervisor = supervisorRepository.findByAuthUserUuid(user.getUuid());
                yield ResponseEntity.ok(supervisor);
            }
            case ADVISOR_PEDAGOGICAL -> {
                var advisor = pedagogicalAdvisorRepository.findByAuthUserUuid(user.getUuid());
                yield ResponseEntity.ok(advisor);
            }
            case TECHNIQUE_PEDAGOGICAL -> {
                var technique = pedagogicalTechniqueRepository.findByAuthUserUuid(user.getUuid());
                yield ResponseEntity.ok(technique);
            }
            case ADMIN -> ResponseEntity.ok(user);
        };
    }

}
