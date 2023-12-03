package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.repositories.ArtCommentRepository;
import be.icc.epreuve.integree.models.ArtComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ArtCommentService {

    @Autowired
    public ArtCommentRepository repository;

    public ArtComment insert(ArtComment comment){
        return repository.save(comment);
    }

    public List<ArtComment> getAll(){
        List<ArtComment> comments= new ArrayList<>();
        repository.findAll().forEach(comments::add);
        return comments;
    }

    public Optional<ArtComment> get(Long id){

        return repository.findById(id);

    }

    public ArtComment update(Long id,ArtComment com){
        ArtComment comment= repository.findById(id).get();
        comment.setContent(com.getContent());
        comment.setArt(com.getArt());
        comment.setFlag(com.isFlag());
        comment.setWriter(com.getWriter());
        comment.setDateCreated(com.getDateCreated());
        return repository.save(com);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

}
