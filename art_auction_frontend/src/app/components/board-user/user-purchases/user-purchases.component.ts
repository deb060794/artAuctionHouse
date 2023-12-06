import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_model/order';
import { User } from 'src/app/_model/user';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent {
  orders :  Order[] = [];
  user : User = new User();
  router: any;

  constructor(private userService : UserService,
              private storageService : StorageService,
              private rout: Router) {
                this.router =rout;
               }

  ngOnInit(): void {
    this.user = this.storageService.getUser()
    this.userService.myOrders(this.user.id).subscribe(
      (data ) => {
        this.orders = data;
        console.log(this.orders);
      }
    );
  }

  placeBid( artId?: number) {
    if(artId){
      
      this.router.navigate(['/bid'], { queryParams: { id: artId } });
    }
  }
   
}
