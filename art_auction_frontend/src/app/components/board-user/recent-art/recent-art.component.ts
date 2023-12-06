import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Art } from 'src/app/_model/art';
import { ArtService } from 'src/app/_services/art.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-recent-art',
  templateUrl: './recent-art.component.html',
  styleUrls: ['./recent-art.component.css']
})
export class RecentArtComponent {
  artList: Array<Art> = [];
  dataSource: MatTableDataSource<Art> = new MatTableDataSource();
  displayedColumns: string[] = [ 'title','artist', 'price', 'state'];
  selectedArt: Art = new Art();
  errorMessage!: string;
  infoMessage!: string;

  currentUser: any;
  router: any;
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              public artService : ArtService,
              private cdr: ChangeDetectorRef,
              private rout: Router,
              private storageService : StorageService) {
    this.router =rout;
    this.currentUser =  this.storageService.getUser();
               }

  ngOnInit() {
    if (this.currentUser && this.currentUser.id) {
      this.userService.recentArts(this.currentUser.id).subscribe(
       data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator; 
        this.paginator.pageIndex = 0;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage(); 
        }
      },
      err => {
        this.errorMessage = err;
      }
    );
    this.cdr.detectChanges();
    } else {
      console.error('No current user found.');
    }
    
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }


  
  

}
