import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Art } from '../_model/art';
import { Observable } from 'rxjs';
import { Lot } from '../_model/lot';


const API_URL = "http://localhost:8080/api/admin/";

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
  }),
  
};
@Injectable({
  providedIn: 'root'
})
export class AdminService{
 
  
  constructor(private http: HttpClient) {
    
   }

   updateUser(user: User): Observable<any> {
    
    return this.http.put(API_URL + "user-update", JSON.stringify(user),
     httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    
    return this.http.delete(API_URL +"user-delete/" + id, httpOptions);
}

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "all-users");
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(API_URL + "user-number");
  }
  deactivateUser(id:any):Observable<any> {
    return this.http.get(API_URL+ "user-deactivate/"+id);
  }

  //Artworks
  

  updateArt(art: Art): Observable<any> {
    console.log(JSON.stringify(art))
    return this.http.put(API_URL + "art-update", JSON.stringify(art),httpOptions);
  }

  deleteArt(id: any): Observable<any> {
    return this.http.delete(API_URL + "art-delete/" + id, httpOptions);
  }

  
  numberOfArts(): Observable<any> {
    return this.http.get(API_URL + "art-number");
  }

  //orders
  findAllOrders(): Observable<any> {
    return this.http.get(API_URL + "allOrders");
  }

  numberOfOrders(): Observable<any> {
    return this.http.get(API_URL + "order-number");
  }
  //auctions
  addArtworkToLot(artId: any, lotId: any): Observable<any> {
    return this.http.post(`${API_URL}start-auction/${artId}/${lotId}`, {}, httpOptions);
  }
  
  createLot(lot: Lot): Observable<any> {
    console.log(JSON.stringify(lot))
    return this.http.post(API_URL + "lot-create", JSON.stringify(lot),httpOptions);
  }

  getLots():Observable<any>{
    return this.http.get(API_URL+ "allLots", httpOptions)
  }

}
