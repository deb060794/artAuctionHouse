import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Art } from '../_model/art';

const API_URL = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
  }),
  
};

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  getHighestOfferForArt(id: number) {
    throw new Error('Method not implemented.');
  }
  private searchResultsSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();
  
  constructor(private http: HttpClient) { }

  getArtsInAuction(): Observable<any> {
    
    return this.http.get(API_URL + "art/inAuction");
  }

  getAllArtWorks(): Observable<any> {
    return this.http.get(API_URL + 'allArts');
  }

  setSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
  getArtById(id: number): Observable<any> {
    return this.http.get(API_URL + 'art/?id=' + id);

  }
  createArt(art: Art): Observable<any> {
    console.log(JSON.stringify(art))
    return this.http.post(API_URL + "art-create", JSON.stringify(art),httpOptions);
  }
 getHighestBidForArt(artId: number): Observable<any> {
      return this.http.get(API_URL + artId +'/highestBid', httpOptions);
 }

 placeBid(artId: number, bidAmount: number, userId:number): Observable<any> {
  const bidData = { artId:artId, 
                    amount: bidAmount,
                    bidderId: userId };
    console.log(bidData);

  return this.http.post(API_URL+'placeBid',bidData, httpOptions);
  }
  
  MakeAnOffer(artId: number, offerAmount: number, userId:number): Observable<any> {
    const bidData = { artId:artId, 
                      amount: offerAmount,
                      bidderId: userId };
      console.log(bidData);
  
    return this.http.post(API_URL+'makeOffer',bidData, httpOptions);
    }

  getNumberOfBidsForArt(artId: number): Observable<any> {
    return this.http.get(API_URL +'Bids/'+artId, httpOptions);
  }
  search(artTitle:string):Observable<any>{
    return this.http.get(API_URL +"art/search/"+ artTitle);
  }
 
}

  
