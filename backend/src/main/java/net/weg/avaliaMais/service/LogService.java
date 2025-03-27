package net.weg.avaliaMais.service;

import net.weg.avaliaMais.model.LogEntry;
import net.weg.avaliaMais.repository.LogRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;

    public void saveLog(String actionType, String message) {
        LogEntry log = new LogEntry();
        log.setActionType(actionType);
        log.setMessage(message);
        logRepository.save(log);
    }
}
