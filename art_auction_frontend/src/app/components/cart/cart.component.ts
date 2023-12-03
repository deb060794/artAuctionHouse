import { Component, OnInit } from '@angular/core';
import { Art } from 'src/app/_model/art';
import { CartService } from 'src/app/_services/cart.service';
import { StripeService } from 'src/app/_services/stripe.service';

interface CartItem {
  art: Art;
  price: number;
  
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  artIds: any[] = [];
  totalAmount: number = 0;
 

  constructor(private stripeService: StripeService, private cartService: CartService) {}


  ngOnInit(): void {
    this.cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.artIds = this.cart.map((item: CartItem) => item.art?.id).filter(id => id !== undefined);
    this.calculateTotal()
  }

  calculateTotal(): void {
    this.totalAmount = this.cart.reduce((acc, item) => acc + item.price, 0);
  }

  

  checkout() {
    
    const stripe = this.stripeService.getStripe();

    fetch('http://localhost:8080/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ artIds: this.artIds})
    })
   
    .then(response => response.json())
    .then(session => {
      console.log(session.id);
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}


