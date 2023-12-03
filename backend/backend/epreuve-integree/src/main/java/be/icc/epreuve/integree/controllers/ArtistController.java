package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api")
public class ArtistController {
    @Autowired
    private ArtistService artistService;

    @GetMapping("/artist")
    public ResponseEntity<?> findArtist(@RequestParam("id") long id) {
        try {
            System.out.println("im here");
            Optional<Artist> result = artistService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/artist-create")
    public ResponseEntity<Artist> createArtist(@RequestBody  Artist artist){
        Artist newArtist =  artistService.insert(artist);
        return new ResponseEntity<>(newArtist, HttpStatus.CREATED);
    }

    @GetMapping("/artist/all")
    public ResponseEntity<List<Artist>> readArtists(){
        try {
            List<Artist> artists = artistService.getAll();
            return new ResponseEntity<>(artists, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/artist/artist-update")
    public ResponseEntity<?> updateUser(@RequestBody Artist artist) {
        return new ResponseEntity<>(artistService.update(artist), HttpStatus.CREATED);
    }

    @DeleteMapping("/artist/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable Long id ){
        try{
            if(artistService.get(id).isPresent()){
                artistService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Artist category is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Artist category is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/artist/arts")
    public ResponseEntity<List<Art>> readArtsByArtist(@RequestParam("id") Long id){
        try {
            List<Art> artworks= artistService.myArt(id);
            return new ResponseEntity<>(artworks, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
