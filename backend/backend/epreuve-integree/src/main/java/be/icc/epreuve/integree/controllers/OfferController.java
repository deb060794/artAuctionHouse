package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.Bid;
import be.icc.epreuve.integree.models.Offer;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.request.BidRequest;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtService;
import be.icc.epreuve.integree.services.OfferService;
import be.icc.epreuve.integree.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OfferController {

    @Autowired
    private ArtService artService;

    @Autowired
    private OfferService offerService;

    @Autowired
    private UserService userService;

    @PostMapping("/makeOffer")
    public ResponseEntity<?> makeOffer(@RequestBody BidRequest bidRequest) {
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
        Offer offer = offerService.placeOffer(art,user,bidRequest.getAmount());
        return ResponseEntity.ok(offer);

    }
}
