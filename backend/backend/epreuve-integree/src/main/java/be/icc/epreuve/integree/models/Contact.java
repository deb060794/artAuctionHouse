package be.icc.epreuve.integree.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Contact {
    @Id
    private long id;
    private String name;
    private String email;
    private String message;
}
