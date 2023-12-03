package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.Artist;

import be.icc.epreuve.integree.models.ArtistCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {


}
