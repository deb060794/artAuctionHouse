import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/contact-us', this.contact)
      .subscribe(response => {
        // Handle response
        console.log('Message sent successfully', response);
      }, error => {
        console.error('Error sending message', error);
      });
  }

}
