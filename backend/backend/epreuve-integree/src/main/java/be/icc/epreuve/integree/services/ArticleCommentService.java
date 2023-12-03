package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.exceptions.ArticleNotFoundException;
import be.icc.epreuve.integree.models.Article;
import be.icc.epreuve.integree.payload.dto.CommentDto;
import be.icc.epreuve.integree.repositories.ArticleCommentRepository;
import be.icc.epreuve.integree.models.ArticleComment;
import be.icc.epreuve.integree.repositories.ArticleRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleCommentService {
    @Autowired
    public ArticleCommentRepository repository;

    @Autowired
    public ArticleRepository articleRepository;

    public ArticleComment insert(ArticleComment articleComment){
        return repository.save(articleComment);
    }

    public List<ArticleComment> getAll(){
        List<ArticleComment> articleComments= new ArrayList<>();
        repository.findAll().forEach(articleComments::add);
        return articleComments;
    }

    public Optional<ArticleComment> get(Long id){

        return repository.findById(id);

    }

    @Transactional
    public List<CommentDto> readComments(Long id) {
        List<ArticleComment> comments = articleRepository.findById(id).get().getComments();
        return comments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private CommentDto convertToDto(ArticleComment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setDateCreated(comment.getDateCreated());
        if (comment.getWriter() != null) {
            dto.setWriterName(comment.getWriter().getUsername());
        }

        return dto;
    }



    public ArticleComment update(Long id, ArticleComment articleComment){
        ArticleComment articleComment2= repository.findById(id).get();
        articleComment2.setArticle(articleComment.getArticle());
        articleComment2.setContent(articleComment.getContent());
        articleComment2.setWriter(articleComment.getWriter());
        articleComment2.setDateCreated(articleComment.getDateCreated());
        return repository.save(articleComment2);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }
}
