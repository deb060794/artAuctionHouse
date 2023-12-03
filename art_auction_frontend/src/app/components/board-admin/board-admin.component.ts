import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from 'src/app/_model/user';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  currentUser: User = new User;
  router: any;
  userCount:any = "";
  artCount:any = "";
  orderCount:any = "";

  constructor(private userService: UserService, 
    private rout: Router,
    private adminService: AdminService) {
    this.router =rout;

}


  ngOnInit() {
    this.numberOfUsers();
    this.numberOfProducts();
    this.numberOfOrders();
  }

  numberOfUsers(){
    this.adminService.numberOfUsers().subscribe(data => {
      this.userCount = data.response;
      console.log(this.userCount);
    });
  }

  numberOfProducts(){
    this.adminService.numberOfArts().subscribe(data => {
      this.artCount = data.response;
    });
  }

  numberOfOrders(){
    this.adminService.numberOfOrders().subscribe(data => {
      this.orderCount = data.response;
    })
  }
  

  

 


 
}
