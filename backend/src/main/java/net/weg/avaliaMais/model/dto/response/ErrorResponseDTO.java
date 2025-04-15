package net.weg.avaliaMais.model.dto.response;

import java.time.Instant;

/**
 * DTO de resposta para erros.
 * <p>
 * Essa classe encapsula informações relevantes sobre um erro ocorrido durante uma operação
 * no sistema, permitindo que a camada de apresentação forneça respostas compreensíveis
 * para o cliente.
 *
 * @param mensagem Mensagem explicativa sobre o erro ocorrido.
 * @param aClass   Classe onde o erro foi originado.
 * @param instant  Instante exato do registro do erro.
 */
public record ErrorResponseDTO(

        /**
         * Mensagem do erro.
         * <p>Descrição amigável explicando o que ocorreu de errado.
         */
        String mensagem,

        /**
         * Classe onde o erro ocorreu.
         * <p>Representa a classe Java responsável pela operação que gerou o erro.
         */
        Class aClass,

        /**
         * Instante em que o erro ocorreu.
         * <p>Data e hora exatas do erro, com precisão em milissegundos.
         */
        Instant instant

) {
}
