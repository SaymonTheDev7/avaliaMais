package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalTechnique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link PedagogicalTechnique}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para consultas dinâmicas e complexas.
 */
@Repository
public interface PedagogicalTechniqueRepository extends JpaRepository<PedagogicalTechnique, UUID>, JpaSpecificationExecutor<PedagogicalTechnique> {

    /**
     * Encontra um PedagogicalTechnique pelo nome de usuário.
     *
     * @param username O nome de usuário a ser procurado.
     * @return Um {@link Optional} contendo o PedagogicalTechnique se encontrado, ou vazio se não.
     */
    Optional<PedagogicalTechnique> findByUsername(String username);

}
