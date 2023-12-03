import { Injectable } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

 
  constructor() {}

  getCountdown(endDate: string): Observable<string> {
    return interval(1000).pipe(
      startWith(0),
      map(() => {
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
      })
    );
  }
}
