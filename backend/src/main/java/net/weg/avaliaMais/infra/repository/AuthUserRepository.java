package net.weg.avaliaMais.infra.repository;

import net.weg.avaliaMais.model.user.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<AuthUser, UUID> {

    @Query("SELECT a FROM AuthUser a WHERE a.username = :username")
    UserDetails findByUsername(@Param("username") String username);

}
