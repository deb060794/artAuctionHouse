package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.ArtComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtCommentRepository extends JpaRepository<ArtComment, Long> {
}
