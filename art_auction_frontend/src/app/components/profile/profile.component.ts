import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user!: User;

  constructor(private storageService: StorageService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserProfile(this.currentUser.id).subscribe(
      data => {
        this.user = data
        console.log(this.user);
    }
      
      );
    
  }

  modifyUser() {
      this.userService.updateUserProfile( this.user).subscribe();
  }
  

}
    
  
