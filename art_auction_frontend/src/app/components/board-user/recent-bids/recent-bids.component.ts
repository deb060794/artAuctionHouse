import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, takeWhile } from 'rxjs';
import { Bid } from 'src/app/_model/bid';
import { Lot } from 'src/app/_model/lot';
import { ArtService } from 'src/app/_services/art.service';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-recent-bids',
  templateUrl: './recent-bids.component.html',
  styleUrls: ['./recent-bids.component.css']
})
export class RecentBidsComponent {
  bids : Bid[] = [];
  currentUser: any;
  router: any;

  ngOnInit(): void {
    if (this.currentUser && this.currentUser.id) {
      this.userService.recentBids(this.currentUser.id).subscribe(
        (bids) => {
          const bidPromises = bids.map((bid: { art: { id: number; lot: Lot; }; isHighestBidder: boolean; isAuctionEnded: boolean; }) => this.fetchAndProcessBid(bid));
          Promise.all(bidPromises).then(processedBids => {
            this.bids = this.processBids(processedBids);
            this.startInterval();
          });
        },
        (        error: any) => console.error('Error fetching user bids:', error)
      );
    } else {
      console.error('No current user found.');
    }
  }
  
  private startInterval() {
    interval(1000)
      .pipe(takeWhile(() => this.bids.length > 0))
      .subscribe(() => {
       
        this.bids.forEach(bid => {
          bid.remainingTime = this.getRemainingTime(bid.art.lot.endDate);
          bid.isAuctionEnded = this.checkIfAuctionEnded(bid.art.lot.endDate);
        });
      });
  }
  
  private fetchAndProcessBid(bid: { art: { id: number; }; isHighestBidder: boolean; isAuctionEnded: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!bid.art || bid.art.id === undefined) {
            console.error('Art object or art ID is undefined in the bid:', bid);
            return reject('Invalid bid object');
        }

        this.artService.getHighestBidForArt(bid.art.id).subscribe(
            (highestBid: { bidder?: { id: any; }; }) => {
                if (highestBid && highestBid.bidder) {
                    bid.isHighestBidder = highestBid.bidder.id === this.currentUser.id;
                } else {
                    console.error('Highest bid or bidder is undefined:', highestBid);
                    bid.isHighestBidder = false;
                }
                resolve(bid);
            },
            (error: any) => {
                console.error(`Error fetching highest bid for art ${bid.art.id}:`, error);
                resolve(bid); // or reject(error) based on how you want to handle errors
            }
        );
    });
}

  private getRemainingTime(endDate: Date): string {
    const now = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Time is over';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  private checkIfAuctionEnded(endDate: Date): boolean {
    return new Date(endDate) <= new Date();
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
    this.artService.getArtById(artId).subscribe( (art: any) => {
      this.cartService.addToCart(art,price);
      this.router.navigate(['/cart']);
    });
    
  }
}


}
