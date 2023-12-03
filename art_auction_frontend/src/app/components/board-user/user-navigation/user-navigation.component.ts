import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {
  router: any;
  constructor(private userService: UserService, 
    private rout: Router,
    private adminService: AdminService) {
    this.router =rout;
    }

}
