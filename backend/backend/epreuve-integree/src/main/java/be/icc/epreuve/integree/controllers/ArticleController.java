package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Article;
import be.icc.epreuve.integree.models.ArticleComment;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.dto.ArticleDto;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findArticle(@PathVariable("id") Long id) {
        try {
            ArticleDto result = articleService.readSingleArticle(id);
            return ResponseEntity.ok(result);


        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @PostMapping("/add")
    public ResponseEntity<Article> createArticle(@RequestBody ArticleDto article){
        Article newArticle =  articleService.createArticle(article);
        return new ResponseEntity<>(newArticle, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArticleDto>> readArticles(){
        try {
            List<ArticleDto> articleComments = articleService.showAllArticles();
            return new ResponseEntity<>(articleComments, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/article-delete")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id ){
        try{
            if(articleService.readSingleArticle(id) != null){
                articleService.delete(id);
                return new ResponseEntity<>(new MessageResponse("Article is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("Article is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/article-update")
    public ResponseEntity<?> updateArticle(@RequestBody ArticleDto article) {
        return new ResponseEntity<>(articleService.updateArticle(article), HttpStatus.CREATED);
    }
}
