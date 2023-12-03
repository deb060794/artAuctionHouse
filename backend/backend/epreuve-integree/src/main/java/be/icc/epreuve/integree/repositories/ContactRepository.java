package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}

