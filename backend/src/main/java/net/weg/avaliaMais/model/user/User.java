package net.weg.avaliaMais.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.infra.model.AuthUser;

import java.util.UUID;

/**
 * Classe abstrata que representa um perfil de usuário no sistema.
 * Esta classe contém apenas os dados comuns dos perfis de usuários
 * como professores, alunos, supervisores etc.
 *
 * A autenticação é tratada separadamente na entidade AuthUser.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {

    /**
     * Identificador único do usuário. Gerado automaticamente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Email do usuário para comunicação.
     */
    private String email;

    /**
     * Turno de trabalho do usuário (exemplo: "Matutino", "Vespertino").
     */
    private String workShift;

    /**
     * Carga horária semanal de trabalho do usuário.
     */
    private Double workloadWeek;

    /**
     * Referência ao usuário de autenticação.
     * Esse relacionamento garante a separação entre autenticação e perfil.
     */
    @OneToOne
    @JoinColumn(name = "auth_user_id", referencedColumnName = "uuid")
    private AuthUser authUser;
}
