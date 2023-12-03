import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BidState } from 'src/app/_model/bidState';
import { Offer } from 'src/app/_model/offer';
import { ArtService } from 'src/app/_services/art.service';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-offer',
  templateUrl: './user-offer.component.html',
  styleUrls: ['./user-offer.component.css']
})
export class UserOfferComponent {
  offers : Offer[] = [];
  currentUser: any;
  router: any;
  accepted = BidState.ACCEPTED;

  
  ngOnInit(): void {
    if (this.currentUser && this.currentUser.id) {
      this.userService.myOffers(this.currentUser.id).subscribe(data => {
        this.offers = data;
        console.log(this.offers);
    });
  }
      
  }

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value === 'made') {
        // Logic to display offers made
    } else if (value === 'received') {
        // Logic to display offers received
    }
}
  
 
  
  
  

  

  constructor(private userService: UserService, 
              private rout: Router,
              private storageService : StorageService,
              private artService : ArtService,
              private cartService: CartService) {
    this.router =rout;
    this.currentUser =  this.storageService.getUser();

}


makeAnOffer( artId?: number) {
  if(artId){
    
    this.router.navigate(['/bid'], { queryParams: { id: artId } });
  }
 
 
}

addToCart (artId?: number, price?: number) {
  if (artId !== undefined && price !== undefined) {
    this.artService.getArtById(artId).subscribe( art => {
      this.cartService.addToCart(art,price);
      this.router.navigate(['/cart']);
    });
    
  }

}

acceptOffer(offerId?:number){
  


}
rejectOffer(offerId?:number){}

}
