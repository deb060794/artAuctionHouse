import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtService } from '../../_services/art.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { Subscription } from 'rxjs';
import { CountdownService } from 'src/app/_services/countdown.service';
import { Bid } from 'src/app/_model/bid';
import { Art } from 'src/app/_model/art';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  arts: any[] = [];
  currentPrice = 0;
  highestBid:Bid = new Bid();
  isLoggedIn = false;
  isHovering = false;
  numberOfBids: any;
  art: any;

  constructor(private artService: ArtService,
              private router: Router,
              private storageService:StorageService,
              private countdownService: CountdownService
              ) {
    
               

               }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.storageService.isLoggedIn());
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      
    }

    this.artService.getArtsInAuction().subscribe({
      next: data => {
      this.arts = data;
      this.arts = this.arts.map((art: { lot: { endDate: string; }; timeRemaining: string; }) => {
        const subscription = this.countdownService.getCountdown(art.lot.endDate)
          .subscribe(time => art.timeRemaining = time);
        this.subscriptions.add(subscription);
        return art;
      });
      this.arts.forEach((art: { id: any; }) => {
        this.getNumberOfBidsForArt(art.id);
        this.getHighestBidForArt(art.id);
      });
   
     
  
  }
    });
  }

  getNumberOfBidsForArt(artId: number) {
    this.artService.getNumberOfBidsForArt(artId).subscribe(
      data => {
        const artIndex = this.arts.findIndex(art => art.id === artId);
        if (artIndex !== -1) {
          // Assign the number of bids to the appropriate art object
          this.arts[artIndex].numberOfBids = data;
        }
       
      },
      err => {
        this.numberOfBids = JSON.parse(err.error).message;
      }
    );
  }

  getHighestBidForArt(artId: number) {
    this.artService.getHighestBidForArt(artId).subscribe(
      data => {
        const artIndex = this.arts.findIndex(art => art.id === artId);
  
        if (artIndex !== -1) {
          if (data) {
            
            this.arts[artIndex].highestBid = data;
            this.arts[artIndex].currentPrice = data.amount;
          } else {
            
            this.arts[artIndex].currentPrice = this.arts[artIndex].initialPrice;
          }
        }
      },
      err => {
        const artIndex = this.arts.findIndex(art => art.id === artId);
        if (artIndex !== -1) {
         
          this.arts[artIndex].currentPrice = this.arts[artIndex].initialPrice;
        } else {
          
          console.error('Error fetching highest bid:', err);
        }
      }
    );
  }
  


  placeBid( artId: number) {
    if(this.isLoggedIn){
      
      this.router.navigate(['/bid'], { queryParams: { id: artId } });
    }else{
      this.router.navigate(['/login-signup']);
    }
   
   
  }
  

  getTimeRemaining(endDate: string): string {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Auction ended';
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  parseEndDate(endDate: string): Date {
    return new Date(endDate);
  }

   

  addToWishlist(artId: number) {
      
  } 
    
 
}

  
  
   
