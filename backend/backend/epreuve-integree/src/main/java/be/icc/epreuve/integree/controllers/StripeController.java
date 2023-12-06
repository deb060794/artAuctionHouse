package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.payload.request.CheckoutSessionRequest;
import be.icc.epreuve.integree.repositories.BidRepository;
import be.icc.epreuve.integree.repositories.OrderRepository;
import be.icc.epreuve.integree.services.ArtService;
import be.icc.epreuve.integree.services.AuthService;

import be.icc.epreuve.integree.services.UserService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ArtService artService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;



    static {
        Stripe.apiKey = "sk_test_51NCdjzDBZun9qG1Af5JAleCLK2iGZKt84a85F9PiGRfbQvbjcGsN7zVe5RPImI5BwrYe2z7SKAM4nYWYkfT6Z8x600uzqW5iBg";
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody CheckoutSessionRequest request) {
        List<Long> artIds = request.getArtIds();
        List<Art> artPieces = artService.getAllById(artIds);
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (Art art : artPieces) {
            Bid highestBid = bidRepository.findTopByArtOrderByAmountDesc(art);
            totalPrice = totalPrice.add(highestBid.getAmount());
        }
        Map<String, String> response = new HashMap<>();
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:4200/payment-confirm/" )
                    .setCancelUrl("http://localhost:4200/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("eur")
                                                    .setUnitAmount(totalPrice.multiply(new BigDecimal(100)).longValue()) // Convert to cents
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Art Purchase")
                                                                    .build())
                                                    .build())
                                    .setQuantity(1L)
                                    .build())
                    .putMetadata("artIds", String.join(",", artIds.stream().map(String::valueOf).collect(Collectors.toList())))
                    .putMetadata("totalPrice", totalPrice.toString())
                    .build();

            Session session = Session.create(params);

            response.put("id", session.getId());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            e.printStackTrace();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }


        @PostMapping("/confirm-order")
        public ResponseEntity<?> confirmOrder(@RequestBody Map<String, String> payload) {
            Map<String, Object> response = new HashMap<>();
            String sessionId = payload.get("sessionId");
            String userName = payload.get("user");

            Session session;
            List<Art> artWorks;
            BigDecimal totalPrice;
            try {
                session = Session.retrieve(sessionId);

                Map<String, String> metadata = session.getMetadata();

                // Extract information from metadata
                List<Long> artIds = Arrays.stream(metadata.get("artIds").split(","))
                        .map(Long::valueOf)
                        .collect(Collectors.toList());
                artWorks = artService.getAllById(artIds);
                totalPrice = new BigDecimal(metadata.get("totalPrice"));
            } catch (StripeException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving session");
            }
        // Check payment status
        if ("paid".equals(session.getPaymentStatus())) {
            Order order = new Order();
            for (Art a:artWorks) {
                a.setState(AuctionState.BOUGHT);
                order.setArt(a);
                order.setTotalPrice(totalPrice);
                System.out.println("userName"+userName);

                order.setBuyer(userService.findByUsername(userName));

                order.setState(OrderState.PAID);

                order.setQuantity(artWorks.size());

                orderRepository.save(order);
                a.setOrder(order);
                artService.insert(a);
            }


            response.put("success", true);
            response.put("message", "Order created successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Payment not successful");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        }


 }




