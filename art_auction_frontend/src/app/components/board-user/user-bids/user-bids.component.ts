import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bid } from 'src/app/_model/bid';
import { Lot } from 'src/app/_model/lot';
import { ArtService } from 'src/app/_services/art.service';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-bids',
  templateUrl: './user-bids.component.html',
  styleUrls: ['./user-bids.component.css']
})
export class UserBidsComponent implements OnInit {
  bids : Bid[] = [];
  currentUser: any;
  router: any;

  
  ngOnInit(): void {
    if (this.currentUser && this.currentUser.id) {
      this.userService.myBids(this.currentUser.id).subscribe(
        bids => {
          const bidPromises = bids.map((bid: { art: { id: number; lot:Lot }; isHighestBidder: boolean; isAuctionEnded:boolean}) => this.fetchAndProcessBid(bid));
          Promise.all(bidPromises).then(processedBids => {
            this.bids = this.processBids(processedBids);
          });
        },
        error => console.error('Error fetching user bids:', error)
      );
    } else {
      console.error('No current user found.');
    }
  }
  
  private fetchAndProcessBid(bid: { art: { id: number; lot:Lot}; isHighestBidder: boolean; isAuctionEnded: boolean }): Promise<any> {
    return new Promise(resolve => {
      this.artService.getHighestBidForArt(bid.art.id).subscribe(
        highestBid => {
          bid.isHighestBidder = highestBid.bidder.id === this.currentUser.id;
          try {
            const endDate = new Date(bid.art.lot.endDate);
            bid.isAuctionEnded = new Date() > endDate;
          } catch (error) {
            console.error('Error parsing endDate:', error);
            bid.isAuctionEnded = false; 
          }
          resolve(bid);
        },
        error => {
          console.error(`Error fetching highest bid for art ${bid.art.id}:`, error);
          resolve(bid);
        }
      );
    });
  }
  
  
  
  private processBids(bids: any[]): any[] {
    const groupedBids = new Map();
  
    bids.forEach(bid => {
      const artId = bid.art.id; 
      const existingBid = groupedBids.get(artId);
  
      if (!existingBid || bid.amount > existingBid.amount) {
        groupedBids.set(artId, bid);
      }
    });
   
  
    return Array.from(groupedBids.values());
  }
  

  constructor(private userService: UserService, 
              private rout: Router,
              private storageService : StorageService,
              private artService : ArtService,
              private cartService: CartService) {
    this.router =rout;
    this.currentUser =  this.storageService.getUser();

}


placeBid( artId?: number) {
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

}
