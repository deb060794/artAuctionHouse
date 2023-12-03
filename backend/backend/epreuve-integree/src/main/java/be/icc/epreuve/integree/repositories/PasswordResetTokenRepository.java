package be.icc.epreuve.integree.repositories;

import be.icc.epreuve.integree.models.PasswordResetToken;
import be.icc.epreuve.integree.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByUser(User user);
}

