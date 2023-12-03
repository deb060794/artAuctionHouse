package be.icc.epreuve.integree.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "artists")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String image_url;

    @Lob
    @Column(name = "description", length=2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "country")
    private Country country;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "category_artist",
            joinColumns = @JoinColumn(name = "artist_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_Category_id"))
    private List<ArtistCategory> categories;



    @JsonIgnore
    @OneToMany(mappedBy = "artist",cascade = CascadeType.ALL)
    private List<Art> artPieces;
}
