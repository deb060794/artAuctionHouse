import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/_model/order';
import { AdminService } from 'src/app/_services/admin.service';
import { EditDialogComponent } from '../../dialog/edit/edit-art-dialog/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../../dialog/delete/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  orderList: Array<Order> = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'artwork','buyer', 'seller', 'price', 'state', 'action'];
  selectedOrder: Order = new Order();
  errorMessage!: string;
  infoMessage!: string;

  @ViewChild(MatPaginator)paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.findAllOrders();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllOrders(){
    this.adminService.findAllOrders().subscribe(data => {
      this.orderList = data;
      this.dataSource.data = data;
    });
  }

 
editOrderRequest(order: Order) {
  this.selectedOrder = order;
  const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { order: this.selectedOrder }
    });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.orderList.findIndex(item => item.id == order.id);
        if(itemIndex !== -1){
          this.orderList[itemIndex] = result;
        }
        this.dataSource = new MatTableDataSource(this.orderList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });

  }




  deleteOrderRequest(order: Order) {
    this.selectedOrder = order;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { order: this.selectedOrder }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.orderList.findIndex(item => item.id == order.id);
        if(itemIndex !== -1){
          this.orderList.splice(itemIndex, 1);
        }
        this.dataSource = new MatTableDataSource(this.orderList);
        this.infoMessage = "Mission is completed.";
      } else {
        this.errorMessage = "Unexpected error occurred.";
      }
    });
  }

  

  
}
