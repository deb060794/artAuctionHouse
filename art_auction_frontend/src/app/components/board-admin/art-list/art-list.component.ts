import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Art } from 'src/app/_model/art';
import { ArtService } from 'src/app/_services/art.service';
import { EditArtDialogComponent } from '../../dialog/edit/edit-art-dialog/edit-art-dialog.component';
import { CreateArtDialogComponent } from '../../dialog/create/create-art-dialog/create-art-dialog.component';
import { DeleteArtDialogComponent } from '../../dialog/delete/delete-art-dialog/delete-art-dialog.component';
import { StartAuctionComponent } from '../../dialog/start-auction/start-auction.component';
import { Lot } from 'src/app/_model/lot';
import { CreateLotDialogComponent } from '../../dialog/create-lot-dialog/create-lot-dialog.component';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit{
  artList: Array<Art> = [];
  dataSource: MatTableDataSource<Art> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title','artist', 'price', 'state', 'action'];
  selectedArt: Art = new Art();
  errorMessage!: string;
  infoMessage!: string;
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private adminService: AdminService,
              public dialog: MatDialog,
              public artService : ArtService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.findAllArts();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }


 

  findAllArts(){
    this.artService.getAllArtWorks().subscribe(data => {
      this.artList = data;
      this.dataSource.data = this.artList;
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

  createNewLotRequest(){
    const newLot= new Lot();
    const dialogRef = this.dialog.open(CreateLotDialogComponent, {
        data: { lot: newLot }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.artList.push(result);
          this.dataSource = new MatTableDataSource(this.artList);
          this.infoMessage = "Lot has been created.";
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


  deleteArtRequest(art: Art){
    this.selectedArt = art;
    const dialogRef = this.dialog.open(DeleteArtDialogComponent, {
      data: { art : this.selectedArt }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.artList.findIndex(item => item.id == art.id);
        if(itemIndex !== -1){
          this.artList.splice(itemIndex, 1);
        }
        this.dataSource = new MatTableDataSource(this.artList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });
   
  }

  startAuction(art: Art){
    this.selectedArt = art;
    const dialogRef = this.dialog.open(StartAuctionComponent, { data: { art: this.selectedArt } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.artList.findIndex(item => item.id == art.id);
        if(itemIndex !== -1){
          this.artList.splice(itemIndex, 1);
        }
        this.dataSource = new MatTableDataSource(this.artList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });

   
  }

  
}

