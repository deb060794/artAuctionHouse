import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  form2: any = {
    username: null,
    email: null,
    password: null,
    adress:null,
    postalCode:null,
    firstname:null,
    lastname:null,
    
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmitSignup(): void {
    const { username, email, password,adress,firstname,lastname } = this.form2;

    this.authService.register(username, email, password,adress,firstname,lastname).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


}
