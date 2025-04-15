package net.weg.avaliaMais.model.role;

/**
 * Enumeração que representa os diferentes papéis (roles) de usuários no sistema.
 * Cada constante enum possui um valor de string associado que representa o papel no sistema.
 */
public enum UserRole {

    /** Administrador do sistema. */
    ADMIN("admin"),

    /** Técnico pedagógico. */
    TECHNIQUE_PEDAGOGICAL("pedagogical_technique"),

    /** Orientador pedagógico. */
    ADVISOR_PEDAGOGICAL("advisor_pedagogical"),

    /** Professor. */
    TEACHER("teacher"),

    /** Estudante. */
    STUDENT("student"),

    /** Representante de turma. */
    REPRESENTATIVE("representative"),

    /** Supervisor de atividades escolares. */
    SUPERVISOR("supervisor");

    /** String que representa o papel (role) do usuário. */
    private final String role;

    /**
     * Construtor da enumeração.
     *
     * @param role String que representa o nome do papel do usuário.
     */
    UserRole(String role) {
        this.role = role;
    }

    /**
     * Retorna a string correspondente ao papel do usuário.
     *
     * @return o papel do usuário em formato de texto.
     */
    public String getRole() {
        return role;
    }
}
