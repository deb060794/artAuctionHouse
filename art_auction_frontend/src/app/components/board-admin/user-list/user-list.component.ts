import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../dialog/edit/edit-art-dialog/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../../dialog/delete/delete-dialog/delete-dialog.component';
import { DeactivateDialogComponent } from '../../dialog/deactivate-dialog/deactivate-dialog.component';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
 
})
export class UserListComponent implements OnInit{
  userList: Array<User> = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstname','lastname', 'username', 'action'];
  selectedUser: User = new User();
  errorMessage!: string;
  infoMessage!: string;

  @ViewChild(MatPaginator)paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.findAllUsers();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllUsers(){
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }

 
editUserRequest(user: User) {
  this.selectedUser = user;
  const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { user: this.selectedUser }
    });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.userList.findIndex(item => item.id == user.id);
        if(itemIndex !== -1){
          this.userList[itemIndex] = result;
        }
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });

  }




  deleteUserRequest(user: User) {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { user: this.selectedUser }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.userList.findIndex(item => item.id == user.id);
        if(itemIndex !== -1){
          this.userList.splice(itemIndex, 1);
        }
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });
  }

  deactivateUserRequest(user: User) {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(DeactivateDialogComponent, {
      data: { user: this.selectedUser }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.userList.findIndex(item => item.id == user.id);
        if(itemIndex !== -1){
          this.userList.splice(itemIndex, 1);
        }
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });
  }

  
}


