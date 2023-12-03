package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Contact;
import be.icc.epreuve.integree.repositories.ContactRepository;
import be.icc.epreuve.integree.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

        @Autowired
        private ContactRepository repository;

        @Autowired
        private EmailService emailService;


        @PostMapping("/contact-us")
        public ResponseEntity<String> contactUs(@RequestBody Contact contact) {
            repository.save(contact);
            emailService.sendContactUsEmail(contact.getName(), contact.getEmail(), contact.getMessage());
            return ResponseEntity.ok("Message received successfully!");
        }
}

