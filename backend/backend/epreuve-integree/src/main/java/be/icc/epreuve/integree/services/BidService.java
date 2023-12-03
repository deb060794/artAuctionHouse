package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.repositories.ArtRepository;
import be.icc.epreuve.integree.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BidService {
    @Autowired
    public BidRepository repository;

    @Autowired
    private EmailService emailService;



    public Bid placeBid(Art art, User user, BigDecimal bidAmount) {
        Bid bid = new Bid();
        bid.setArt(art);
        bid.setAmount(bidAmount);
        bid.setState(BidState.PENDING);
        bid.setBidDate(new Date());
        bid.setBidder(user);
        Bid highestBid = repository.findTopByArtOrderByAmountDesc(art);
        if(highestBid != null) {
            if (bid.getAmount().compareTo(highestBid.getAmount()) > 0) {

                User previousHighestBidder = highestBid.getBidder();
                String bidLink = "http://localhost:4200/bid?id=" + art.getId();

                String subject = "Notice Regarding Your Bid ";

                String message = "Hello " + previousHighestBidder.getLastname() + ",\n\n" +
                        "We regret to inform you that your bid for the artwork has been surpassed. " +
                        "You can view the artwork details or place a new bid by following this link: " + bidLink + ".\n\n" +
                        "Thank you for your participation.";

                emailService.sendEmail(
                        previousHighestBidder.getEmail(),
                        subject,
                        message
                );

            }
        }



        return repository.save(bid);
    }

    public Bid insert(Bid bid){
        return repository.save(bid);
    }

    public List<Bid> getAll(){
        List<Bid> bids= new ArrayList<>();
        repository.findAll().forEach(bids::add);
        return bids;
    }

    public Optional<Bid> get(Long id){

        return repository.findById(id);

    }

    public Bid update( Bid bid){
        return repository.save(bid);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }
    public Bid getHighestBid(Art art){
        return repository.findTopByArtOrderByAmountDesc(art);
    }


}
