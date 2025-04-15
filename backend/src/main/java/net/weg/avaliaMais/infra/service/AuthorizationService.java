package net.weg.avaliaMais.infra.service;

import lombok.RequiredArgsConstructor;
import net.weg.avaliaMais.infra.repository.AuthUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por fornecer os dados do usuário para o processo de autenticação do Spring Security.
 * Implementa a interface {@link UserDetailsService}, sendo utilizado automaticamente pelo Spring durante o login.
 */
@Service
@RequiredArgsConstructor
public class AuthorizationService implements UserDetailsService {

    /** Repositório utilizado para buscar usuários pelo nome de usuário. */
    private final AuthUserRepository authUserRepository;

    /**
     * Carrega um usuário com base no nome de usuário informado.
     *
     * @param username nome de usuário fornecido no processo de login.
     * @return um objeto {@link UserDetails} representando o usuário.
     * @throws UsernameNotFoundException se o usuário não for encontrado no repositório.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authUserRepository.findByUsername(username);
    }
}
