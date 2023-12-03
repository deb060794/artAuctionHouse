package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("creativeauctionhouse@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
        } catch (MailException ex) {

            System.err.println("Failed to send email: " + ex.getMessage());
        }
    }


    public void sendEmailToWinner(User bidder) {
        String subject = "Congratulations on Your Winning Bid!";
        String messageBody = "Hello " + bidder.getLastname() + ",\n\n" +
                "We are excited to inform you that you have the winning bid for one of our artworks!\n\n" +
                "Please visit our website to finalize your purchase and arrange for delivery.\n\n" +
                "Thank you for participating in our auction.";

        sendEmail(bidder.getEmail(), subject, messageBody);
    }

    public void sendPasswordResetMail(String userEmail, String token) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEmail);
        mailMessage.setSubject("Password Reset Request");
        mailMessage.setText("To complete the password reset process, please click here: "
                + "http://localhost:4200/reset-password?token=" + token);
        mailSender.send(mailMessage);
    }
    public void sendContactUsEmail(String name, String fromEmail, String content) {
        String to = "creativeauctionhouse@gmail.com"; // The email address that will receive the contact messages
        String subject = "Contact Us Message from: " + name;
        String messageBody = "You have received a new message from: " + name + " (" + fromEmail + "):\n\n" + content;

        sendEmail(to, subject, messageBody);
    }
}

