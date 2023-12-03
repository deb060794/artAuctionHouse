import { Injectable } from '@angular/core';
import { Art } from '../_model/art';

interface CartItem {
  art: Art;
  price: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {
    this.loadCartFromSession();
  }

  addToCart(art: Art, price:number): void {
    console.log('Adding to cart:', art);
    const item: CartItem = { art: art, price: price }; 
    console.log('Adding to cart:item ', item);
    this.cartItems.push(item);
    console.log('Adding to cart item ', item);
    this.saveCartToSession();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getItemCount(): number {
    return this.cartItems.length;
  }

  private saveCartToSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromSession(): void {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }
}

