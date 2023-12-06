package be.icc.epreuve.integree.services;

import be.icc.epreuve.integree.models.User;
import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserService userService;
    public Optional<User> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            Long userId = ((UserDetailsImpl) principal).getId();
            return userService.get(userId);
        } else if (principal instanceof String) {

            String username = (String) principal;

            return userService.getByUsername(username);
        } else {
            // Handle other cases or throw an exception
            throw new IllegalStateException("Principal type is not supported");
        }
    }

}
