package be.icc.epreuve.integree.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;


    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Column(name ="firstname")
    private String firstname;

    @NotBlank
    @Column(name ="lastname")
    private String lastname;

    @NotBlank
    @Column(name ="address")
    private String address;


    @NotBlank
    @JsonIgnore
    @Size(max = 120)
    @Column(name ="password")
    private String password;

    @NotBlank
    @Size(max = 20)
    private String username;

    @Column(name="deactivate")
    private boolean deactivate = false;




    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "writer",cascade = CascadeType.ALL)
    private List<ArtComment> artComments;

    @JsonIgnore
    @OneToMany(mappedBy = "buyer",cascade = CascadeType.ALL)
    private List<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "bidder",cascade = CascadeType.ALL)
    private List<Bid> bids;

    @JsonIgnore
    @OneToMany(mappedBy = "offer",cascade = CascadeType.ALL)
    private List<Offer> offers;
    @JsonIgnore
    @OneToMany(mappedBy = "writer",cascade = CascadeType.ALL)
    private List<ArticleComment> articleComments;

    @JsonIgnore
    @OneToMany(mappedBy = "seller")
    private List<Art> soldArts;

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Article> articles;


    public User(@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 120) String password,@NotBlank @Size(max = 200) String adress, @NotBlank @Size(max = 200) String lastname, @NotBlank @Size(max = 200) String firstname) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = adress;
        this.lastname = lastname;
        this.firstname = firstname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

