package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.NewsletterSubscription;
import be.icc.epreuve.integree.repositories.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsletterService {

    @Autowired
    private NewsletterSubscriptionRepository repository;



    public void subscribe(String email) {
        NewsletterSubscription subscription = new NewsletterSubscription();
        subscription.setEmail(email);
        repository.save(subscription);
    }
}

