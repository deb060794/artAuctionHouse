package be.icc.epreuve.integree.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.sql.Date;
import java.time.Instant;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "Articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Column
    private String title;


    @NotEmpty
    @Column(length = 10000)
    private String content;
    @Column(name = "created_on")
    @NotEmpty
    private Instant createdOn;
    @Column
    private Instant updatedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable=false)
    private User user;

    @OneToMany(mappedBy = "article",cascade = CascadeType.ALL)
    private List<ArticleComment> comments;






}
