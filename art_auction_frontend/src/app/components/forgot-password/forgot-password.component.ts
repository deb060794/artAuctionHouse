import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userEmail: string = '';
  successMessage: string = ''; 
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmitForgotPassword() {
    this.authService.sendResetLink(this.userEmail).subscribe(response => {
      this.successMessage = "Reset link sent to your email!";
      this.errorMessage = ''; 
    }, error => {
      this.errorMessage = "Failed to send reset link. Please try again.";
      this.successMessage = ''; 
    });
  }
}
