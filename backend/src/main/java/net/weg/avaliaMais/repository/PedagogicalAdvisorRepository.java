package net.weg.avaliaMais.repository;

import net.weg.avaliaMais.model.PedagogicalAdvisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade {@link PedagogicalAdvisor}.
 * Esta interface estende {@link JpaRepository} para fornecer operações CRUD
 * básicas e {@link JpaSpecificationExecutor} para suportar consultas dinâmicas e complexas.
 */
@Repository
public interface PedagogicalAdvisorRepository extends JpaRepository<PedagogicalAdvisor, UUID>, JpaSpecificationExecutor<PedagogicalAdvisor> {

    /**
     * Encontra um PedagogicalAdvisor pelo nome de usuário.
     *
     * @param username O nome de usuário a ser procurado.
     * @return Um {@link Optional} contendo o PedagogicalAdvisor se encontrado, ou vazio se não.
     */
    Optional<PedagogicalAdvisor> findByUsername(String username);

    /**
     * Encontra um PedagogicalAdvisor pelo nome de usuário ou e-mail.
     *
     * @param username O nome de usuário a ser procurado.
     * @param email O e-mail a ser procurado.
     * @return Um {@link Optional} contendo o PedagogicalAdvisor se encontrado, ou vazio se não.
     */
    Optional<PedagogicalAdvisor> findByUsernameOrEmail(String username, String email);

    /**
     * Encontra um PedagogicalAdvisor pelo turno de trabalho.
     *
     * @param workShift O turno de trabalho a ser procurado.
     * @return Um {@link Optional} contendo o PedagogicalAdvisor se encontrado, ou vazio se não.
     */
    Optional<PedagogicalAdvisor> findByWorkShift(String workShift);

    /**
     * Encontra todos os PedagogicalAdvisors com suporte de paginação.
     *
     * @param pageable O objeto de paginação contendo informações sobre o tamanho da página e o número da página.
     * @return Uma {@link Page} contendo os PedagogicalAdvisors encontrados.
     */
    Page<PedagogicalAdvisor> findAll(Pageable pageable);

}
