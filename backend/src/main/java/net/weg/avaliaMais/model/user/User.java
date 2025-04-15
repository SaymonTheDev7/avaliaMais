package net.weg.avaliaMais.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.weg.avaliaMais.infra.model.AuthUser;

import java.util.UUID;

/**
 * Classe abstrata que representa um perfil de usuário no sistema.
 * Esta classe contém apenas os dados comuns dos perfis de usuários como
 * professores, alunos, supervisores e outros tipos de usuários.
 * A autenticação é tratada separadamente na entidade {@link AuthUser}.
 *
 * A classe é mapeada para o banco de dados usando a estratégia {@link InheritanceType#TABLE_PER_CLASS},
 * o que significa que cada subclasse terá sua própria tabela no banco de dados.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {

    /**
     * Identificador único do usuário. Gerado automaticamente.
     * Este campo é a chave primária da tabela.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    /**
     * Email do usuário para comunicação.
     * Este campo armazena o email associado ao usuário.
     */
    private String email;

    /**
     * Turno de trabalho do usuário.
     * Exemplo: "Matutino", "Vespertino".
     * Representa o horário de trabalho do usuário.
     */
    private String workShift;

    /**
     * Carga horária semanal de trabalho do usuário.
     * Armazena o número total de horas que o usuário trabalha por semana.
     */
    private Double workloadWeek;

    /**
     * Referência ao usuário de autenticação.
     * Relacionamento entre o perfil do usuário e os dados de autenticação.
     * Este campo está vinculado à tabela {@link AuthUser} que gerencia os dados de login.
     */
    @OneToOne
    @JoinColumn(name = "auth_user_id", referencedColumnName = "uuid")
    private AuthUser authUser;
}
