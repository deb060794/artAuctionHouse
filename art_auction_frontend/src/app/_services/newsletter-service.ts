import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private baseUrl = 'http://localhost:8080/api/newsletter';  // Update the URL based on your server configuration

  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscribe`, email);
  }
}