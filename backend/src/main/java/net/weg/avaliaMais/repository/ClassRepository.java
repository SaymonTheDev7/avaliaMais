package net.weg.avaliaMais.repository;
import net.weg.avaliaMais.model.ClassSchool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClassRepository extends JpaRepository <ClassSchool, UUID> {
}
