import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/artistCategory';
@Injectable({
  providedIn: 'root'
})
export class ArtistCategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(API_URL+'/all' );
  }

  getArtistsByCategory(id: number): Observable<any> {
    return this.http.get(API_URL + '/artists?id=' + id);
  }
}
