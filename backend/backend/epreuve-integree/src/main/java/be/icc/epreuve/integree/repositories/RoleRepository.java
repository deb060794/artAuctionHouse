package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.ERole;
import be.icc.epreuve.integree.models.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
