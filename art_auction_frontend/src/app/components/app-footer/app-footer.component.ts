import { Component } from '@angular/core';
import { NewsletterService } from 'src/app/_services/newsletter-service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent {
  constructor(private newsletterService: NewsletterService, private router: Router) { }

  subscribeToNewsletter(email: string) {
    if(email) {
      this.newsletterService.subscribe(email).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/subscription-success']);
        },
        error => {
          console.error('Subscription failed', error);
        }
      );
    } else {
      console.log('Invalid email address.');
    }
  }


}
