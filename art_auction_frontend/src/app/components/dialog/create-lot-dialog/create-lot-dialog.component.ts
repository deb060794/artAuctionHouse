import { Inject,Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AdminService } from 'src/app/_services/admin.service';
import { Lot } from 'src/app/_model/lot';

@Component({
  selector: 'app-create-lot-dialog',
  templateUrl: './create-lot-dialog.component.html',
  styleUrls: ['./create-lot-dialog.component.css']
})
export class CreateLotDialogComponent {
  formLot!: FormGroup;
  errorMessage: string | undefined;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLotDialogComponent>,
    private adminService: AdminService) {
      this.formLot = this.fb.group({
        auctionStartDate: ['', Validators.required],
        auctionEndDate: ['', Validators.required]

      });
    }

createLot(): void {
    if (this.formLot.valid) {
      const formValue = this.formLot.value;
      let newLot: Lot = new Lot();
      newLot.startDate = formValue.auctionStartDate.toISOString();
      newLot.endDate = formValue.auctionEndDate.toISOString();
      newLot.processed = false;
      this.adminService.createLot(newLot).subscribe(() =>{
        this.dialogRef.close(true);
      }, err => {
        this.errorMessage = err.status === 409 
          ? "Art creation was not possible." 
          : "Unexpected error occurred.";
      });
    }
      

  }


}
