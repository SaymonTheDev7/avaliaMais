package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.ClassSchool;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link ClassSchool}.
 * Esta interface estende {@link JpaRepository} e {@link JpaSpecificationExecutor},
 * oferecendo métodos para realizar operações de CRUD e consultas dinâmicas
 * com base em especificações.
 */
public interface ClassRepository extends JpaRepository<ClassSchool, UUID>, JpaSpecificationExecutor<ClassSchool> {

    /**
     * Deleta uma classe com base no nome da classe.
     *
     * @param nameClass O nome da classe a ser deletada.
     */
    void deleteByNameClass(String nameClass);

    /**
     * Encontra uma classe com base no nome da classe.
     *
     * @param nameClass O nome da classe a ser buscada.
     * @return Um {@link Optional} contendo a classe encontrada, ou vazio se não encontrada.
     */
    Optional<ClassSchool> findByNameClass(String nameClass);
}
