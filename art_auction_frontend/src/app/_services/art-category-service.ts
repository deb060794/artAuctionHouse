import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/artCategory';

@Injectable({
  providedIn: 'root'
})
export class ArtCategoryService{

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(API_URL+ '/all' );
  }

  getArtsByCategory(id: number): Observable<any> {
    return this.http.get(API_URL + '/arts?id=' + id);
  }
}
