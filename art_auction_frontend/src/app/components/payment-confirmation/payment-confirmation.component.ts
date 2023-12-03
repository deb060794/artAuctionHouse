import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  sessionId: any;
  
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['id'];
      console.log(this.sessionId);
    });
  }

  confirmOrder() {
    this.http.post<{ success: boolean, message?: string }>('http://localhost:8080/api/stripe/confirm-order', { sessionId: this.sessionId })
    .subscribe(response => {
      if (response.success) {
        this.router.navigate(['/success']);
      } else {
        alert(response.message || 'An error occurred while confirming the order.');
      }
    }, error => {
      alert('An error occurred. Please try again.');
    });
  }
}

