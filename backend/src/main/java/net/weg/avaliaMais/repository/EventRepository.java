package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    Event findByUuid(UUID uuid);

}
