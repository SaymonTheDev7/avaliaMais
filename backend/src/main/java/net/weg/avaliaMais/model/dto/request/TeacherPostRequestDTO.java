package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import net.weg.avaliaMais.model.ClassSchool;
import net.weg.avaliaMais.model.user.Teacher;
import net.weg.avaliaMais.model.role.UserRole;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * DTO para representar os dados necessários para a criação de um professor.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de criar uma instância de {@link Teacher}.
 * <p>
 * A classe inclui validações para garantir que os dados recebidos estejam corretos, como:
 * <ul>
 *     <li>Nome de usuário não pode estar em branco</li>
 *     <li>Email deve ser válido</li>
 *     <li>A carga horária semanal deve ser positiva</li>
 *     <li>A lista de turmas não pode ser vazia</li>
 * </ul>
 */
public record TeacherPostRequestDTO(

        /**
         * Nome de usuário do professor.
         * <p>
         * Este campo representa o nome de usuário do professor, que não pode estar em branco.
         */
        @NotBlank(message = "O nome de usuário não pode estar em branco")
        String username,

        /**
         * Senha do professor.
         * <p>
         * Este campo representa a senha do professor, que não pode estar em branco.
         */
        @NotBlank(message = "A senha não pode estar em branco")
        String password,

        /**
         * Email do professor.
         * <p>
         * Este campo representa o email do professor, que deve ser válido e não pode estar em branco.
         */
        @NotBlank(message = "O email não pode estar em branco")
        @Email(message = "O email deve ser válido")
        String email,

        /**
         * Turno de trabalho do professor.
         * <p>
         * Este campo representa o turno de trabalho do professor, como "matutino", "vespertino", etc.
         */
        @NotBlank(message = "O turno de trabalho não pode estar em branco")
        String workShift,

        /**
         * Carga horária semanal do professor.
         * <p>
         * Este campo representa a carga horária semanal do professor em horas, e deve ser um valor positivo.
         */
        @NotNull(message = "A carga horária semanal não pode ser nula")
        @Positive(message = "A carga horária semanal deve ser positiva")
        Double workloadWeek,

        /**
         * Lista de turmas atribuídas ao professor.
         * <p>
         * Este campo representa as turmas nas quais o professor está envolvido. A lista não pode ser nula nem vazia.
         * Caso a lista seja vazia, ela será convertida para uma lista vazia.
         */
        @NotNull(message = "A lista de turmas não pode ser nula")
        @Size(min = 0, message = "A lista de turmas não pode ser vazia")
        List<UUID> classIds,

        /**
         * Área profissional do professor.
         * <p>
         * Este campo representa a área de especialização do professor, como "matemática", "história", etc.
         */
        @NotBlank(message = "A área profissional não pode estar em branco")
        String professionalArea

) {

    /**
     * Converte o DTO para uma entidade {@link Teacher}.
     * <p>
     * A conversão envolve a criação de uma instância de {@link Teacher} com os dados fornecidos, incluindo as turmas
     * associadas ao professor e a área profissional.
     *
     * @param allClasses A lista completa de turmas disponíveis, que será usada para associar as turmas ao professor.
     * @return Uma instância de {@link Teacher} com os dados fornecidos.
     */
    public Teacher converter(List<ClassSchool> allClasses) {
        List<ClassSchool> classesList = classIds != null
                ? new ArrayList<>(allClasses.stream()
                .filter(classSchool -> classIds.contains(classSchool.getUuid()))
                .toList())
                : new ArrayList<>();

        return Teacher.builder()
                .email(email)
                .workShift(workShift)
                .workloadWeek(workloadWeek)
                .classIds(classesList)
                .professionalArea(professionalArea)
                .build();
    }
}
