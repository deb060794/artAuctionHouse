package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.*;
import be.icc.epreuve.integree.repositories.RoleRepository;
import be.icc.epreuve.integree.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    public UserRepository repository;

    @Autowired
    public RoleRepository roleRepository;

    public User insert(User user){

        return repository.save(user);
    }

    public List<User> getAll(){
        List<User> users= new ArrayList<>();
        repository.findAll().forEach(users::add);
        return users;
    }

    public Optional<User> get(Long id){
        return repository.findById(id);

    }

    public User update( User user){
        return repository.save(user);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }

    public User findByUsername(String name) {
        return repository.findByUsername(name).get();
    }


    public Long numberOfUsers() {

        return repository.count();
    }

    public boolean deactivate(Long id){
        User user = repository.findById(id).get();
        if(user.isDeactivate() == true){
            user.setDeactivate(false);
        }else{
            user.setDeactivate(true);
        }
        repository.save(user);
        return user.isDeactivate();
    }


    public Optional<User> getByUsername(String username) {
       Optional<User> user = repository.findByUsername(username);
        return user;
    }
}
