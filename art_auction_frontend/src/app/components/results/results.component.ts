import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/_services/art.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  artResults: any[] = [];
  isLoggedIn = false;

  private subscriptions: Subscription[] = [];

  constructor(private eventBus: EventBusService,
              private artService: ArtService,
              private router: Router,
              private storageService:StorageService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.artService.searchResults$.subscribe(results => {
        this.artResults = results;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  calculateDaysRemaining(end: string): number {
    const endDate = this.parseEndDate(end);
    const now = new Date();
    const diffInTime = endDate.getTime() - now.getTime(); 
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); 

    return diffInDays;
  }

  parseEndDate(endDate: string):Date{
    return new Date(endDate);
  }
  placeBid( artId: number) {
    if(this.isLoggedIn){
      
      this.router.navigate(['/bid'], { queryParams: { id: artId } });
    }else{
      this.router.navigate(['/login-signup']);
    }
   
   
  }

}

