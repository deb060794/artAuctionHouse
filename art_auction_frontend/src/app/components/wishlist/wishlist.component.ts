import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  isLoggedIn:any;

  constructor(private storageService: StorageService,
              private router : Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn =true;
      
    }
    if(!this.isLoggedIn){
        this.router.navigate(['login-signup']);
      
    }
    
  }


}
