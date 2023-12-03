package be.icc.epreuve.integree.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "lots")
public class AuctionLot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="processed")
    private boolean processed;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date",nullable=true)
    private Date endDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date",nullable=true)
    private Date startDate;

    @JsonIgnore
    @OneToMany(mappedBy = "lot",cascade = CascadeType.ALL)
    private List<Art> arts;



}
