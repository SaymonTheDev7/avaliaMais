package net.weg.avaliaMais.model.role;

public enum UserRole {
    ADMIN("admin"),
    TECHNIQUE_PEDAGOGICAL("pedagogical_technique"),
    ADVISOR_PEDAGOGICAL("advisor_pedagogical"),
    TEACHER("teacher"),
    STUDENT("student"),
    REPRESENTATIVE("representative"),
    SUPERVISOR("supervisor");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
