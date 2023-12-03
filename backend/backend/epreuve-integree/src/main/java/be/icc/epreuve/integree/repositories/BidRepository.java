package be.icc.epreuve.integree.repositories;


import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long>{
    Bid findTopByArtOrderByAmountDesc(Art art);

}
