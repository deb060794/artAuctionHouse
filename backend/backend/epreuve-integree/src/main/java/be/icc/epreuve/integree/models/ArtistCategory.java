package be.icc.epreuve.integree.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "artist_categories")
public class ArtistCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "category")
    private String category;

    @Column(name = "image_url")
    private String imageUrl;

    @JsonIgnore
    @ManyToMany(mappedBy = "categories")
    private List<Artist> artists;

}
