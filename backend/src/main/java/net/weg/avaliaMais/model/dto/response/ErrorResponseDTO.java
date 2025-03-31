package net.weg.avaliaMais.model.dto.response;

import java.time.Instant;

/**
 * DTO de resposta para erros.
 * Contém as informações necessárias para informar um erro ocorrido em uma operação.
 */
public record ErrorResponseDTO(

        /**
         * Mensagem do erro.
         * Descrição ou explicação do erro ocorrido.
         */
        String mensagem,

        /**
         * Classe onde o erro ocorreu.
         * A classe do sistema onde o erro foi gerado.
         */
        Class aClass,

        /**
         * Instante em que o erro ocorreu.
         * O momento exato em que o erro foi registrado, representado por um {@link Instant}.
         */
        Instant instant

) {
}
