package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.ArtCategory;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api/artCategory")
public class ArtCategoryController {
    @Autowired
    private ArtCategoryService artCategoryService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findArtCategory(@PathVariable("id") Long id) {
        try {
            Optional<ArtCategory> result = artCategoryService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/admin/art-category-create")
    public ResponseEntity<ArtCategory> createArtCategory(@RequestBody ArtCategory art){
        ArtCategory newArtCategory =  artCategoryService.insert(art);
        return new ResponseEntity<>(newArtCategory, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArtCategory>> readCategory(){
        try {
            List<ArtCategory> artCategories = artCategoryService.getAll();
            return new ResponseEntity<>(artCategories, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/arts")
    public ResponseEntity<List<Art>> getArt(@RequestParam("id") Long id){
        try {
            List<Art> arts = artCategoryService.getArtInCategory(id);
            return new ResponseEntity<>(arts, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/art-category-delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id ){
        try{
            if(artCategoryService.get(id).isPresent()){
                artCategoryService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Art is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Art is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
