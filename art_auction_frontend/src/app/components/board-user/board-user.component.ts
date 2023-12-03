import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from 'src/app/_model/user';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { Art } from 'src/app/_model/art';
import { Bid } from 'src/app/_model/bid';
import { Order } from 'src/app/_model/order';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser: User = new User;
  router: any;
  artCount:any = "";
  bidCount:any = "";
  orderCount:any = "";
  articleCount:any = "";
  bidCount2:any = "";
 

  constructor(private userService: UserService, 
              private rout: Router,
              private storageService : StorageService) {
    this.router =rout;
    this.currentUser =  this.storageService.getUser();

}


  ngOnInit() {
    this.numberOfArts(this.currentUser.id!);
    this.numberOfBids(this.currentUser.id!);
    this.numberOfOrders(this.currentUser.id!);
    
    
  }

  

  numberOfArts(id:number){
    this.userService.numberOfarts(id).subscribe(data => {
      this.artCount = data.response;
      
    });
  }

  numberOfBids(id : number){
    this.userService.numberOfBids(id).subscribe(data => {
      this.bidCount = data.response;
    });
  }

  numberOfOrders(id:number){
    this.userService.numberOfOrders(id).subscribe(data => {
      this.orderCount = data.response;
    })
  }
}
