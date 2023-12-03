package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.services.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private NewsletterService service;

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody String email) {
        service.subscribe(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Subscription successful");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}

