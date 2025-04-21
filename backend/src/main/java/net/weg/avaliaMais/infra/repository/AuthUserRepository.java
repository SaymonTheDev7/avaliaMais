package net.weg.avaliaMais.infra.repository;

import net.weg.avaliaMais.infra.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

/**
 * Repositório responsável por operações de persistência para a entidade {@link AuthUser}.
 * Estende a interface {@link JpaRepository} para fornecer operações CRUD e outras consultas relacionadas ao {@link AuthUser}.
 */
public interface AuthUserRepository extends JpaRepository<AuthUser, UUID> {

    /**
     * Busca um usuário no banco de dados com base no nome de usuário fornecido.
     * Este método é usado para recuperar os detalhes do usuário para autenticação.
     *
     * @param username Nome de usuário a ser pesquisado no banco de dados.
     * @return Um objeto {@link UserDetails} que contém as informações de autenticação do usuário.
     */
    @Query("SELECT a FROM AuthUser a WHERE a.username = :username")
    UserDetails findByUsername(@Param("username") String username);

    void deleteAuthUsersByUsername(String username);
}
