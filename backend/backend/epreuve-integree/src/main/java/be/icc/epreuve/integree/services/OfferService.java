package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.Art;
import be.icc.epreuve.integree.models.BidState;
import be.icc.epreuve.integree.models.Offer;

import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.repositories.OfferRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


@Service
public class OfferService {
    @Autowired
    public OfferRepository repository;

    @Autowired
    private EmailService emailService;

    public Offer placeOffer(Art art, User user, BigDecimal offerAmount) {
        Offer offer = new Offer();
        offer.setArt(art);
        offer.setAmount(offerAmount);
        offer.setState(BidState.PENDING);
        offer.setOffer(user);
        String offerLink = "http://localhost:4200/offer?id=" + art.getId();
        String subject = "Notice Regarding Your artwork ";
        String message = "Hello " + art.getSeller().getLastname() + ",\n\n" +
                        "We are pleased to inform you that an offer has been made for your artwork . " +
                        "You can view the artwork details and accept or reject the offer by following this link: " + offerLink + ".\n\n" +
                        "Thank you for your participation.";
        emailService.sendEmail(
                        art.getSeller().getEmail(),
                        subject,
                        message);

        return repository.save(offer);
    }
}
