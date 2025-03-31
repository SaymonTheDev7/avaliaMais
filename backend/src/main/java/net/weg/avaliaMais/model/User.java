package net.weg.avaliaMais.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

/**
 * Classe abstrata que representa um usuário no sistema.
 * A classe {@link User} serve como base para diferentes tipos de usuários,
 * como {@link Teacher}, {@link Student}, {@link Supervisor}, entre outros.
 *
 * Todos os usuários têm atributos comuns como:
 * <ul>
 *   <li>UUID único para identificar o usuário.</li>
 *   <li>Nome de usuário ({@link #username}).</li>
 *   <li>Senha de acesso ({@link #password}).</li>
 *   <li>Email de contato ({@link #email}).</li>
 *   <li>Turno de trabalho ({@link #workShift}).</li>
 *   <li>Carga horária semanal ({@link #workloadWeek}).</li>
 * </ul>
 *
 * A classe usa a estratégia de herança {@link InheritanceType#TABLE_PER_CLASS}, o que significa que cada subclasse
 * terá sua própria tabela no banco de dados.
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
     * Nome de usuário utilizado para autenticação no sistema.
     */
    private String username;

    /**
     * Senha de acesso do usuário.
     */
    private String password;

    /**
     * Email do usuário para comunicação e autenticação.
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
     * Construtor para inicializar um usuário com os parâmetros fornecidos.
     *
     * @param uuid UUID único do usuário.
     * @param username Nome de usuário.
     * @param password Senha de acesso.
     * @param email Email de contato.
     * @param workShift Turno de trabalho.
     * @param workloadWeek Carga horária semanal.
     */
    public User(UUID uuid, String username, String password, String email, String workShift, Double workloadWeek) {
        this.uuid = uuid;
        this.username = username;
        this.password = password;
        this.email = email;
        this.workShift = workShift;
        this.workloadWeek = workloadWeek;
    }
}
