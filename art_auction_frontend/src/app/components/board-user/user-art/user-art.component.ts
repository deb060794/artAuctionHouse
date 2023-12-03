import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Art } from 'src/app/_model/art';
import { ArtService } from 'src/app/_services/art.service';
import { UserService } from 'src/app/_services/user.service';
import { CreateArtDialogComponent } from '../../dialog/create/create-art-dialog/create-art-dialog.component';
import { EditArtDialogComponent } from '../../dialog/edit/edit-art-dialog/edit-art-dialog.component';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-art',
  templateUrl: './user-art.component.html',
  styleUrls: ['./user-art.component.css']
})
export class UserArtComponent {
  artList: Array<Art> = [];
  dataSource: MatTableDataSource<Art> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title','artist', 'price', 'state', 'action'];
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
      this.userService.myarts(this.currentUser.id).subscribe(
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


  createNewArtRequest(){
    const newArt = new Art();
    const dialogRef = this.dialog.open(CreateArtDialogComponent, {
        data: { art: newArt }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.artList.push(result);
          this.dataSource = new MatTableDataSource(this.artList);
          this.infoMessage = "Art has been created.";
        } else {
          this.errorMessage = "Unexpected error occurred.";
        }
    });
  }

  editArtRequest(art: Art){
    this.selectedArt = art;
  const dialogRef = this.dialog.open(EditArtDialogComponent, {
      data: { art: this.selectedArt }
    });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.artList.findIndex(item => item.id == art.id);
        if(itemIndex !== -1){
          this.artList[itemIndex] = result;
        }
        this.dataSource = new MatTableDataSource(this.artList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });

   
  }

  

}
