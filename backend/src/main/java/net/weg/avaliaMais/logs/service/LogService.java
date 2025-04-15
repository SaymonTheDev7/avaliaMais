package net.weg.avaliaMais.logs.service;

import net.weg.avaliaMais.logs.model.LogEntry;
import net.weg.avaliaMais.logs.repository.LogRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

/**
 * Serviço responsável por gerenciar as operações de log no sistema.
 * <p>
 * Esta classe oferece métodos para salvar entradas de log, permitindo o registro
 * de ações realizadas dentro da aplicação. Os logs podem ser armazenados no repositório
 * através do {@link LogRepository}.
 * </p>
 */
@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;

    /**
     * Salva uma nova entrada de log no repositório.
     * <p>
     * Este método cria uma entrada de log com o tipo de ação e a mensagem fornecida,
     * e a persiste no banco de dados através do {@link LogRepository}.
     * </p>
     *
     * @param actionType O tipo de ação que foi realizada (por exemplo, método HTTP).
     * @param message    A mensagem detalhada do log, incluindo informações adicionais
     *                  sobre a requisição ou operação realizada.
     */
    public void saveLog(String actionType, String message) {
        // Cria uma nova entrada de log
        LogEntry log = new LogEntry();
        log.setActionType(actionType);
        log.setMessage(message);

        // Salva a entrada de log no repositório
        logRepository.save(log);
    }
}
