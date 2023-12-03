package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Bid;
import be.icc.epreuve.integree.models.Order;
import be.icc.epreuve.integree.models.StringResponse;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.BidService;
import be.icc.epreuve.integree.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/order/{id}")
    public ResponseEntity<?> findOrder(@PathVariable("id") Long id) {
        try {
            Optional<Order> result = orderService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @GetMapping("/admin/allOrders")
    public ResponseEntity<List<Order>> readOrders(){
        try {
            List<Order> orders = orderService.getAll();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/order-delete")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id ){
        try{
            if(orderService.get(id).isPresent()){
                orderService.delete(id);
                return new ResponseEntity<>(new MessageResponse("order is deleted successfully."), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse("order is not found."), HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("admin/order-number")
    public ResponseEntity<?> numberOfOrders(){
        Long number = orderService.numberOfOrders();
        StringResponse response = new StringResponse();
        response.setResponse(number.toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PutMapping("/admin/order-update")
    public ResponseEntity<?> updateUser(@RequestBody Order order) {
        return new ResponseEntity<>(orderService.update(order), HttpStatus.CREATED);
    }

}
