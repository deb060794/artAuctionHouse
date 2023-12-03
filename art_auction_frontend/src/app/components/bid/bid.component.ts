import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bid } from 'src/app/_model/bid';
import { ArtService } from 'src/app/_services/art.service';
import { BidService } from 'src/app/_services/bid.service';
import { StorageService } from 'src/app/_services/storage.service';
import { BidSuccessfulDialogComponent } from '../dialog/bid-successful-dialog/bid-successful-dialog.component';
import { User } from 'src/app/_model/user';
import { CountdownService } from 'src/app/_services/countdown.service';
import { Subscription } from 'rxjs';
import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnDestroy {
  art:any;
  artId: any;
  isLoggedIn = false;
  currentPrice = 0;
  highestBid:Bid = new Bid();
  numberOfBids = 0;
  bidAmount = 0;
  offerAmount = 0;
  endTime!: Date;
  timeLeft!: string;
  private intervalId: any;
  message!: string; 
  messageSuccess!: boolean;
  private subscriptions: Subscription = new Subscription();
  
  constructor(private artService: ArtService,
              private bidService: BidService,
              private route: ActivatedRoute,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storageService:StorageService,
              public dialog: MatDialog,
              private countdownService: CountdownService){}

  ngOnInit(){
    
    this.route.queryParams.subscribe(params => {
      this.artId = params['id'];
    });

   this.getArtById(this.artId);
   this.getNumberOfBidsForArt(this.artId);
   this.getHighestBidForArt(this.artId);
    
  if (this.storageService.isLoggedIn()) {
    this.isLoggedIn = true;
    
  }
  

}

ngDestroy(): void {
  this.subscriptions.unsubscribe();
}
getArtById(id: number) {
  this.artService.getArtById(this.artId).subscribe(
    data => {
      this.art = data;
      const subscription = this.countdownService.getCountdown(this.art.lot.endDate).subscribe
      (time => this.timeLeft = time);
        this.subscriptions.add(subscription);
    },
    err => {
      this.art = JSON.parse(err.error).message;
    }
  );
}

getNumberOfBidsForArt(artId: number) {
  this.artService.getNumberOfBidsForArt(this.artId).subscribe(
    data => {
      console.log(data);
      this.numberOfBids = data;
    },
    err => {
      this.numberOfBids = JSON.parse(err.error).message;
    }
  );
}

getHighestBidForArt(artId: number) {
  this.artService.getHighestBidForArt(this.artId).subscribe(
    data => {
      this.highestBid = data;
      
      this.setCurrentPrice();
      
    },
    err => {
      this.highestBid = JSON.parse(err.error).message;
    }
);
}



ngOnDestroy(): void {
  clearInterval(this.intervalId);
}


onBid(artId: number) {

  if (!this.bidAmount || this.bidAmount <= this.currentPrice) {
    this.message = 'Please enter a valid bid amount.';
    this.messageSuccess = false;
    return;
  }
  

  this.artService.placeBid(this.artId, this.bidAmount, this.storageService.getUser().id)
    .subscribe(response => {
        
        const dialogRef = this.dialog.open(BidSuccessfulDialogComponent);

        
        dialogRef.afterClosed().subscribe(() => {
          
          window.location.reload();
        });
    }, error => {
        console.error('Error placing bid:', error);
        this.message = 'Failed to place bid.';
        this.messageSuccess = false;
    });
}

onOffer(artId: number) {

  this.artService.MakeAnOffer(this.artId, this.offerAmount, this.storageService.getUser().id)
    .subscribe(response => {
        
      this.message = 'Offer placed';
      this.messageSuccess = true;
    }, error => {
        console.error('Error placing offer:', error);
        this.message = 'Failed to place offer.';
        this.messageSuccess = false;
    });
}

addToWishlist(artId:number){
  
}


  setCurrentPrice(){ 
    if(this.highestBid == null){
      this.currentPrice = this.art.initialPrice;
    }else{
      if(this.currentPrice < this.highestBid.amount){

        this.currentPrice = this.highestBid.amount;
        
        }
    }
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/bid'], { queryParams: { id: this.artId }, relativeTo: this.route });
  }

 


}
