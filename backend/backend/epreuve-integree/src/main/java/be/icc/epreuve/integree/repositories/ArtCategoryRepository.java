package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.ArtCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtCategoryRepository extends JpaRepository<ArtCategory,Long> {
    Optional<ArtCategory> findByName(String category);
}
