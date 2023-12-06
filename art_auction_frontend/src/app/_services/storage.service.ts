import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveCart(cart: any): void {  
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
  }
  clearSessionCart() {
    window.sessionStorage.removeItem('sessionCart'); 
  }

  
  clearCart() {
     window.sessionStorage.removeItem('cart'); 
  }

  public saveSessionCart(session: any): void {  
    window.sessionStorage.setItem('sessionCart', JSON.stringify(session));
  }

  public getSessionCart(): any {
    const session = window.sessionStorage.getItem('sessionCart');
    if (session) {
      return JSON.parse(session);
    }

    return null;
  }
  public getCart(): any {
    const cart = window.sessionStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }

    return null;
  }
  
}
