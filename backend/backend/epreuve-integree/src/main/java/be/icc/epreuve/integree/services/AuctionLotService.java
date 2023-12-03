package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.AuctionLot;
import be.icc.epreuve.integree.models.AuctionState;
import be.icc.epreuve.integree.models.Bid;
import be.icc.epreuve.integree.models.BidState;
import be.icc.epreuve.integree.repositories.AuctionLotRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class AuctionLotService {
    @Autowired
    private AuctionLotRepository repository;

    @Autowired
    private ArtService artService;

    @Autowired
    private BidService bidService;

    @Autowired
    private EmailService emailService;



    public AuctionLot create (AuctionLot lot){
        return repository.save(lot);
    }
    public void delete(Long id){
       repository.deleteById(id);
    }
    public void addArtToAuction(Art art, long id){
        AuctionLot lot = repository.findById(id).get();
        art.setLot(lot);


        if( !lot.getArts().contains(art)){
            Calendar calNow = Calendar.getInstance();
            calNow.set(Calendar.HOUR_OF_DAY, 0);
            calNow.set(Calendar.MINUTE, 0);
            calNow.set(Calendar.SECOND, 0);
            calNow.set(Calendar.MILLISECOND, 0);
            Date today = calNow.getTime();

            Calendar calLot = Calendar.getInstance();
            calLot.setTime(lot.getStartDate());
            calLot.set(Calendar.HOUR_OF_DAY, 0);
            calLot.set(Calendar.MINUTE, 0);
            calLot.set(Calendar.SECOND, 0);
            calLot.set(Calendar.MILLISECOND, 0);

            if( calLot.getTime().equals(today) || calLot.getTime().after(today)){
                art.setState(AuctionState.INAUCTION);
                artService.update(art);
            }
            lot.getArts().add(art);

        }


    }

    public Optional<AuctionLot> getLotByid(Long id){
        return repository.findById(id);
    }

    public List<AuctionLot> getLots(){
        List<AuctionLot> lots = new ArrayList<>();
        lots = repository.findAll();
        return lots;
    }
    @Transactional
    @Scheduled(fixedRate = 60000)
    public void processEndedAuctions() {
        List<AuctionLot> endedAuctions = repository.findEndedAndNotProcessed();


        for (AuctionLot l : endedAuctions) {
            List<Art> arts = l.getArts();
            for (Art art:arts) {
                List<Bid> bids = art.getBids();

                if (!bids.isEmpty()) {
                    Bid highestBid =bidService.getHighestBid(art) ;

                    emailService.sendEmailToWinner(highestBid.getBidder());

                 }

                artService.update(art);
            }
            l.setProcessed(true);
            repository.save(l);

        }

    }
    @Transactional
    @Scheduled(fixedRate = 60000) // Runs every hour
    public void updateAuctionStateForUpcomingLots() {
        // Get the current date and time in UTC
        Calendar calNow = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        Date currentTime = calNow.getTime();

        // Retrieve all auction lots from the repository
        List<AuctionLot> upcomingLots = repository.findAll();

        for (AuctionLot lot : upcomingLots) {
            Date startDate = lot.getStartDate();
            Date endDate = lot.getEndDate();

            // Check if the auction is currently in progress
            if (currentTime.compareTo(startDate) >= 0 && currentTime.compareTo(endDate) <= 0) {
                updateLotState(lot, AuctionState.INAUCTION);
            }

            // Check if the auction has ended and update the state accordingly
            if (currentTime.after(endDate)) {
                updateArtStates(lot);
            }
        }
    }

    private void updateLotState(AuctionLot lot, AuctionState state) {
        for (Art a : lot.getArts()) {
            if (!a.getState().equals(state)) {
                a.setState(state);
                artService.update(a);
            }
        }
        repository.save(lot);
    }

    private void updateArtStates(AuctionLot lot) {
        for (Art a : lot.getArts()) {
            if (bidService.getHighestBid(a) != null) {
                a.setState(AuctionState.BOUGHT);
            } else {
                a.setState(AuctionState.UNSOLD);
            }
            artService.update(a);
        }
        repository.save(lot);
    }

    // Helper method to compare if two dates are on the same day
    private boolean isSameDay(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTime(date1);
        cal2.setTime(date2);
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
                cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR);
    }
}
