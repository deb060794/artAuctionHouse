package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.ArtistCategory;
import be.icc.epreuve.integree.repositories.ArtistCategoryRepository;
import be.icc.epreuve.integree.repositories.ArtistRepository;
import be.icc.epreuve.integree.models.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArtistService {
    @Autowired
    public ArtistRepository repository;

    @Autowired
    public ArtistCategoryRepository artistCategoryrepository;

    public Artist insert(Artist artist){
        return repository.save(artist);
    }

    public List<Artist> getAll(){
        List<Artist> artists= new ArrayList<>();
        for (Artist artist:repository.findAll()) {
            if(artist.getArtPieces().size()>0){
                artists.add(artist);
            }

        }
        return artists;
    }

    public Optional<Artist> get(Long id){

        return repository.findById(id);

    }

    public Artist update( Artist artist){
        return repository.save(artist);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }

    public List<Art> myArt(Long id){
        List<Art> artworks = new ArrayList<>();
        Artist artist = repository.findById(id).get();
        for (Art a: artist.getArtPieces())
        {
            artworks.add(a);

        }
        return artworks;

    }





}
