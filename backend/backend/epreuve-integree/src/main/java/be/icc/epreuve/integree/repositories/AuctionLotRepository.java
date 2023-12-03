package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.AuctionLot;
import be.icc.epreuve.integree.models.AuctionState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface AuctionLotRepository extends JpaRepository<AuctionLot,Long> {

    @Query("SELECT l FROM lots l WHERE l.endDate <= CURRENT_TIMESTAMP and l.processed=false ")
    List<AuctionLot> findEndedAndNotProcessed();



    List<AuctionLot> findAllByStartDateAfter(Date date);

}
