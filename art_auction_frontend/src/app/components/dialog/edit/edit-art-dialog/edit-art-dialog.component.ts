import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AdminService } from 'src/app/_services/admin.service';
import { Art } from 'src/app/_model/art';
import { Country } from 'src/app/_model/country';
import { Category } from 'src/app/_model/category';
import { AuctionState } from 'src/app/_model/auctionState';


export interface DialogData {
  art: Art;
}
@Component({
  selector: 'app-edit-art-dialog',
  templateUrl: './edit-art-dialog.component.html',
  styleUrls: ['./edit-art-dialog.component.css']
})
export class EditArtDialogComponent {
  formArt: FormGroup;
  errorMessage: string | undefined;
  countries = Object.values(Country);
  categories = Object.values(Category); 
  states = Object.values(AuctionState);
  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditArtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {
    
      this.formArt = this.fb.group({
        title: [data.art.title, Validators.required],
        description: [data.art.description, Validators.required],
        image: [data.art.imageUrl],
        category: [data.art.category, Validators.required],
        state: [data.art.state,Validators.required],
        price: [data.art.initialPrice, Validators.required],
        artist: this.fb.group({  
          id: [data.art.artist.id],
          name: [data.art.artist.name],
          imageUrl: [data.art.artist.imageUrl],
          description: [data.art.artist.description],
          country: [data.art.artist.country]  
      })


    });
  }

    editArt(): void {
    if (this.formArt.valid) {
      let updatedArt = {...this.data.art, ...this.formArt.value};
      this.adminService.updateArt(updatedArt).subscribe(() => {
        this.dialogRef.close(updatedArt);
      }, err => {
        this.errorMessage = err.status === 409 
          ? "art update was not possible." 
          : "Unexpected error occurred.";
      });
    }
  }

}
