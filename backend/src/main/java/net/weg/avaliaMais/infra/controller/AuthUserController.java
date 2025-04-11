package net.weg.avaliaMais.infra.controller;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.service.AuthUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthUserController {

    private final AuthUserService authUserService;

    @GetMapping("/getAll")
    public List <AuthUser> getAll() {
        return authUserService.getAllUsers();
    }
}
