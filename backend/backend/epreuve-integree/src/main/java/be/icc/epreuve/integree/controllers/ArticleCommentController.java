package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.ArticleComment;
import be.icc.epreuve.integree.payload.dto.CommentDto;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArticleCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/post/")
public class ArticleCommentController {
    @Autowired
    private ArticleCommentService articleCommentService;

    @GetMapping("/comment/{id}")
    public ResponseEntity<?> findArticle(@PathVariable("id") Long id) {
        try {
            Optional<ArticleComment> result = articleCommentService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/comment-create")
    public ResponseEntity<ArticleComment> createArticleComment(@RequestBody ArticleComment articleComment){
        ArticleComment newArticleComment =  articleCommentService.insert(articleComment);
        return new ResponseEntity<>(newArticleComment, HttpStatus.CREATED);
    }

    @GetMapping("{id}/comments")
    public ResponseEntity<?> findArticleComments(@PathVariable("id") Long id) {
        try {
            List<CommentDto> comments = articleCommentService.readComments(id);
            return ResponseEntity.ok(comments);


        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArticleComment>> readArticleComments(){
        try {
            List<ArticleComment> articleComments = articleCommentService.getAll();
            return new ResponseEntity<>(articleComments, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/comment-delete/{id}")
    public ResponseEntity<?> deleteArticleComment(@PathVariable Long id ){
        try{
            if(articleCommentService.get(id).isPresent()){
                articleCommentService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Article comment is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Article comment is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
