package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.Bid;
import be.icc.epreuve.integree.models.Order;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.request.BidRequest;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtService;
import be.icc.epreuve.integree.services.BidService;
import be.icc.epreuve.integree.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BidController {
    @Autowired
    private BidService bidService;

    @Autowired
    private ArtService artService;

    @Autowired
    private UserService userService;



    @GetMapping("/bid/{id}")
    public ResponseEntity<?> findBid(@PathVariable("id") Long id) {
        try {
            Optional<Bid> result = bidService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/bid")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid){
        Bid newBid =  bidService.insert(bid);
        return new ResponseEntity<>(newBid, HttpStatus.CREATED);
    }

    @GetMapping("/bid/all")
    public ResponseEntity<List<Bid>> readBids(){
        try {
            List<Bid> artists = bidService.getAll();
            return new ResponseEntity<>(artists, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/bid-delete")
    public ResponseEntity<?> deleteBid(@PathVariable Long id ){
        try{
            if(bidService.get(id).isPresent()){
                bidService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Bid is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Bid is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/bid-update")
    public ResponseEntity<?> updateUser(@RequestBody Bid bid) {
        return new ResponseEntity<>(bidService.update(bid), HttpStatus.CREATED);
    }

    @PostMapping("/placeBid")
    public ResponseEntity<?> placeBid(@RequestBody BidRequest bidRequest) {
        Art art =null;
        User user = null;

        if(!artService.get(bidRequest.getArtId()).isPresent()){
            return new ResponseEntity<>(new MessageResponse("Art Not found"), HttpStatus.NOT_FOUND);
        }else{
            art = artService.get(bidRequest.getArtId()).get();
        }
        if(!userService.get(bidRequest.getBidderId()).isPresent()){
            System.out.println(bidRequest.getBidderId());
            return new ResponseEntity<>(new MessageResponse("User Not found"), HttpStatus.NOT_FOUND);
        }else{
            user = userService.get(bidRequest.getBidderId()).get();
        }
        Bid bid = bidService.placeBid(art,user,bidRequest.getAmount());
        return ResponseEntity.ok(bid);

    }


}
