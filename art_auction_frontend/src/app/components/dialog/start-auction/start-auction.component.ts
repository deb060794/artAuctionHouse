import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Art } from 'src/app/_model/art';
import { Lot } from 'src/app/_model/lot';
import { AdminService } from 'src/app/_services/admin.service';

export interface DialogData {
  art: Art;
}

@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent {
  formArt: FormGroup;
  lots: Lot[] = []; 
  errorMessage: string | undefined;

  ngOnInit(): void {
    this.loadLots();
    this.formArt.addControl('lot', new FormControl('', Validators.required)); 
  }

  loadLots(): void {
    this.adminService.getLots().subscribe(
      (data: Lot[]) => {
        this.lots = data;
      },
      (err) => {
        console.error('Error fetching lots:', err);
        this.errorMessage = "Error fetching lots.";
      }
    );
  }
  
  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<StartAuctionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private adminService: AdminService) {
        this.formArt = this.fb.group({
          lot: ['', Validators.required]
        });
      }

    
      startAuction(): void {
        const selectedLotId = this.formArt.value.lot; 
      
        
        this.adminService.addArtworkToLot(this.data.art.id, selectedLotId).subscribe(() => {
          this.dialogRef.close(true);
        }, err => {
          console.error('Unexpected error occurred:', err);
          this.dialogRef.close(false);
        });
      }

}
