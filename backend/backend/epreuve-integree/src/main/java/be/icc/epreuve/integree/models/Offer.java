package be.icc.epreuve.integree.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable=false)
    private User offer;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "art_id",nullable=false)
    private Art art;

    @Column(name = "offer_price")
    private BigDecimal amount;

    @Column(name = "auction_date")
    @CreationTimestamp
    private Date bidDate;


    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private BidState state;
}

