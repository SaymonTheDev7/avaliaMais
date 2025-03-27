package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LogRepository extends JpaRepository<LogEntry, UUID> {
}
