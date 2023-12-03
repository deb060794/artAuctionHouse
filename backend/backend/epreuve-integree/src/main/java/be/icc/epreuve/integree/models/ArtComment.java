package be.icc.epreuve.integree.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity(name = "art_comments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArtComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @Column(name = "content")
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable=false)
    private User writer;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "art_id",nullable=false)
    private Art art;

    @Column(name = "date_created",nullable=false)
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "flag")
    private boolean flag;
}
