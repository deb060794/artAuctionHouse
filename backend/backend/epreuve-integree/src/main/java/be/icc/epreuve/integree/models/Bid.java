package be.icc.epreuve.integree.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "bids")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable=false)
    private User bidder;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "art_id",nullable=false)
    private Art art;

    @Column(name = "bidding_price")
    private BigDecimal amount;

    @Column(name = "auction_date")
    @CreationTimestamp
    private Date bidDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private BidState state;
}
