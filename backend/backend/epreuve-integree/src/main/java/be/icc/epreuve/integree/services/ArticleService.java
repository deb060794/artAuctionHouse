package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.exceptions.ArticleNotFoundException;
import be.icc.epreuve.integree.models.Article;
import be.icc.epreuve.integree.models.ArticleComment;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.dto.ArticleDto;
import be.icc.epreuve.integree.repositories.ArticleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.time.Instant;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class ArticleService {
    @Autowired
    public ArticleRepository repository;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Transactional
    public List<ArticleDto> showAllArticles() {
        List<Article> articles = repository.findAll();
        return articles.stream().map(this::mapFromArticleToDto).collect(toList());
    }

    @Transactional
    public Article createArticle(ArticleDto articleDto) {
        Article article = mapFromDtoToArticle(articleDto);
        return repository.save(article);
    }

    @Transactional
    public Article updateArticle(ArticleDto articleDto) {
        Article article = mapFromDtoToArticle(articleDto);
        return repository.save(article);
    }

    @Transactional
    public ArticleDto readSingleArticle(Long id) {
        Article article = repository.findById(id).orElseThrow(() -> new ArticleNotFoundException("For id " + id));
        return mapFromArticleToDto(article);
    }

    @Transactional
    public List<ArticleComment> readComments(Long id) {
        Article article = repository.findById(id).orElseThrow(() -> new ArticleNotFoundException("For id " + id));
        List<ArticleComment> comments = article.getComments();
        return comments;
    }

    private ArticleDto mapFromArticleToDto(Article article) {
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(article.getId());
        articleDto.setTitle(article.getTitle());
        articleDto.setContent(article.getContent());
        articleDto.setUsername(article.getUser().getUsername());
        return articleDto;
    }

    private Article mapFromDtoToArticle(ArticleDto articleDto) {
        Article article = new Article();
        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        article.setCreatedOn(Instant.now());
        article.setUser(authService.getCurrentUser().get());
        return article;
    }

    public void delete(Long id){

        repository.deleteById(id);
    }
}
