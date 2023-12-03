package be.icc.epreuve.integree.controllers;

import be.icc.epreuve.integree.models.Role;
import be.icc.epreuve.integree.models.User;
import be.icc.epreuve.integree.payload.response.MessageResponse;
import be.icc.epreuve.integree.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> findRole(@PathVariable("id") Long id) {
        try {
            Optional<Role> result = roleService.get(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Role>> readRoles(){
        try {
            List<Role> roles = roleService.getAll();
            return new ResponseEntity<>(roles, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/role-update")
    public ResponseEntity<?> updateUser(@RequestBody Role role) {
        return new ResponseEntity<>(roleService.update(role), HttpStatus.CREATED);
    }
}
