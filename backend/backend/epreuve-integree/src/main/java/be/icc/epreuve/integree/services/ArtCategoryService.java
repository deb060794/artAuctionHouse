package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.Artist;
import be.icc.epreuve.integree.models.ArtistCategory;
import be.icc.epreuve.integree.repositories.ArtCategoryRepository;
import be.icc.epreuve.integree.models.ArtCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArtCategoryService  {
    @Autowired
    ArtCategoryRepository repository;

    public ArtCategory insert(ArtCategory cat){
        return repository.save(cat);
    }

    public List<ArtCategory> getAll(){
        List<ArtCategory> categories = new ArrayList<>();
        repository.findAll().forEach(categories::add);
        return categories;
    }

    public Optional<ArtCategory> get(Long id){
        if(repository.findById(id).isPresent())
            return repository.findById(id);
        return null;
    }

    public ArtCategory update(Long id,ArtCategory cat){
        ArtCategory category = repository.findById(id).get();
        category.setName(cat.getName());
        return repository.save(category);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public List<Art> getArtInCategory(Long id){
        ArtCategory category = repository.findById(id).get();
        List<Art> arts = new ArrayList<>();
        category.getArtPieces().forEach(arts::add);
        return arts;

    }

    public Optional<ArtCategory> findByCategory(String category) {
       return repository.findByName(category);
    }
}
