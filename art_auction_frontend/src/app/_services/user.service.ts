import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_model/user';

const API_URL = 'http://localhost:8080/api/user';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
  }),
  
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  
  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(API_URL+"/"+id);
  }

  updateUserProfile( user: User): Observable<User> {
    return this.http.put<User>(API_URL+"/", user);
  }

  subscribe(userId: number): Observable<any> {
    return this.http.post(API_URL+"/"+userId+"/"+"/unsubscribe", {});
  }

  unsubscribe(userId: number): Observable<any> {
    return this.http.post(API_URL+"/"+userId+"/"+"/unsubscribe", {});
  }

  numberOfOrders(id: number): Observable<any>  {
    return this.http.get(API_URL +"/myOrders/"+id);
  }
  numberOfBids(id: number): Observable<any>  {
    return this.http.get(API_URL +"/myBids/"+id);
  }
  numberOfarts(id: number): Observable<any>  {
    return this.http.get(API_URL +"/myArts/"+id);
  }

  myBids(id: number): Observable<any>  {
    return this.http.get(API_URL +"/bids/"+id);
  }

  myOffers(id: number): Observable<any>  {
    return this.http.get(API_URL +"/offers/"+id);
  }

  myarts(id: number): Observable<any>  {
    return this.http.get(API_URL +"/arts/"+id);
  }

  myOrders(id: number): Observable<any>  {
    return this.http.get(API_URL +"/orders/"+id);
  }



  
  
}
