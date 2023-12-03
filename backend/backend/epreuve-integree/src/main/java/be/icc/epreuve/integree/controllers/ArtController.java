package be.icc.epreuve.integree.controllers;
import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.services.*;
import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import be.icc.epreuve.integree.payload.response.MessageResponse;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class ArtController {

    @Autowired
    private ArtService artService;

    @Autowired
    private ArtistService artistService;

    @Autowired
    private BidService bidService;

    @Autowired
    private AuctionLotService lotService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/{artId}/highestBid")
    public ResponseEntity<Optional<Bid>> getHighestBidForArt(@PathVariable Long artId) {
        Art art = artService.get(artId).orElse(null);
        if (art == null) {
            return ResponseEntity.notFound().build();
        }
        Bid highestBid = bidService.getHighestBid(art);
        return ResponseEntity.ok(Optional.ofNullable(highestBid));
    }



    @GetMapping("/art/")
    public ResponseEntity<?> findArt(@RequestParam("id") Long id) {
        try {
            Optional<Art> result = artService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @GetMapping("/allArts")
    public ResponseEntity<List<Art>> readArts(){
        try {
            List<Art> artPieces = artService.getAll();

            return new ResponseEntity<>(artPieces, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/art-delete/{id}")
    public ResponseEntity<?> deleteArt(@PathVariable Long id ){
        try{
            if(artService.get(id).isPresent()){
                artService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Art is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Art is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/art/inAuction")
    public ResponseEntity<Set<Art>> artInAuction(){
        try {
            Set<Art> artPieces =  artService.currentlyInAuction();
            return new ResponseEntity<>(artPieces, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/art-create")
    public ResponseEntity<?> createArt(@RequestBody Art art){

        Artist artistDetails = art.getArtist();


        if(artistDetails.getId() == 0) {
            Artist newArtist = artistService.insert(artistDetails);
            art.setArtist(newArtist);

        } else {
            Optional<Artist> existingArtist = artistService.get(artistDetails.getId());
            if (existingArtist == null) {
                return new ResponseEntity<>("Artist not found", HttpStatus.NOT_FOUND);
            }
            art.setArtist(existingArtist.get());

        }
        User user = authService.getCurrentUser().get();
        List <Art> arts = user.getSoldArts();
        arts.add(art);
        user.setSoldArts(arts);
        System.out.println(user.getRoles().toString());
        userService.update(user);
        art.setSeller(user);
        return new ResponseEntity<>(artService.insert(art), HttpStatus.CREATED);
    }



    @PostMapping("admin/lot-create")
    public ResponseEntity<?> createLot(@RequestBody AuctionLot lot){

        return new ResponseEntity<>(lotService.create(lot), HttpStatus.CREATED);
    }

    @PostMapping("/admin/start-auction/{id}/{idLot}")
    public ResponseEntity<?> startAuction(@PathVariable Long id,@PathVariable Long idLot) {

        try {
            Optional<Art> result = artService.get(id);
            if (result.isPresent()) {

               lotService.addArtToAuction(result.get(), idLot);


               return new ResponseEntity<>(new MessageResponse("art added to auction"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new MessageResponse("Art not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/allLots")
    public ResponseEntity<List<AuctionLot>> readLots() {
        try {
            List<AuctionLot> allLots = lotService.getLots();
            // Get the current date without time component
            Calendar calNow = Calendar.getInstance();
            calNow.set(Calendar.HOUR_OF_DAY, 0);
            calNow.set(Calendar.MINUTE, 0);
            calNow.set(Calendar.SECOND, 0);
            calNow.set(Calendar.MILLISECOND, 0);
            Date today = calNow.getTime(); // This is now "today" with the time set to midnight

            List<AuctionLot> availableLots = allLots.stream()
                    .filter(lot -> {
                        // Reset the time component of lot's start date to compare only the date part
                        Calendar calLot = Calendar.getInstance();
                        calLot.setTime(lot.getStartDate());
                        calLot.set(Calendar.HOUR_OF_DAY, 0);
                        calLot.set(Calendar.MINUTE, 0);
                        calLot.set(Calendar.SECOND, 0);
                        calLot.set(Calendar.MILLISECOND, 0);

                        // Compare the dates
                        return calLot.getTime().equals(today) || calLot.getTime().after(today);
                    })
                    .collect(Collectors.toList());

            return new ResponseEntity<>(availableLots, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return an internal server error response
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/admin/art-update")
    public ResponseEntity<?> updateProduct(@RequestBody Art art){
        return new ResponseEntity<>(artService.update(art), HttpStatus.CREATED);
    }

    @GetMapping("/admin/art-number")
    public ResponseEntity<?> numberOfartworks(){
        Long number = artService.numberOfArtworks();
        StringResponse response = new StringResponse();
        response.setResponse(number.toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/Bids/{id}")
    public ResponseEntity<?> myNumberOfBids(@PathVariable Long id){
        Optional<Art> art = artService.get(id);
        if(!art.isPresent()){
            return new ResponseEntity<>(new MessageResponse("Art not found"), HttpStatus.NOT_FOUND);

        }
        List<Bid> bids = artService.allBids(art.get());

        return new ResponseEntity(bids.size(),HttpStatus.OK);
    }

    @GetMapping("/art/search/{query}")
    public List<Art> search(@PathVariable String query) {
        return artService.searchArt(query);
    }








}
