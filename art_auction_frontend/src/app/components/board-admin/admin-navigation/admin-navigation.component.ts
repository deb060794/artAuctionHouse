import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
  router: any;
  constructor(private userService: UserService, 
    private rout: Router,
    private adminService: AdminService) {
    this.router =rout;
    }

}
