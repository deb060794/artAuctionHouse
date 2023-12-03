package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.ArtCategory;
import be.icc.epreuve.integree.models.ArtComment;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArtCategoryService;
import be.icc.epreuve.integree.services.ArtCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api/artComment")
public class ArtCommentController {
    @Autowired
    private ArtCommentService artCommentService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findArtComment(@PathVariable("id") Long id) {
        try {
            Optional<ArtComment> result = artCommentService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/art-comment-create")
    public ResponseEntity<ArtComment> createArtComment(@RequestBody ArtComment artComment){
        ArtComment newArtComment =  artCommentService.insert(artComment);
        return new ResponseEntity<>(newArtComment, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArtComment>> readComments(){
        try {
            List<ArtComment> artCategories = artCommentService.getAll();
            return new ResponseEntity<>(artCategories, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/art-comment-delete/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id ){
        try{
            if(artCommentService.get(id).isPresent()){
                artCommentService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Art is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Art is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
