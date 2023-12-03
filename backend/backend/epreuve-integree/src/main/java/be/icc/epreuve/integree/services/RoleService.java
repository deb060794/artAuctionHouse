package be.icc.epreuve.integree.services;


import be.icc.epreuve.integree.repositories.RoleRepository;
import be.icc.epreuve.integree.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    public RoleRepository repository;

    public Role insert(Role role){
        return repository.save(role);
    }

    public List<Role> getAll(){
        List<Role> roles= new ArrayList<>();
        repository.findAll().forEach(roles::add);
        return roles;
    }

    public Optional<Role> get(Long id){

        return repository.findById(id);

    }

    public Role update(Role role){
        return repository.save(role);
    }

    public void delete(Long id){

        repository.deleteById(id);
    }
}
