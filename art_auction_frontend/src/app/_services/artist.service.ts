import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
  }),
  
};

const API_URL = 'http://localhost:8080/api/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

 

  constructor(private http: HttpClient) { }

  getArtistById(id: number): any {
    return this.http.get(API_URL + '?id=' + id,httpOptions);
  }
  
  getArtOfArtist(id: number): any {
    return this.http.get(API_URL + '/arts?id=' + id,httpOptions);
  }

  

}
