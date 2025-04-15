package net.weg.avaliaMais.infra.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.avaliaMais.model.role.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Classe que representa um usuário autenticado no sistema.
 * Implementa a interface {@link UserDetails} para fornecer informações de autenticação e autorização.
 * A classe é mapeada para uma entidade JPA {@link Entity}, que é persistida no banco de dados.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthUser implements UserDetails {

    /**
     * Identificador único do usuário (UUID).
     * Esse campo é gerado automaticamente pela base de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Nome de usuário utilizado para login no sistema.
     */
    private String username;

    /**
     * Senha do usuário, que será usada para autenticação.
     */
    private String password;

    /**
     * Papel ou função do usuário no sistema, representado por um valor da enumeração {@link UserRole}.
     */
    @Enumerated(EnumType.STRING)
    private UserRole role;

    /**
     * Retorna as autoridades (roles) do usuário.
     * O papel do usuário é transformado em um objeto {@link GrantedAuthority}, necessário para a autenticação e autorização no Spring Security.
     *
     * @return Coleção de {@link GrantedAuthority} representando as permissões do usuário.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    /**
     * Retorna se a conta do usuário está expirada.
     * Este método sempre retorna {@code true}, indicando que a conta nunca expira.
     *
     * @return {@code true} se a conta não estiver expirada.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Retorna se a conta do usuário está bloqueada.
     * Este método sempre retorna {@code true}, indicando que a conta nunca é bloqueada.
     *
     * @return {@code true} se a conta não estiver bloqueada.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Retorna se as credenciais do usuário estão expiradas.
     * Este método sempre retorna {@code true}, indicando que as credenciais nunca expiram.
     *
     * @return {@code true} se as credenciais não estiverem expiradas.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Retorna se o usuário está habilitado.
     * Este método sempre retorna {@code true}, indicando que o usuário está sempre habilitado.
     *
     * @return {@code true} se o usuário estiver habilitado.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
