package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.Teacher;

import java.util.ArrayList; // Import necessário
import java.util.List;
import java.util.UUID;

/**
 * DTO para requisição de criação de um professor.
 * Contém os dados necessários para cadastrar um novo professor.
 */
public record TeacherPostRequestDTO(

        /**
         * Nome de usuário do professor.
         * Não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do professor.
         * Não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Endereço de e-mail do professor.
         * Deve ser um e-mail válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do professor (ex: manhã, tarde, noite).
         * Não pode estar em branco.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do professor.
         * Deve ser um valor positivo e não pode ser nulo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        /**
         * Lista de IDs das turmas associadas ao professor.
         * Não pode ser nula.
         * A lista pode ser vazia.
         */
        @NotNull(message = "A lista de turmas não pode ser nula")
        @Size(min = 0, message = "A lista de turmas não pode ser vazia") // Permite lista vazia
        List<UUID> classIds,

        /**
         * Área profissional do professor (ex: Matemática, Ciências, etc).
         * Não pode estar em branco.
         */
        @NotBlank(message = "A área profissional não pode estar em branco")
        String professionalArea
) {

    /**
     * Converte o DTO em uma entidade {@link Teacher}, associando as turmas correspondentes.
     *
     * @param allClasses Lista de todas as turmas disponíveis.
     * @return Um objeto {@link Teacher} preenchido com os dados fornecidos.
     */
    public Teacher converter(List<ClassSchool> allClasses) {
        // Filtra as turmas com base nos UUIDs passados
        List<ClassSchool> classesList = classIds != null
                ? new ArrayList<>(allClasses.stream()
                .filter(classSchool -> classIds.contains(classSchool.getUuid()))
                .toList())
                : new ArrayList<>();

        // Cria e retorna o objeto Teacher
        return Teacher.builder()
                .username(username)
                .password(password)
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .classIds(classesList)
                .professionalArea(professionalArea)
                .build();
    }
}
