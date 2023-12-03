package be.icc.epreuve.integree.controllers;


import be.icc.epreuve.integree.models.Artist;
import be.icc.epreuve.integree.models.ArtistCategory;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtistCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api/artistCategory")
public class ArtistCategoryController {

    @Autowired
    private ArtistCategoryService artistCategoryService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findArtistCategory(@PathVariable("id") Long id) {
        try {
            Optional<ArtistCategory> result = artistCategoryService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/api/admin/article-category-create")
    public ResponseEntity<ArtistCategory> createArtistCategory(@RequestBody ArtistCategory artistCategory){
        ArtistCategory newArtistCategory =  artistCategoryService.insert(artistCategory);
        return new ResponseEntity<>(newArtistCategory, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArtistCategory>> readArtistCategories(){
        try {
            List<ArtistCategory> artistCategories = artistCategoryService.getAll();
            return new ResponseEntity<>(artistCategories, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/article-category-delete/{id}")
    public ResponseEntity<?> deleteArtistCategory(@PathVariable Long id ){
        try{
            if(artistCategoryService.get(id).isPresent()){
                artistCategoryService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Artist category is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Artist category is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/article-category-update")
    public ResponseEntity<ArtistCategory> updateArtistCategory(@RequestBody ArtistCategory artistCategory){
        ArtistCategory newArtistCategory =  artistCategoryService.insert(artistCategory);
        return new ResponseEntity<>(newArtistCategory, HttpStatus.CREATED);
    }

    @GetMapping("/artists")
    public ResponseEntity<?> findByCategory(@RequestParam("id") Long id) {
        try {
            Set<Artist> artists = artistCategoryService.getArtistByCategory(id);
            return new ResponseEntity<>(artists, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
