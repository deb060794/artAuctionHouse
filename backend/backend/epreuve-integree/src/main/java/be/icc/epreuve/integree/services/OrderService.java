package be.icc.epreuve.integree.services;


import be.icc.epreuve.integree.repositories.OrderRepository;
import be.icc.epreuve.integree.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    public OrderRepository repository;

    public Order insert(Order order){
        return repository.save(order);
    }

    public List<Order> getAll(){
        List<Order> orders= new ArrayList<>();
        repository.findAll().forEach(orders::add);
        return orders;
    }

    public Optional<Order> get(Long id){

        return repository.findById(id);

    }

    public Order update( Order order){
        return repository.save(order);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }

    public Long numberOfOrders() {
        return repository.count();
    }


}
