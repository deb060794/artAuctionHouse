package be.icc.epreuve.integree.repositories;


import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.AuctionState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ArtRepository extends JpaRepository<Art, Long> {

    Set<Art> findAllByState(AuctionState auctionState);



    List<Art> findByTitleContaining(String name);

}
