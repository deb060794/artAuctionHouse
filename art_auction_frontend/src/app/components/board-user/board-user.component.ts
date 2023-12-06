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
  offerCount:any = ""; 
 

  constructor(private userService: UserService, 
              private rout: Router,
              private storageService : StorageService) {
    this.router =rout;
    this.currentUser =  this.storageService.getUser();

}


  ngOnInit() {
    this.recentArts(this.currentUser.id!);
    this.recentBids(this.currentUser.id!);
    this.recentOrders(this.currentUser.id!);
    this.offersReceived(this.currentUser.id!);
    
    
  }
  offersReceived(id: number) {
    this.userService.offersReceived(id).subscribe(data => {
      this.offerCount = data.length;
    });
  }

  

  recentArts(id:number){
    this.userService.recentArts(id).subscribe(data => {
     
      this.artCount= data.length;
      
    });
  }

  recentBids(id : number){
    this.userService.recentBids(id).subscribe(data => {
      this.bidCount = data.length;
    });
  }

  recentOrders(id:number){
    this.userService.recentOrders(id).subscribe(data => {
      this.orderCount = data.length;
    })
  }
}
