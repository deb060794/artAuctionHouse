import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  sessionId: any;
  user!: User;
  currentUser: any;
  
  constructor(private userService : UserService,private http: HttpClient,private route: ActivatedRoute,private router: Router, private storageService : StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserProfile(this.currentUser.id).subscribe(
      data => {
        this.user = data
        console.log(this.user.username);
        
    }
      
      );
    
   
  }

  confirmOrder() {
    this.sessionId = this.storageService.getSessionCart();
    console.log(this.sessionId);
    this.http.post<{ success: boolean, message?: string }>('http://localhost:8080/api/stripe/confirm-order', { sessionId: this.sessionId, user: this.user.username })
        .subscribe(response => {
            console.log(response.message);
            if (response.success) {
                this.storageService.clearCart();
                this.storageService.clearSessionCart();
                
                this.router.navigate(['/success']);
            } else {
                alert(response.message || 'An error occurred while confirming the order.');
            }
        }, error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}
}
