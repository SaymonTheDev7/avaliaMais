package net.weg.avaliaMais.model.dto.request;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;

/**
 * DTO para representar os dados necessários para a atualização de uma turma.
 * <p>
 * Esta classe é usada para receber as informações da requisição e validá-las antes de atualizar uma turma existente.
 * Ela garante que todos os campos necessários sejam fornecidos corretamente para a atualização da turma no sistema.
 * </p>
 */
public record ClassUpdateRequestDTO(

        @NotNull(message = "O UUID da turma não pode ser nulo")
        UUID classUuid,

        @NotEmpty(message = "A lista de alunos não pode estar vazia")
        @Size(min = 1, message = "Deve haver pelo menos um aluno")
        List<UUID> studentIds,

        @NotBlank(message = "O nome da turma não pode estar em branco")
        String nameClass,

        @NotNull(message = "A carga horária não pode ser nula")
        @Positive(message = "A carga horária deve ser positiva")
        Double workloadClass,

        @NotNull(message = "O tempo não pode ser nulo")
        @Positive(message = "O tempo deve ser positivo")
        Double time,

        @NotNull(message = "A quantidade de alunos não pode ser nula")
        @Positive(message = "A quantidade de alunos deve ser positiva")
        Integer quantityStudents,

        @NotBlank(message = "O turno não pode estar em branco")
        String shift

) {

}
