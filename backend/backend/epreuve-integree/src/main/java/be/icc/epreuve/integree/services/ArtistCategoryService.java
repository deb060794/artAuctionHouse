package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.Artist;
import be.icc.epreuve.integree.repositories.ArtistCategoryRepository;

import be.icc.epreuve.integree.models.ArtistCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArtistCategoryService {
    @Autowired
    public ArtistCategoryRepository repository;

    public ArtistCategory insert(ArtistCategory artistCategory){
        return repository.save(artistCategory);
    }

    public List<ArtistCategory> getAll(){
        List<ArtistCategory> articleCategories= new ArrayList<>();
        repository.findAll().forEach(articleCategories::add);
        return articleCategories;
    }

    public Optional<ArtistCategory> get(Long id){

        return repository.findById(id);

    }

    public ArtistCategory update(Long id, ArtistCategory artistCategory){
        ArtistCategory artistCategory2= repository.findById(id).get();
        artistCategory2.setCategory(artistCategory.getCategory());
        return repository.save(artistCategory2);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }

    public Set<Artist> getArtistByCategory(Long id){
        ArtistCategory category = repository.findById(id).get();
        Set<Artist> artists = new HashSet<>();
        for (Artist artist:category.getArtists())
        {
            if(artist.getArtPieces().size()>0){
                artists.add(artist);
            }


        }
        return artists;
    }
}
