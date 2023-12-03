package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.Bid;
import be.icc.epreuve.integree.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
}
