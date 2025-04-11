package net.weg.avaliaMais.logs.repository;

import net.weg.avaliaMais.logs.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repositório para a entidade {@link LogEntry}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * para a entidade de registros de log.
 */
public interface LogRepository extends JpaRepository<LogEntry, UUID> {
    // Não são necessários métodos adicionais no momento, pois o JpaRepository
    // já fornece todos os métodos básicos de CRUD, como save, findById, delete, etc.
}
