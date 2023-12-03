import { Injectable } from '@angular/core';

declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  stripe: any;

  constructor() {
    this.stripe = Stripe('pk_test_51NCdjzDBZun9qG1AqtXo9K98DI8UQ5kDD6jx3e15P82J7g22yy2CTjhZNOzOJqczZETKHEkHWtHGKeGJB4bMeHGC00T8KtsYTP');  
  }

  getStripe() {
    return this.stripe;
  }
}
