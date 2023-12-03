package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.repositories.ArtRepository;
import be.icc.epreuve.integree.repositories.AuctionLotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArtService {
    @Autowired
    public ArtRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BidService service;

    @Autowired
    private AuctionLotRepository auctionLotRepository;



    public Art insert(Art art){
        Art savedArt = repository.save(art);

        return savedArt;
    }

    public List<Art> getAll(){
        List<Art> arts= new ArrayList<>();
        repository.findAll().forEach(arts::add);
        return arts;
    }

    public Optional<Art> get(Long id){

        return repository.findById(id);

    }

    public Art update(Art art){
        return repository.save(art);
    }

    public void delete(Long id){

            repository.deleteById(id);
    }

    public Set<Art> currentlyInAuction() {
        return new HashSet<>(repository.findAllByState(AuctionState.INAUCTION));
    }

    public Long numberOfArtworks() {
        return repository.count();
    }

    public AuctionLot startAuction(Art art , Date date, Date date2){
        if(art.getLot()==null){
            AuctionLot lot = new AuctionLot();
            lot.setStartDate(date);
            lot.setEndDate(date2);
            List<Art> arts = new ArrayList<Art>();
            arts.add(art);

        }else{
            art.getLot().getArts().add(art);
        }

        return auctionLotRepository.save(art.getLot());

    }
    public List<Bid> allBids(Art art){
        List<Bid> bids = new ArrayList<>();
        for (Bid bid:art.getBids()) {
            bids.add(bid);
        }
        return bids;
    }

    public List<Art> searchArt(String artName){
        return repository.findByTitleContaining(artName);

    }


    public List<Art> getAllById(List<Long> ids){

        return repository.findAllById(ids);

    }
}
