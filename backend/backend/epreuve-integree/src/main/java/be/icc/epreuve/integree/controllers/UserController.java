package be.icc.epreuve.integree.controllers;


import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.FilesStorageService;
import be.icc.epreuve.integree.services.OrderService;
import be.icc.epreuve.integree.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/")
class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    OrderService orderService;


    @GetMapping("user/{id}")
    public ResponseEntity<?> findUser(@PathVariable("id") Long id) {
        try {
            Optional<User> result =userService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }




    @PostMapping("admin/user-create")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User newUser =  userService.insert(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("admin/user-update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User existUser = userService.findByUsername(user.getUsername());
        if (existUser != null && !(existUser.equals(user))){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        System.out.println("------------------------user---------------------------------------"+user.getRoles());
        return new ResponseEntity<>(userService.update(user), HttpStatus.CREATED);
    }
    @PutMapping("user/")
    public ResponseEntity<?> updateUserProfile(@RequestBody User user) {
        User existUser = userService.findByUsername(user.getUsername());
        if (existUser != null && !(existUser.equals(user))){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(userService.update(user), HttpStatus.CREATED);
    }

    @GetMapping("admin/all-users")
    public ResponseEntity<?> findAllUsers(){
        try {
            List<User> users = userService.getAll();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("admin/user-delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id ){


        try{
            if(userService.get(id).isPresent()){
                userService.delete(id);
                return new ResponseEntity<>(new MessageResponse("user is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("user is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("admin/user-deactivate/{id}")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id ){
        try{
            if(userService.get(id).isPresent()){
                boolean deactivate = userService.deactivate(id);
                return new ResponseEntity<>(deactivate, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("user is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = {"", ""})
    public ResponseEntity<?> getProfileData(Principal principal) {
        return ResponseEntity
                .ok(userService.findByUsername(principal.getName()));
    }


    @GetMapping("admin/user-number")
    public ResponseEntity<?> numberOfUsers(){
        Long number = userService.numberOfUsers();
        StringResponse response = new StringResponse();
        response.setResponse(number.toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("user/myOrders/{id}")
    public ResponseEntity<?> recentOrders(@PathVariable Long id) {
        Optional<User> userOptional = userService.get(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("User not found"), HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        List<Order> orders = user.getOrders();


        LocalDate currentDate = LocalDate.now();

        // Filter orders to include only those made within the last month
        List<Order> recentOrders = orders.stream()
                .filter(order -> order.getOrderDate() != null &&
                        ChronoUnit.DAYS.between(order.getOrderDate().toLocalDate(), currentDate) <= 30)
                .collect(Collectors.toList());



        return new ResponseEntity<>(recentOrders, HttpStatus.OK);
    }
    @GetMapping("user/myBids/{id}")
    public ResponseEntity<?> recentBids(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Bid> bids = user.get().getBids();
        LocalDate currentDate = LocalDate.now();

        List<Bid> recentBids = bids.stream()
                .filter(bid -> {
                    LocalDate creationDate = convertToLocalDate(bid.getBidDate());
                    return creationDate != null &&
                            ChronoUnit.DAYS.between(creationDate, currentDate) <= 30;
                })
                .collect(Collectors.toList());


        return new ResponseEntity<>(recentBids, HttpStatus.OK);
    }

    @GetMapping("user/myArts/{id}")
    public ResponseEntity<?> recentArts(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Art> arts = user.get().getSoldArts();
        LocalDate currentDate = LocalDate.now();

        List<Art> recentArts = arts.stream()
                .filter(art -> {
                    LocalDate creationDate = convertToLocalDate(art.getCreationDate());
                    return creationDate != null &&
                            ChronoUnit.DAYS.between(creationDate, currentDate) <= 30;
                })
                .collect(Collectors.toList());


        return new ResponseEntity<>(recentArts, HttpStatus.OK);
    }

    private LocalDate convertToLocalDate(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    @GetMapping("user/bids/{id}")
    public ResponseEntity<?> myBids(@PathVariable Long id) {
        Optional<User> userOptional = userService.get(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("User not found"), HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        List<Bid> bids = user.getBids();
        List<Order> orders = user.getOrders();


        Set<Long> orderedArtIds = orders.stream()
                .map(Order::getArt)
                .map(Art::getId)
                .collect(Collectors.toSet());


        List<Bid> filteredBids = bids.stream()
                .filter(bid -> !orderedArtIds.contains(bid.getArt().getId()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(filteredBids, HttpStatus.OK);
    }

    @GetMapping("user/offers/{id}")
    public ResponseEntity<?> myOffers(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Offer> offers = user.get().getOffersMade();

        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    @GetMapping("user/orders/{id}")
    public ResponseEntity<?> myOrders(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Order> orders = user.get().getOrders();

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("user/arts/{id}")
    public ResponseEntity<?> myArts(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Art> arts = user.get().getSoldArts();


        return new ResponseEntity<>(arts, HttpStatus.OK);
    }

    @GetMapping("user/myArticles")
    public ResponseEntity<?> myNumberOfArticles(@PathVariable Long id){
        Optional<User> user = userService.get(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(new MessageResponse("user not found"),HttpStatus.NOT_FOUND);
        }
        List<Article> articles = user.get().getArticles();
        int number = articles.size();
        StringResponse response = new StringResponse();
        response.setResponse(String.valueOf(number));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("user/offersReceived/{id}")
    public ResponseEntity<?> myReceivedOffers(@PathVariable Long id) {
        Optional<User> userOptional = userService.get(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("User not found"), HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        List<Offer> offers= user.getOffersReceived();


        return new ResponseEntity<>(offers, HttpStatus.OK);

    }









}
