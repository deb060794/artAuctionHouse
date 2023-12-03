package be.icc.epreuve.integree.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable=false)
    @JsonIgnore
    private User buyer;

    @OneToOne(mappedBy="order")
    private Art art;
    
    @Column(name="order_date")
    @CreationTimestamp
    private Date orderDate;
    
    @Column(name="quantity")
    private int quantity;
    
    @Column(name="total_price")
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name="state")
    private OrderState state;

}
