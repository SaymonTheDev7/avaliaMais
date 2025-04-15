package net.weg.avaliaMais.infra.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.model.AuthUser;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Serviço responsável por operações relacionadas aos usuários autenticáveis (AuthUser).
 */
@Service
@RequiredArgsConstructor
public class AuthUserService {

    /** Repositório responsável pelo acesso aos dados dos usuários. */
    private final AuthUserRepository authUserRepository;

    /**
     * Recupera todos os usuários cadastrados no sistema.
     *
     * @return uma lista contendo todos os objetos {@link AuthUser}.
     */
    public List<AuthUser> getAllUsers() {
        return authUserRepository.findAll();
    }
}
