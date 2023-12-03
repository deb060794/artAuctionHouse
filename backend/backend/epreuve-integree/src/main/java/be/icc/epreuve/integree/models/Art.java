package be.icc.epreuve.integree.models;

import be.icc.epreuve.integree.util.ArtDeserializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import java.util.Date;
import java.util.List;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity (name ="art_pieces")
public class Art {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable=false)
    private long id ;

    @Column(name = "title",nullable=false)
    private String title;

    @Column(name = "description",nullable=false)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation-date",nullable=false)
    private Date creationDate;

    @Column(name = "initial_price",nullable=false)
    private BigDecimal initialPrice;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;


    @ManyToOne
    @JoinColumn(name = "lot_id")
    private AuctionLot lot;

    @Enumerated(EnumType.STRING)
    @Column(name = "AuctionState", nullable=false)
    private AuctionState state;


    @JsonIgnore
    @OneToMany(mappedBy = "art",cascade = CascadeType.ALL)
    private List<ArtComment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "art",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Bid> bids;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name ="order_id", nullable=true)
    private Order order;


    @JsonDeserialize(using = ArtDeserializer.class)
    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id",nullable=false)
    private ArtCategory category;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "artist_id",nullable=false)
    private Artist artist;





}
